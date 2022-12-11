import { Router } from "express";
import { insertRentals, getRentals } from "../controllers/rentals.controller.js";
import { rentalsSchenaValidation } from "../middlewares/rentalsSchenaValidation.js";

const router = Router();
router.get("/rentals", getRentals)
router.post("/rentals", rentalsSchenaValidation, insertRentals)

export default router