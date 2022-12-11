import {Router} from "express";
import { customersSchenaValidation } from "../middlewares/customersSchenaValidation.js";
import { insertCustomers } from "../controllers/customers.controller.js";

const router = Router();

router.get("/customer");
router.post("/customer", customersSchenaValidation, insertCustomers);

export default router;