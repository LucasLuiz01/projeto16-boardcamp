import { customersSchena } from "../Schemas/customersSchena.js";

export function customersSchenaValidation (req, res, next){
    const validation = customersSchena.validate(req.body, {abortEarly: false});
    if(validation.error){
        const err = validation.error.details.map(detail=> detail.message);
        console.log(err);
        return res.status(400).send(err);
    }
    next();
}