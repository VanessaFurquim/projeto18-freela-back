import { Router } from "express"
import authenticationRouter from "./authentication-routes.js"
import productsRouter from "./products-routes.js"
import usersRouter from "./users-routes.js"

const router = Router()

router.use(authenticationRouter)
router.use(productsRouter)
router.use(usersRouter)

export default router