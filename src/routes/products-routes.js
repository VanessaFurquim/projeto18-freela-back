import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema-middlewares.js"
import { validateAuthentication } from "../middlewares/validateAuthentication-middlewares.js"
import { productSchema } from "../schemas/products-schemas.js"
import { addNewProduct, changeAvailabilityStatus, deleteProduct, editProduct, getAvailableProducts, getProductById } from "../controllers/products-controllers.js"

const productsRouter = Router()

productsRouter.post("/products", validateAuthentication, validateSchema(productSchema), addNewProduct)
productsRouter.get("/products", validateAuthentication, getAvailableProducts)
productsRouter.get("/products/:id", validateAuthentication, getProductById)
productsRouter.put("/products/:id", validateAuthentication, validateSchema(productSchema), editProduct)
productsRouter.delete("/products/:id", validateAuthentication, deleteProduct)
productsRouter.patch("/products/:id/status", validateAuthentication, changeAvailabilityStatus)

export default productsRouter