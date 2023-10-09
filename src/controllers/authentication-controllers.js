import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { addNewUserRepository, authenticateSessionRepository, isEmailRegisteredRepository, signUserOutRepository } from "../repositories/authentication-repositories.js"

export async function signUp (request, response) {
    const { name, cpf, phone, email, password } = request.body

    try {
        const isEmailRegistered = await isEmailRegisteredRepository( { email } )
        if (isEmailRegistered.rowCount !== 0) return response.status(409).send( { message: "This email is already registered to an account!" } )

        await addNewUserRepository( { name, cpf, phone, email, password } )
        
        response.sendStatus(201)

    } catch (error) { response.status(500).send(error.message) }
}

export async function signIn (request, response) {
    const { email, password } = request.body

    try {
        const isEmailRegistered = await isEmailRegisteredRepository( { email } )
        if (isEmailRegistered.rowCount === 0) return response.status(401).send( { message: "This email address is not registered to any account!" } )
        
        const isPasswordCorrect = bcrypt.compareSync(password, isEmailRegistered.rows[0].password)
        if (!isPasswordCorrect) return response.status(401).send( { message: "Invalid password!" } )

        const id = isEmailRegistered.rows[0].id
        const token = uuid()
        await authenticateSessionRepository(token, id)

        response.status(200).send( { token: `${token}` } )
    
    } catch (error) { response.status(500).send(error.message) }
}

export async function signOut (request, response) {
    const token = response.locals.token

    try {
        await signUserOutRepository(token)

        response.sendStatus(200)

    } catch (error) { response.status(500).send(error.message) }
}