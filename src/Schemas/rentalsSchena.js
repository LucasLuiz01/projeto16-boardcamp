import joi from "joi"

export const rentalsSchena = joi.object({
    customerId: joi.number().required().min(1),
    gameId: joi.number().required().min(1),
    daysRented: joi.number().required().min(1)
})