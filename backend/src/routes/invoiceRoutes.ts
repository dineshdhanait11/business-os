import express from "express";

import {
    createInvoice,
    getInvoices
} from "../controllers/invoiceController";


const router = express.Router();


// Create Invoice
router.post("/", createInvoice);


// Get All Invoices By Tenant ID
router.get("/:tenant_id", getInvoices);



export default router;
