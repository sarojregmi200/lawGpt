import dbConnection from "$/utils/db"
import { randomUUID } from "crypto";
import { Request, Response } from "express"
import { RowDataPacket } from "mysql2"
import { object, z } from "zod"

interface Tmessage {
    _id: string;
    _user_id: string;
    message: string;
    createdAt?: Date;
    references_ids: string,
    gpt_response: string,
}

interface TmessageRoomsResponse extends RowDataPacket {
    tableName: string
}

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData
        if (!userData || !userData._id) throw new Error("No user found")

        const { roomId } = req.params;
        if (!roomId)
            return res.status(400).json({ msg: "No room Id provided" })

        const [roomEntry] = await dbConnection.
            execute<TmessageRoomsResponse[]>(`SELECT tableName FROM LAW_GPT_MESSAGE_ROOMS WHERE _id = ? AND _user_id = ?`,
                [roomId, userData._id])

        if (roomEntry.length < 1)
            return res.status(404).json({ msg: "No tables found to get the messages" })

        const messageTableName = roomEntry[0]?.tableName;

        type TmessageResponse = Tmessage & RowDataPacket & {
            reference_ids: string[]
        }

        const [messages] = await dbConnection.
            execute<TmessageResponse[]>(`SELECT * FROM ${messageTableName} WHERE _user_id = ? order by createdAt asc`,
                [userData._id])

        // fetching the references
        const updatedMessages = await Promise.all(messages.map(async (message) => {
            type Treference = { _id: string, reference: string, reference_link: string }
            type TreferenceResponse = Treference & RowDataPacket
            const references: Treference[] = []
            await Promise.all(message.reference_ids[0].split(",").map(async (reference_id: string) => {
                const [reference] = await dbConnection.execute<TreferenceResponse[]>(`SELECT * FROM LAW_GPT_MESSAGE_REFERENCES WHERE _id = ?`,
                    [reference_id])
                if (reference.length < 1) return
                references.push(reference[0])
            }))
            return { ...message, references }
        }))

        return res.status(200).json({
            msg: `Loaded ${messages.length} messages`,
            messages: updatedMessages
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
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

        if (!roomId)
            return res.status(400).json({ msg: "No room Id provided" })

        const messageFromReq: string = req.body?.message;
        if (!messageFromReq)
            return res.status(400).json({ msg: "No message provided" })

        if (!messageFromReq.trim())
            return res.status(400).json({ msg: "Message cannot be empty string" })

        const [roomEntry] = await dbConnection.
            execute<TmessageRoomsResponse[]>(`SELECT tableName FROM LAW_GPT_MESSAGE_ROOMS WHERE _id = ? AND _user_id = ?`,
                [roomId, userData._id])

        const messageTableName = roomEntry[0]?.tableName;
        if (!messageTableName)
            return res.status(404).json({ msg: "No tables found to get the messages" })

        //
        //
        //
        //
        //TODO: AI portion
        //
        //
        // getting the gpt response and updating it.
        const gpt_response = "Yooo! man thank you for asking me I am very happy that you did, it will help me learn more and help you are well. GG pal!!!! fsociety."
        type Treferences = {
            _id: string,
            reference: string, // text of the reference
            reference_link: string,
        }

        //this is given by the ai 
        const references: Treferences[] = [{
            _id: randomUUID(),
            reference: "Yeah according to random uri??",
            reference_link: "https://github.com/sarojregmi200/lawgpt"
        },
        {
            _id: randomUUID(),
            reference: "Yeah according to random uri??",
            reference_link: "https://github.com/sarojregmi200/lawgpt"
        }]

        // TODO: AI PORTION END
        //

        // adding the references to the reference table
        references.map(async (reference) => {
            await dbConnection.execute(
                `INSERT INTO LAW_GPT_MESSAGE_REFERENCES 
                (_id, reference, reference_link) values (?,?,?)`,
                [...Object.values(reference)]
            )
        })

        const currentTime = new Date();
        const messageToInsert: Tmessage = {
            _id: randomUUID(),
            _user_id: userData._id,
            message: messageFromReq,
            createdAt: currentTime,
            gpt_response,
            references_ids: (references
                .map((reference) => reference._id))
                .join(","),
        };

        await dbConnection.
            execute(`INSERT INTO  ${messageTableName}
                    (_id, _user_id, message, createdAt, gpt_response, reference_ids)
                    VALUES (?, ?, ?, ?, ? , JSON_ARRAY(?))`,
                [...Object.values(messageToInsert)])

        // updating the last active msg
        await dbConnection.execute(`UPDATE LAW_GPT_MESSAGE_ROOMS
                                    SET lastActive = ?
                                   WHERE _user_id = ? AND _id = ?
                                   `,
            [currentTime, userData._id, roomId])


        return res.status(200).json({
            msg: "Message Inserted successfully",
            messages: { ...messageToInsert, references }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal server error",
            error: error
        })
    }
}


const paginationOptionsSchema = z.union([
    z.object({
        fromMode: z.enum(['top', 'bottom']),
        count: z.number().default(10),
    }),
    z.object({
        fromMode: z.enum(['id']),
        direction: z.enum(["forward", "backward"]),
        fromId: z.string(),
        count: z.number().default(10)
    })
]);


export const getPaginatedMessage = async (req: Request, res: Response) => {
    try {
        const userData = res.locals.userData
        if (!userData || !userData._id) throw new Error("No user found")

        let { roomId } = req.params;
        const paginationOptions = paginationOptionsSchema.safeParse(req.body.paginationOptions);
        if (!paginationOptions.success)
            return res.status(400).json({ msg: "Invalid pagination options provided" })

        if (!roomId)
            return res.status(400).json({ msg: "No room Id provided" })

        const [roomEntry] = await dbConnection.
            execute<TmessageRoomsResponse[]>(`SELECT tableName FROM LAW_GPT_MESSAGE_ROOMS WHERE _id = ? AND _user_id = ?`,
                [roomId, userData._id])

        if (roomEntry.length < 1)
            return res.status(404).json({ msg: "No message room with the given id found" })

        const tableName = roomEntry[0].tableName;
        // handeling the messages for other than id from type
        if (paginationOptions.data.fromMode !== "id") {
            const [messagesCount] = await dbConnection.execute<RowDataPacket[]>(`SELECT count(*) as value from ${tableName}`);
            if (!messagesCount[0].value)
                return res.status(404).json({ msg: "No messages found" })

            const [messages] = await dbConnection
                .execute<RowDataPacket[]>(`SELECT  * FROM ${tableName}
                                            ORDER BY createdAt ${paginationOptions.data.fromMode === "top" ? 'ASC' : "DESC"}
                                            LIMIT ${paginationOptions.data.count}`);

            return res.status(200).json({
                msg: `Loaded ${messages.length} Messages`,
                messages,
                pagination: {
                    remainingMessages:
                        messagesCount[0].value - messages.length
                }
            })
        }


        //checking the fromId existance before fetching
        const [presence] = await dbConnection.
            execute<RowDataPacket[]>(`SELECT * FROM ${tableName} WHERE _id =?`, [paginationOptions.data.fromId]);

        if (!presence.length) return res.status(400).json({ msg: "Invalid fromId provided" })

        // getting messages
        const [messages] = await dbConnection.
            execute<RowDataPacket[]>(
                ` select  t2.message, t2.createdAt from LAW_GPT_MESSAGE_ROOM_30534506_2023_12_31T12_01_22_764Z t1, LAW_GPT_MESSAGE_ROOM_30534506_2023_12_31T12_01_22_764Z t2 where  t1.createdAt <= t2.createdAt and t1._id = '1d0efab5-2492-466e-a427-6944fea61b7a';
               ` [
                paginationOptions.data.fromId,
                paginationOptions.data.count
                ]
            )

        // generating pagination data 
        const [pagination] = await dbConnection.
            execute(`SELECT 
                    count(*) as countBelow, 
                    (SELECT count(*) FROM ${tableName} WHERE _id < ? ORDER BY createdAt ASC) as countAbove
                    FROM ${tableName} WHERE _id > ? ORDER BY createdAt ASC`,
                [
                    paginationOptions.data.fromId,
                    paginationOptions.data.fromId
                ]
            )

        return res.status(200).json({
            msg: `Fetched ${messages.length} message from ${paginationOptions.data.fromId} id`,
            messages,
            pagination
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal server error",
            error: error
        })
    }
}


