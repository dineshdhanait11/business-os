import express from "express";

import {
    getDashboard
} from "../controllers/dashboardController";


const router = express.Router();


// Get dashboard data
router.get("/:tenant_id", getDashboard);


export default router;
