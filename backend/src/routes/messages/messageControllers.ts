import dbConnection from "$/utils/db"
import { randomUUID } from "crypto";
import { Request, Response } from "express"
import { RowDataPacket } from "mysql2"

interface Tmessage {
    _id: string;
    _user_id: string;
    message: string;
    createdAt?: Date;
}

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData
        if (!userData || !userData._id) throw new Error("No user found")

        const { roomId } = req.params;
        if (!roomId)
            return res.status(400).json({ msg: "No room Id provided" })

        console.log(roomId)
        interface TmessageRoomsResponse extends RowDataPacket {
            tableName: string
        }

        const [roomEntry] = await dbConnection.
            execute<TmessageRoomsResponse[]>(`SELECT tableName FROM LAW_GPT_MESSAGE_ROOMS WHERE _id = ? AND _user_id = ?`,
                [roomId, userData._id])

        console.log(roomEntry[0].tableName)

        const messageTableName = roomEntry[0]?.tableName;
        if (!messageTableName)
            return res.status(404).json({ msg: "No tables found to get the messages" })

        type TmessageResponse = Tmessage & RowDataPacket

        const [messages] = await dbConnection.
            execute<TmessageResponse[]>(`SELECT * FROM ${messageTableName} WHERE _user_id = ?`,
                [userData._id])

        return res.status(200).json({
            msg: `Loaded ${messages.length} messages`,
            messages: messages
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error",
            error: error
        })
    }
}


export const addMessageToMessageRoom = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData
        if (!userData || !userData._id) throw new Error("No user found")

        const { roomId } = req.params;

        interface TmessageRoomsResponse extends RowDataPacket {
            tableName: string
        }

        if (!roomId)
            return res.status(400).json({ msg: "No room Id provided" })

        const [roomEntry] = await dbConnection.
            execute<TmessageRoomsResponse[]>(`SELECT tableName FROM LAW_GPT_MESSAGE_ROOMS WHERE _id = ? AND _user_id = ?`,
                [roomId, userData._id])

        const messageTableName = roomEntry[0]?.tableName;
        if (!messageTableName)
            return res.status(404).json({ msg: "No tables found to get the messages" })

        const messageFromReq: string = req.body.message;
        if (!messageFromReq.trim())
            res.status(400).json({ msg: "Message cannot be empty string" })

        const messageToInsert: Tmessage = {
            _id: randomUUID(),
            _user_id: userData._id,
            message: messageFromReq
        };

        await dbConnection.
            execute(`INSERT INTO  ${messageTableName} (_id, _user_id, message) VALUES (?, ?, ?)`,
                [...Object.values(messageToInsert)])

        return res.status(200).json({
            msg: "Message Inserted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error",
            error: error
        })
    }
}

