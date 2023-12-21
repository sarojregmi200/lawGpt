
import { Request, Response } from "express";
import dbConnection from "$/utils/db";
import { randomUUID } from "crypto";
import { createJwt } from "$/utils/jwtToken";

export type Tguser = {
    email: string,
    name: string,
    picture: string,
}

export type Tuser = Tguser & {
    _id: string,
    createdAt: string,
}

export default async function authenticate(req: Request, res: Response) {
    try {
        const gAccessToken = req.body.gAccessToken
        if (!gAccessToken) return res.status(400).json({ msg: "No accessToken found" })

        // getting user data from google apis
        const gapi = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${gAccessToken}`
        const gUser: Tguser = await fetch(gapi)
            .then(gres => (gres.json()))
            .then((data) => {
                return {
                    email: data?.email,
                    name: data?.name,
                    picture: data?.picture,
                }
            })

        if (!gUser.email) throw new Error("Invalid auth token google auth")

        // checking user existance
        const [rows]: [Tuser[]] = await dbConnection.query("SELECT * FROM `LAW_GPT_USERS` WHERE email = ?",
            [gUser.email])

        // returning the found user upon existance
        if (rows.length >= 1) {
            const accessToken = createJwt(rows[0])
            res.cookie("accessToken",
                accessToken,
                {
                    maxAge: 1000 * 86400 * 5, // 5days
                    sameSite: "none",
                    httpOnly: false,
                })
            return res
                .status(200)
                .json({ msg: "User Authenticated", user: rows[0] })

        }

        // creating the user if not exist
        const joinedDate = new Date;
        const user: Tuser = {
            _id: randomUUID(),
            createdAt: joinedDate.toISOString(),
            ...gUser
        }
        const accessToken = createJwt(user)

        // adding to db
        await dbConnection.query("INSERT INTO `LAW_GPT_USERS` (_id, email, picture, name, createdAt) VALUES (?, ?, ?, ?, ?)",
            [
                user._id,
                user.email,
                user.picture,
                user.name,
                user.createdAt
            ])

        // setting the cookies
        res.cookie("accessToken",
            accessToken,
            {
                maxAge: 1000 * 86400 * 5, // 5 days
                sameSite: "none",
                httpOnly: false,
            })

        // sending the user
        return res
            .status(201)
            .json({ msg: "User Authenticated", user: user, accessToken })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error " })
    }
}
