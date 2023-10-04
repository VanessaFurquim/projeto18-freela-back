import db from "../database/databaseConfig.js"

export async function validateAuthentication (request, response, next) {
    const { authorization } = request.headers

    const token = authorization?.replace("Bearer ", "")
    if (!token) return response.status(404).send( { message: "You need to send a token of authentication." } )

    try {
        const session = await db.query(`SELECT token, user_id FROM "authenticationSessions" WHERE token = $1;`, [token])
        if (session.rowCount === 0) return response.status(401).send( { message: "Access not granted." } )

        const userInformation = await db.query(`SELECT * FROM users WHERE id = $1`, [session.rows[0].user_id])

        response.locals.token = token
        response.locals.user = userInformation

        next()

    } catch (error) { response.status(500).send(error.message) }
}