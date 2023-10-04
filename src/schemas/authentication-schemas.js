import joi from "joi"

export const registerUserSchema = joi.object( {
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().pattern(/[0-9]{11}/).min(10).max(11).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
} )

export const signInUserSchema = joi.object( {
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
} )