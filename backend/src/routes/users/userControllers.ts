import { Request, Response } from "express";

export const getAuthenticatedUserDetails = async (_: Request, res: Response) => {
    try {
        const userData = res.locals.userData;
        if (!userData) throw new Error("Unexpected error occured while getting validated user")

        return res.status(200).json({ msg: "User validated successfully", user: userData })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}
