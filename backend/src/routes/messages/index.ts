import { validateJwt } from "$/utils/jwtToken";
import { Router } from "express";
import { getAllMessages } from "./messageControllers";

const messageRouter = Router();

messageRouter.get("/:roomId", validateJwt, getAllMessages)
messageRouter.get("/:roomId/count", validateJwt, getAllMessages)


export default messageRouter;
