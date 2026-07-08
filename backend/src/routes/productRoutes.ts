import express from "express";

import {
    addProduct,
    getProducts
} from "../controllers/productController";


const router = express.Router();


// Add product
router.post("/", addProduct);


// Get products by business
router.get("/:tenant_id", getProducts);


export default router;
