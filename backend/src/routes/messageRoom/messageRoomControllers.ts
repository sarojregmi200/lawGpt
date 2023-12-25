import dbConnection from "$/utils/db";
import { randomUUID } from "crypto";
import { Request, Response } from "express"

export const getAllMessageRooms = (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData;
        if (!userData || !userData._id)
            throw new Error("User Must be authenticated")
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error", error: error })
    }


}
export const getOneMessageRoom = (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData;
        if (!userData || !userData._id)
            throw new Error("User Must be authenticated")

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

        const newTableName = userData._id + randomUUID();

        // creating a table 
        const table = await dbConnection.execute(`CREATE TABLE ?;`,
            ["LAW_GPT_MESSAGE_ROOM_" + newTableName],
        )

        const currentTime = new Date();
        // making a entry in the rooms table for the new table

        const newTableEntryData = {
            _id: randomUUID(),
            _user_id: userData._id,
            lastActive: currentTime.toISOString(),
            tableName: newTableName,
        }

        const newTableEntry = dbConnection
            .execute("INSERT INTO TABLE `LAW_GPT_MESSAGE_ROOMS` (_id, _user_id, _lastActive, tableName) VALUES(?, ?, ?, ?)",
                [...Object.values(newTableEntryData)])

        console.log({ newTableName, table, newTableEntryData, newTableEntry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error" })
    }
} 
