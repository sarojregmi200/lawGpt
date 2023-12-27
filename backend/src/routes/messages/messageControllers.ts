import dbConnection from "$/utils/db"
import { Request, Response } from "express"
import { RowDataPacket } from "mysql2"

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData
        if (!userData || !userData._id) throw new Error("No user found")

        const { roomId } = req.params;

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

        interface TmessageResponse extends RowDataPacket {
            _id: string;
            _user_id: string;
            message: string;
            createdAt: Date;
        }

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



