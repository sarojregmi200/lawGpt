import { TUser } from "@/context/UserContext"
import { getCookie } from "./cookies"
import { getAuthenticatedUserInfoGoogle } from "../../app/auth/getAuthenticatedUserData"

export async function getUserFromCookie(): Promise<TUser | Error> {
    try {
        const accessToken = getCookie("g_access_token")
        if (accessToken instanceof Error)
            return new Error("No cookie found")

        const userData = await getAuthenticatedUserInfoGoogle(accessToken)
        if (userData instanceof Error)
            return new Error("Error while getting user data")
        return userData
    } catch (e) {
        return new Error("Unknow error occured while getting user from cookie " + e)
    }
}
