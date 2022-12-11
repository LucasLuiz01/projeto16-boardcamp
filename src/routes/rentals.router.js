import { Router } from "express";
import { insertRentals } from "../controllers/rentals.controller.js";
import { rentalsSchenaValidation } from "../middlewares/rentalsSchenaValidation.js";

const router = Router();

router.post("/rentals", rentalsSchenaValidation, insertRentals)

export default router