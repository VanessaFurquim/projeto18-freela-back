import joi from "joi"

export const productSchema = joi.object( {
    product: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    image: joi.string().required()
} )