import { Router } from "express"
import { validateAuthentication } from "../middlewares/validateAuthentication-middlewares.js"
import { listUsersProducts } from "../controllers/users-controllers.js"

const usersRouter = Router()

usersRouter.get("/users/my_catalog", validateAuthentication, listUsersProducts)

export default usersRouter