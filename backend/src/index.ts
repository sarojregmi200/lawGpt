import express, { Express } from "express";
import {
    authRouter,
    messageRoomRouter,
    userRouter
} from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/messages";

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT || 3003;

// adding the ability to parse cookies
app.use(cookieParser())

// allowing cross origin requests
app.use(cors({
    origin: true,
    credentials: true
}))

// adding json support for the application
app.use(express.json())

// using google authentication
app.use("/api/v1/googleAuth", authRouter)

app.use("/api/v1/user", userRouter)
app.use("/api/v1/messageRoom", messageRoomRouter)
app.use("/api/v1/messages", messageRouter)

app.listen(PORT, () => {
    console.log(`The server is up and running at port ${PORT}`)
})
