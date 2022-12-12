import { Router } from "express";
import { insertRentals, getRentals, finalizarAluguel, deleteRentals } from "../controllers/rentals.controller.js";
import { rentalsSchenaValidation } from "../middlewares/rentalsSchenaValidation.js";

const router = Router();
router.get("/rentals", getRentals)
router.post("/rentals", rentalsSchenaValidation, insertRentals)
router.post("/rentals/:id/return", finalizarAluguel)
router.delete("/rentals/:id", deleteRentals)
export default router