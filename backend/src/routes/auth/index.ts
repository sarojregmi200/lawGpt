import express from "express";
import authenticate from "./controllers/Authenticate";

const authRouter = express.Router()

authRouter.route("/").post(authenticate)
export default authRouter;
