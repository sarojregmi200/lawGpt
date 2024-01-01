import dbConnection from "$/utils/db";
import { randomUUID } from "crypto";
import { Request, Response } from "express"
import { RowDataPacket } from "mysql2";

export const getAllMessageRooms = async (_: Request, res: Response) => {
    try {
        const userData = res.locals.userData;
        if (!userData || !userData._id)
            throw new Error("User Must be authenticated")

        const [results] = await dbConnection.execute<RowDataPacket[]>(`SElECT * FROM LAW_GPT_MESSAGE_ROOMS where _user_id = ?`,
            [userData._id],
        )

        if (results.length < 1) return res.status(404).json({ msg: "No chat history was found" })

        // stream the rooms
        const updatedResult = await Promise.all(results.map(async (room) => {

            const tableName = room.tableName;
            const [messages] = await dbConnection.execute<RowDataPacket[]>(`SELECT * from ${tableName} WHERE _user_id = ? ORDER BY createdAt DESC LIMIT 20`,
                [userData._id])

            if (messages.length < 1) return { ...room, lastMsg: "How can I help you ?", prefetchedMessages: [] }

            const lastMsg = messages[0].message
            return { ...room, lastMsg, prefetchedMessages: messages }
        }))


        return res.status(200).json({
            msg: `${results.length} tables were found successfully`,
            data: { rooms: updatedResult }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error", error: error })
    }
}
export const getOneMessageRoom = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData;
        const { id } = req.params;

        if (!id)
            throw new Error("Room Id must be provided")

        if (!userData || !userData._id)
            throw new Error("User Must be authenticated")

        const [results] = await dbConnection.execute<RowDataPacket[]>(`SElECT * FROM LAW_GPT_MESSAGE_ROOMS WHERE _user_id = ? AND _id = ?`,
            [userData._id, id]
        )

        if (results.length < 1) return res.status(404).json({ msg: "No tables were found" })

        return res.status(200).json({
            msg: "Table found successfully",
            data: { room: results }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const deleteAllMessageRooms = async (_: Request, res: Response) => {
    try {
        const userData = res.locals.userData;

        if (!userData || !userData._id)
            throw new Error("User Must be authenticated")

        const [results] = await dbConnection.execute<RowDataPacket[]>(`SElECT tableName FROM LAW_GPT_MESSAGE_ROOMS WHERE _user_id = ?`,
            [userData._id]
        )

        if (results.length < 1) return res.status(404).json({ msg: "No tables were found" })

        results.forEach(async (result) => {
            await dbConnection.execute('DELETE FROM LAW_GPT_MESSAGE_ROOMS WHERE _user_id = ?',
                [userData._id])
            await dbConnection.execute(`DROP TABLE ${result.tableName};`);
        })

        return res.status(200).json({
            msg: `Delete all the tables: ${results.length} tables`,
            data: { rows: results }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}


export const createMessageRoom = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData;
        if (!userData || !userData._id)
            throw new Error("User Must be authenticated")

        const newTableName: string = ("LAW_GPT_MESSAGE_ROOM_" +
            (userData._id as string).substring(0, 9) +
            (new Date).toISOString())
            .toString()
            .replaceAll(/[^a-zA-Z0-9]/g, "_")

        const newRoomData: { name: string, country: string } = req.body.newRoomInfo;

        if (!newRoomData ||
            !newRoomData.name ||
            !newRoomData.country
        )
            return res.status(400).json({ msg: "Invalid room info provided" })

        // creating a table 
        await dbConnection.execute(
            `CREATE TABLE ${newTableName}( 
                  _id varchar(255) PRIMARY KEY,
                  _user_id varchar(255) NOT NULL,
                  message text NOT NULL,
                  createdAt datetime NOT NULL 
                );`
        )

        const currentTime = new Date();
        // making a entry in the rooms table for the new table
        const newTableEntryData = {
            _id: randomUUID(),
            _user_id: userData._id,
            lastActive: currentTime,
            tableName: newTableName,
            name: newRoomData.name,
            country: newRoomData.country
        }

        await dbConnection
            .execute("INSERT INTO LAW_GPT_MESSAGE_ROOMS(_id, _user_id, lastActive, tableName, name, country) VALUES(?, ?, ?, ?, ?, ?)",
                [...Object.values(newTableEntryData)])

        const [insertedRoomInfo] = await dbConnection.execute<RowDataPacket[]>(
            `SElECT * FROM LAW_GPT_MESSAGE_ROOMS WHERE _user_id=? AND tableName = ?`,
            [userData._id, newTableName]
        )
        if (insertedRoomInfo.length < 1) throw new Error("Unfortunate error occured while quering entered data")

        return res.status(201).json({
            msg: "Created a New chat Room",
            data: insertedRoomInfo[0]
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
} 
