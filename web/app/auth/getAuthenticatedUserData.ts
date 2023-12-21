import axios from "axios";
import type { TUser } from "@/context/UserContext"

export const getAuthenticatedUserInfoGoogle = async (accessToken: string): Promise<TUser | Error> => {
    if (!accessToken) return Error("No Access Token Found");

    try {
        const URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/googleAuth/";
        console.log({ URL })
        const { data } = await axios.post(URL, {
            gAccessToken: accessToken
        });

        if (!data.user.email) return Error("Invalid Access Token")
        console.log(data)

        // After getting the valid email id the data should be queried in the db for further details
        return { email: data.email, name: data.name, id: data.sub, profile: data.picture }
    } catch (e) {
        console.log("Unexpected error occured", e)
        console.log({ URL })
        return Error("Internal Server Error")
    }
}
