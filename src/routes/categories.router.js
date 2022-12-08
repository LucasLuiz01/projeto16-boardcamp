import { Router } from "express";
import { listCategories, insertCategories } from "../controllers/categories.controller.js";
import { nameSchenaValidation } from "../middlewares/nameSchenaValidation.js";

const router = Router();

router.get("/categories",listCategories)
router.post("/categories", nameSchenaValidation,insertCategories)

export default router;
