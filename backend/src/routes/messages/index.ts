import { validateJwt } from "$/utils/jwtToken";
import { Router } from "express";
import { addMessageToMessageRoom, getAllMessages } from "./messageControllers";

const messageRouter = Router();

messageRouter.get("/:roomId", validateJwt, getAllMessages)
messageRouter.get("/:roomId/count", validateJwt, getAllMessages)

messageRouter.post("/:roomId", validateJwt, addMessageToMessageRoom)


export default messageRouter;
