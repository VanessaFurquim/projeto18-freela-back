import { listUsersProductsRepository } from "../repositories/users-repositories.js"

export async function listUsersProducts (request, response) {
    const userInformation = response.locals.user
    const user_id = userInformation.rows[0].id

    try {
        const usersProducts = await listUsersProductsRepository(user_id)
        
        response.status(200).send(usersProducts.rows)

    }catch (error) { return response.status(500).send(error.message) }
}