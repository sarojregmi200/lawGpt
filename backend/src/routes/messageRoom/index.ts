import { Router } from "express";
import { validateJwt } from "$/utils/jwtToken"
import {
    createMessageRoom,
    getAllMessageRooms,
    getOneMessageRoom
} from "./messageRoomControllers";

const messageRoomRouter = Router();

messageRoomRouter.get("/", validateJwt, getAllMessageRooms)
messageRoomRouter.get("/:id", validateJwt, getOneMessageRoom)

messageRoomRouter.post("/create", validateJwt, createMessageRoom)

export default messageRoomRouter
