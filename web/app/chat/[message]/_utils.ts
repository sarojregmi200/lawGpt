import { Tmessage } from "@/components/chat/message"
import { TMsg, TMsgRoom } from "@/context/MessageRoomContext"
import axios from "axios"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
export const createNewMsgRoom = async (roomName: string, country: string): Promise<TMsgRoom | Error> => {
    try {
        if (!backendUrl) return new Error("Missing Backend Url")

        const reqUrl = backendUrl + "/messageRoom/create/";

        const { data: { data } } = await axios.post(reqUrl, {
            newRoomInfo: {
                name: roomName,
                country: country
            }
        }, { withCredentials: true });

        const newRoom: TMsgRoom = {
            id: data._id,
            userId: data._user_id,
            title: data.name,
            lastActive: data.lastActive,
            lastMsg: "Welcome, how can we help you?",
            messages: [],
            country: data.country
        }
        return newRoom
    } catch (e) {
        return new Error("Error occured " + e)
    }
}

export const getAllMsgRooms = async (): Promise<TMsgRoom[] | Error> => {
    try {
        if (!backendUrl) return new Error("Missing Backend Url")

        const reqUrl = backendUrl + "/messageRoom/";
        const { data: { data } } = await axios.get(reqUrl, { withCredentials: true });
        const updatedRoomInfo = data?.rooms.map((item: any) => {
            return {
                id: item._id,
                userId: item._user_id,
                title: item.name,
                lastActive: item.lastActive,
                lastMsg: item.lastMsg,
                messages: item.prefetchedMessages,
                country: item.country
            }
        }
        )
        return updatedRoomInfo
    } catch (e) {
        return new Error("Error occured " + e)
    }
}

type TindexFromId = {
    fromId: string,
    direction: "forward" | "backward",
    fromMode: "id"
}
type TindexFromposition = {
    fromMode: "top" | "bottom"
}
type TgetSomeMessagesprop = {
    count: number
} & (TindexFromId | TindexFromposition)

export const getSomeMessages = async (
    { settings, roomId }:
        { settings?: TgetSomeMessagesprop, roomId: string }
): Promise<Tmessage[] | Error> => {
    try {
        if (!backendUrl) return new Error("Missing Backend Url")

        const reqUrl = backendUrl + "/messages/" + roomId;
        const { data: { messages } } = await axios.get(reqUrl,
            { withCredentials: true }
        );

        console.log(messages)
        const updatedMessages = messages.map((item: any) => {
            return {
                message: item?.message,
                id: item?._id,
                time: item?.createdAt,
                gpt_response: item?.gpt_response,
                references: item?.references
            } as Tmessage
        }
        )
        return updatedMessages
    } catch (e) {
        return new Error("Error occured " + e)
    }
}


export const addMessageToMessageRoom = async ({ roomId, message }: { roomId: string, message: string }) => {
    try {
        if (!backendUrl) return new Error("Missing Backend Url")

        const reqUrl = backendUrl + "/messages/" + roomId;
        await axios.post(reqUrl, {
            message
        }, { withCredentials: true })
    }
    catch (e) {
        return new Error("Cannot add to the db " + e)
    }
}
