import axios from "axios";
import type { TUser } from "@/context/UserContext"

export const getAuthenticatedUserData = async (accessToken: string): Promise<TUser | Error> => {
    if (!accessToken) return new Error("No Access Token Found");
    try {
        const URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/googleAuth/";

        const { data } = await axios.post(URL, {
            gAccessToken: accessToken
        });

        if (!data.user.email) return Error("Invalid Access Token")

        const user: TUser = data.user;
        return user;
    } catch (e) {
        return new Error("Internal Server Error")
    }
}
