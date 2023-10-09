import { addNewProductRepository, changeAvailabilityStatusRepository, deleteProductRepository, editProductRepository, getAvailableProductsRepository, getProductByIdRepository, isUserAuthorizedRepository } from "../repositories/products-repositories.js"

export async function addNewProduct (request, response) {
    const { product, price, description, image } = request.body
    const userInformation = response.locals.user
    const user_id = userInformation.rows[0].id

    try {
        await addNewProductRepository( { product, price, description, image, user_id } )
        
        response.sendStatus(201)

    } catch (error) { response.status(500).send(error.message) }
}

export async function getAvailableProducts (request, response) {
    const availableProductsArray = []

    try {
        const listOfAvailableProducts = await getAvailableProductsRepository()

        listOfAvailableProducts.rows.map(product => {
            if (product.is_available === false) return product

            availableProductsArray.push(product)

            if (availableProductsArray === []) 
            return response.status(204).send( {message: "Não há nenhum produto disponível no momento."} )
        })

        response.status(200).send(availableProductsArray)

    } catch (error) { response.status(500).send(error.message) }
}

export async function getProductById (request, response) {
    const { id } = request.params

    try {
        const singleproduct = await getProductByIdRepository(id)
        response.status(200).send(singleproduct)

    } catch (error) { response.status(500).send(error.message) }
}

export async function changeAvailabilityStatus (request, response) {
    const { id } = request.params
    const userId = response.locals.user.rows[0].id

    try {
        const isUserAuthorized = await isUserAuthorizedRepository(id)
        if (isUserAuthorized.rows[0].user_id !== userId) return response.status(401).send( {message: "You are not authorized to perform this action."} )

        await changeAvailabilityStatusRepository(id)

        response.sendStatus(200)

    } catch (error) { response.status(500).send(error.message) }
}

export async function editProduct (request, response) {
    const { id } = request.params
    const userId = response.locals.user.rows[0].id
    const { product, price, description, image } = request.body

    try {
        const isUserAuthorized = await isUserAuthorizedRepository(id)
        if (isUserAuthorized.rowCount !==0 &&isUserAuthorized.rows[0].user_id !== userId) return response.status(401).send( {message: "You are not authorized to perform this action."})

        const isProductExistent = await isUserAuthorizedRepository(id)
        if (isProductExistent.rowCount === 0) return response.status(404).send( {message: "Product not found."})
        
        await editProductRepository( { product, price, description, image, id } )

        response.sendStatus(200)

    } catch (error) { response.status(500).send(error.message) }
}

export async function deleteProduct (request, response) {
    const { id } = request.params
    const userId = response.locals.user.rows[0].id

    try {
        const isUserAuthorized = await isUserAuthorizedRepository(id)
        if (isUserAuthorized.rowCount !==0 &&isUserAuthorized.rows[0].user_id !== userId) return response.status(401).send( {message: "You are not authorized to perform this action."})

        const isProductExistent = await isUserAuthorizedRepository(id)
        if (isProductExistent.rowCount === 0) return response.status(404).send( {message: "Product not found."})
        
        await deleteProductRepository(id)

        response.sendStatus(200)

    } catch (error) { response.status(500).send(error.message) }
}