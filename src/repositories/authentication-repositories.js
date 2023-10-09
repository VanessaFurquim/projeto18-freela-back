import db from "../database/databaseConfig.js"
import bcrypt from "bcrypt"

export function isEmailRegisteredRepository ( { email } ) {
    return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
}

export function addNewUserRepository ( { name, cpf, phone, email, password } ) {
    const hash = bcrypt.hashSync(password, 12)

    return db.query(`INSERT INTO users (name, cpf, phone, email, password) VALUES ($1, $2, $3, $4, $5)`, [name, cpf, phone, email, hash])
}

export function authenticateSessionRepository (token, id) {
    return db.query(`INSERT INTO "authenticationSessions" (token, user_id) VALUES ($1, $2)`, [token, id])
}

export function signUserOutRepository (token) {
    return db.query(`DELETE FROM "authenticationSessions" WHERE token = $1`, [token])
}