import { Router } from "express"
import { validateJwt } from "$/utils/jwtToken"
import { getAuthenticatedUserDetails } from "./userController"

const userRouter = Router()

userRouter.get("/me", validateJwt, getAuthenticatedUserDetails)

export default userRouter
