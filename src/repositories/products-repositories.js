import db from "../database/databaseConfig.js"

export function addNewProductRepository ( { product, price, description, image, user_id } ) {
    return db.query(`INSERT INTO products (product, price, description, image, user_id) VALUES ($1, $2, $3, $4, $5);`, [product, price, description, image, user_id])
}

export function getAvailableProductsRepository () {
    return db.query(`SELECT * FROM products;`)
}

export function getProductByIdRepository (id) {
    return db.query(`SELECT products.*, users.id, users.name, users.cpf, users.phone, users.email
    FROM products
    JOIN users
        ON products.user_id = users.id
    WHERE products.id = $1;`, [id])
}

export function isUserAuthorizedRepository (id) {
    return db.query(`SELECT user_id FROM products WHERE id = $1;`, [id])
}

export function changeAvailabilityStatusRepository (id) {
    return db.query(`UPDATE products SET is_available = NOT is_available WHERE id = $1;`, [id])
}

export function editProductRepository ( { product, price, description, image, id } ) {
    return db.query(`UPDATE products SET product = $1, price = $2, description = $3, image = $4 WHERE id = $5;`, [product, price, description, image, id])
}

export function isProductExistentRepository (id) {
    return db.query(`SELECT * FROM products WHERE id = $1`, [id])
}

export function deleteProductRepository (id) {
    return db.query(`DELETE FROM products WHERE id = $1;`, [id])
}