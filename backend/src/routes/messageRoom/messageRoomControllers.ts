import dbConnection from "$/utils/db";
import { randomUUID } from "crypto";
import { Request, Response } from "express"
import { RowDataPacket } from "mysql2";

export const getAllMessageRooms = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData;
        if (!userData || !userData._id)
            throw new Error("User Must be authenticated")

        const [results] = await dbConnection.execute<RowDataPacket[]>(`SElECT * FROM LAW_GPT_MESSAGE_ROOMS where _user_id = ?`,
            [userData._id],
        )

        if (results.length < 1) return res.status(404).json({ msg: "No tables were found" })

        res.status(200).json({
            msg: `${results.length} tables were found successfully`,
            data: { rooms: results }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error", error: error })
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

        res.status(200).json({
            msg: "Table found successfully",
            data: { rows: results }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const deleteAllMessageRooms = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData;

        if (!userData || !userData._id)
            throw new Error("User Must be authenticated")

        const [results] = await dbConnection.execute<RowDataPacket[]>(`SElECT tableName FROM LAW_GPT_MESSAGE_ROOMS WHERE _user_id = ?`,
            [userData._id]
        )

        if (results.length < 1) return res.status(404).json({ msg: "No tables were found" })

        results.forEach(async (result) => {
            console.log(result.tableName);
            await dbConnection.execute('DELETE FROM LAW_GPT_MESSAGE_ROOMS WHERE _user_id = ?',
                [userData._id])
            await dbConnection.execute(`DROP TABLE ${result.tableName};`);
        })

        res.status(200).json({
            msg: `Delete all the tables: ${results.length} tables`,
            data: { rows: results }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error" })
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

        // creating a table 
        await dbConnection.execute(
            `CREATE TABLE ${newTableName}( 
                  _id varchar(255) PRIMARY KEY,
                  _user_id varchar(255) ,
                  message text NOT NULL,
                  createdAt DATETIME NOT NULL 
                );`
        )

        const currentTime = new Date();
        // making a entry in the rooms table for the new table

        const newTableEntryData = {
            _id: randomUUID(),
            _user_id: userData._id,
            lastActive: currentTime,
            tableName: newTableName,
        }

        await dbConnection
            .execute("INSERT INTO LAW_GPT_MESSAGE_ROOMS(_id, _user_id, lastActive, tableName) VALUES(?, ?, ?, ?)",
                [...Object.values(newTableEntryData)])

        res.status(201).json({
            msg: "Created a New chat Room",
            data: { tableName: newTableName }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error" })
    }
} 
