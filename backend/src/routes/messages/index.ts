import { validateJwt } from "$/utils/jwtToken";
import { Router } from "express";
import {
    addMessageToMessageRoom,
    getAllMessages,
    getPaginatedMessage
} from "./messageControllers";

const messageRouter = Router();

messageRouter.get("/:roomId", validateJwt, getAllMessages)
messageRouter.get("/:roomId/paginated", validateJwt, getPaginatedMessage)

messageRouter.post("/:roomId", validateJwt, addMessageToMessageRoom)


export default messageRouter;
