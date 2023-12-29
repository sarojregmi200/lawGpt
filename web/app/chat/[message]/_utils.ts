import { TMsgRoom } from "@/context/MessageRoomContext"
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
                lastMsg: "Logic should be changed to get the last msg",
                messages: [],
                country: item.country
            }
        }
        )
        console.log({ rooms: data?.rooms, updatedRoomInfo })
        return updatedRoomInfo
    } catch (e) {
        return new Error("Error occured " + e)
    }
}


