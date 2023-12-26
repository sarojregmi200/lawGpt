import { Router } from "express";
import { validateJwt } from "$/utils/jwtToken"
import {
    createMessageRoom,
    deleteAllMessageRooms,
    getAllMessageRooms,
    getOneMessageRoom
} from "./messageRoomControllers";

const messageRoomRouter = Router();

messageRoomRouter.get("/", validateJwt, getAllMessageRooms)
messageRoomRouter.get("/:id", validateJwt, getOneMessageRoom)

messageRoomRouter.post("/create", validateJwt, createMessageRoom)

messageRoomRouter.delete("/deleteall", validateJwt, deleteAllMessageRooms)

export default messageRoomRouter
