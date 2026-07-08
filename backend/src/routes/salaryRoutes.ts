import express from "express";

import {
    generateSalary
} from "../controllers/salaryController";


const router = express.Router();


router.post("/generate", generateSalary);


export default router;
