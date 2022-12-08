import { Router } from "express";
import { listCategories, insertCategories } from "../controllers/categories.controller.js";

const router = Router();

router.get("/categories",listCategories)
router.post("/categories", insertCategories)

export default router;
