import { Router } from "express"
import { signUp, signIn, signOut } from "../controllers/authentication-controllers.js"
import { validateSchema } from "../middlewares/validateSchema-middlewares.js"
import { registerUserSchema, signInUserSchema } from "../schemas/authentication-schemas.js"
import { validateAuthentication } from "../middlewares/validateAuthentication-middlewares.js"

const authenticationRouter = Router()

authenticationRouter.post("/signup", validateSchema(registerUserSchema), signUp)
authenticationRouter.post("/signin", validateSchema(signInUserSchema), signIn)
authenticationRouter.delete("/signout", validateAuthentication, signOut)

export default authenticationRouter