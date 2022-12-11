import {Router} from "express";
import { customersSchenaValidation } from "../middlewares/customersSchenaValidation.js";
import { insertCustomers, getCustomersCpf, getCustomersById } from "../controllers/customers.controller.js";

const router = Router();

router.get("/customer", getCustomersCpf);
router.get("/customer/:id", getCustomersById)
router.post("/customer", customersSchenaValidation, insertCustomers);

export default router;