import {Router} from "express";
import { customersSchenaValidation } from "../middlewares/customersSchenaValidation.js";
import { insertCustomers, getCustomersCpf, getCustomersById, updateUser } from "../controllers/customers.controller.js";

const router = Router();

router.get("/customers", getCustomersCpf);
router.get("/customers/:id", getCustomersById)
router.post("/customers", customersSchenaValidation, insertCustomers);
router.put("/customers/:id", customersSchenaValidation, updateUser)

export default router;