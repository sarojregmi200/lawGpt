import { NextFunction, Response, Request } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken"

export type customRequest = Request & {
    userData: string | JwtPayload
}

export function validateJwt(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req.cookies['accessToken']

        console.log(accessToken)
        console.log("Hey how is it going bro")
        const secretKey = (process.env.JWT_SECRET_KEY) as Secret | ""

        if (!accessToken)
            return res.status(401).json({ msg: "No access token found" })

        if (!secretKey)
            throw new Error("No JWT_SECRET_KEY found")

        const decoded = jwt.verify(accessToken, secretKey)
        if (!decoded)
            return res.status(401).json({ msg: "Invalid accessToken token found" });

        // updating and populating the req wit decoded user data
        (req as customRequest).userData = decoded

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
        throw new Error("Something while creating jwt" + error)
    }
}

