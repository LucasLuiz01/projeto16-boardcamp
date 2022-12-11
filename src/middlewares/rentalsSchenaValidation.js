import { rentalsSchena } from "../Schemas/rentalsSchena.js";

export async function rentalsSchenaValidation (req, res, next){
    const validation = await rentalsSchena.validate(req.body, {abortEarly: false});
    if(validation.error){
        const err = validation.error.details.map(detail=> detail.message);
        return res.status().send(400);
    }
    next();
}