import { validateJwt } from "$/utils/jwtToken";
import { Router } from "express";
import { getAllMessageRooms } from "../messageRoom/messageRoomControllers";

const messageRouter = Router();

messageRouter.get("/", validateJwt, getAllMessageRooms)
messageRouter.get("/:id", validateJwt, getAllMessageRooms)
