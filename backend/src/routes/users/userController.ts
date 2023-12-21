import { customRequest } from "$/utils/jwtToken";
import { Request, Response } from "express";

export const getAuthenticatedUserDetails = async () => (req: Request, res: Response) => {
    try {
        const userData = (req as customRequest).userData;

        if (!userData) throw new Error("Unexpected error occured while getting validated user")

        res.status(200).json({ msg: "User validated successfully", user: userData })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Internal Server Error" })
    }
}
