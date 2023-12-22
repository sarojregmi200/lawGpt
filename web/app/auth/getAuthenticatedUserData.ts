import axios from "axios";
import type { TUser } from "@/context/UserContext"

export const getAuthenticatedUserData = async (accessToken: string): Promise<TUser | Error> => {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        if (!backendUrl) return new Error("Missing Backend Url")

        const reqUrl = backendUrl + "/googleAuth/";

        const { data } = await axios.post(reqUrl, {
            gAccessToken: accessToken
        }, { withCredentials: true });

        if (!data.user.email) return Error("Invalid Access Token")

        const user: TUser = data.user;
        return user;
    } catch (e) {
        return new Error("Internal Server Error")
    }
}

export const getPersonalInfo = async (): Promise<TUser | Error> => {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        if (!backendUrl) return new Error("Missing Backend Url")

        const reqUrl = backendUrl + "/user/me";

        axios.defaults.withCredentials = true
        const { data } = await axios.get(reqUrl);

        if (!data.user.email) return Error("Invalid Access Token")

        const user: TUser = data.user;
        return user;

    } catch (e) {
        console.log("Some error occured while getting personal Info ", e)
        return new Error("Internal Server Error")
    }
}
