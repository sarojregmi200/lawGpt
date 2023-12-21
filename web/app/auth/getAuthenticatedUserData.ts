import axios from "axios";
import type { TUser } from "@/context/UserContext"

export const getAuthenticatedUserInfoGoogle = async (accessToken: string): Promise<TUser | Error> => {

    if (!accessToken) return Error("No Access Token Found");
    const URL = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
    try {
        const { data } = await axios.get(URL);
        if (!data.email) return Error("Invalid Access Token")
        console.log(data)
        // After getting the valid email id the data should be queried in the db for further details
        return { email: data.email, name: data.name, id: data.sub, profile: data.picture }
    } catch (e) {
        console.log("Unexpected error occured", e)
        return Error("Internal Server Error")
    }
}
