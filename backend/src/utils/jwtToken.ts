import { NextFunction, Response, Request } from "express";
import jwt, { Secret } from "jsonwebtoken"

export function validateJwt(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req.cookies['accessToken']
        const secretKey = (process.env.JWT_SECRET_KEY) as Secret | ""

        if (!accessToken)
            throw new Error("No access token found")

        if (!secretKey)
            throw new Error("No JWT_SECRET_KEY found")

        const decoded = jwt.verify(accessToken, secretKey)

        if (!decoded)
            throw new Error("Invalid accessToken token found");

        // passing down the decoded value in the whiteboard
        res.locals.userData = decoded

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "internal server error" })
    }
}

export function createJwt(data: { _id: string, email: string, picture: string, name: string, createdAt: string }): string {
    try {
        const secretKey = (process.env.JWT_SECRET_KEY) as Secret | ""
        if (!secretKey) throw new Error("No JWT_SECRET_KEY found")

        const jwtToken = jwt.sign(data, secretKey);
        return jwtToken;
    } catch (error) {
        console.log(data)
        throw new Error("Something while creating jwt" + error)
    }
}

