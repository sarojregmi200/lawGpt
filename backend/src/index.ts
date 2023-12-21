import express, { Express, Request, Response } from "express";
import { authRouter } from "./routes";
import dotenv from "dotenv";
import { customRequest, validateJwt } from "./utils/jwtToken";
import cookieParser from "cookie-parser";

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT || 3003;

// adding the ability to parse cookies
app.use(cookieParser())

// adding json support for the application
app.use(express.json())

// using google authentication
app.use("/api/v1/googleAuth/", authRouter)

app.listen(PORT, () => {
    console.log(`The server is up and running at port ${PORT}`)
})
