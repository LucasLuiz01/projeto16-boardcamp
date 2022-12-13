import joi from "joi";


export const customersSchena = joi.object({
  name: joi.string().required().min(2),
  phone: joi.string().required().min(10).max(11),
  cpf: joi.string().required().length(11),
  birthday: joi.date().required(),
});
