import { nameSchena } from "../Schemas/nameSchena.js";
export function nameSchenaValidation (req, res, next){
    const validation = nameSchena.validate(req.body, {abortEarly: false});
    if(validation.error){
        const err = validation.error.details.map(detail => detail.message);
        console.log(err);
        return res.status(400).send(err)
    }
    next();
}