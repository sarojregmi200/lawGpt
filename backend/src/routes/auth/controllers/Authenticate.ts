import { Request, Response } from "express";

export default async function authenticate(req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "User Authenticated" })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
    }
}
