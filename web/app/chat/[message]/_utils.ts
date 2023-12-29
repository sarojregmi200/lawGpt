import { TMsgRoom } from "@/context/MessageRoomContext"
import axios from "axios"

export const createNewMsgRoomServer = async (roomName: string, country: string): Promise<TMsgRoom | Error> => {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
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
            lastMsg: "",
            messages: [],
            country: data.country
        }
        return newRoom
    } catch (e) {
        return new Error("Error occured " + e)
    }
} 
