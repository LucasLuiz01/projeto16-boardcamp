import joi from "joi";
export const nameSchena = joi.object({
    name: joi.string().required().min(3),
})