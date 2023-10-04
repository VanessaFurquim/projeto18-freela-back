import { Router } from "express"
import authenticationRouter from "./authentication-routes.js"

const router = Router()

router.use(authenticationRouter)

export default router