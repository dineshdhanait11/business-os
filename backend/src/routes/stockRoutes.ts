import express from "express";

import {
    updateStock
} from "../controllers/stockController";


const router = express.Router();


// Update stock IN / OUT
router.post("/", updateStock);


export default router;
