import { gameSchena } from "../Schemas/gamesSchena.js";
export function gameSchenaValidation (req, res, next){
    const validation = gameSchena.validate(req.body, {abortEarly: false})
    if(validation.error){
        const err = validation.error.details.map(detail => detail.message);
        console.log(err);
        return res.status(400).send(err)
    }
    next();
}