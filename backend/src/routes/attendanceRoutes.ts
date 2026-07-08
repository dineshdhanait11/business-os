import express from "express";

import {
    markAttendance,
    getAttendance
} from "../controllers/attendanceController";


const router = express.Router();


// Mark attendance
router.post("/", markAttendance);


// Get employee attendance
router.get("/:employee_id", getAttendance);


export default router;
