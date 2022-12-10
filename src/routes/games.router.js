import { Router } from "express";
import { gameSchenaValidation } from "../middlewares/gamesSchenaValidation.js";
import { insertGames, listGames } from "../controllers/games.controller.js";

const router = Router();

router.get("/games", listGames);
router.post("/games",gameSchenaValidation, insertGames);

export default router;