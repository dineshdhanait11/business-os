import express from "express";

import {
    addCustomer,
    getCustomers
} from "../controllers/customerController";


const router = express.Router();


// Add customer
router.post("/", addCustomer);


// Get customers by business
router.get("/:tenant_id", getCustomers);


export default router;
