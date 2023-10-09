import db from "../database/databaseConfig.js"

export function listUsersProductsRepository (user_id) {
    return db.query(`SELECT * FROM products WHERE user_id = $1;`, [user_id])
}