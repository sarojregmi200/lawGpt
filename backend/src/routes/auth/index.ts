import express from "express";
import authenticate from "./authControllers";

const authRouter = express.Router()

authRouter.route("/").post(authenticate)
export default authRouter;
