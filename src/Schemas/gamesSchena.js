import joi from "joi";
export const gameSchena = joi.object({
    name: joi.string().required().min(3),
    stockTotal: joi.number().required().min(1),
    pricePerDay: joi.number().required().min(1),
    categoryId: joi.number().required(),
    image: joi.string().required().min(5)
})