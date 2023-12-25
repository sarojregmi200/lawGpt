import { Router } from "express";
import { validateJwt } from "$/utils/jwtToken"

const messageRoomRouter = Router();

messageRoomRouter.get("/", validateJwt, getAllMessageRooms)
messageRoomRouter.get("/:id", validateJwt, getOneMessageRoom)

messageRoomRouter.post("/createRoom", validateJwt, createMessageRoom)
