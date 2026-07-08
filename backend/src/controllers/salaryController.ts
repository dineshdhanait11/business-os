import { Request, Response } from "express";
import pool from "../database";


// Generate Salary

export const generateSalary = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            employee_id,
            month
        } = req.body;


        // Get employee salary

        const employeeResult = await pool.query(
            `
            SELECT salary 
            FROM employees
            WHERE id=$1
            `,
            [employee_id]
        );


        if(employeeResult.rows.length === 0){

            return res.status(404).json({
                message:"Employee not found"
            });

        }


        const monthlySalary =
            Number(employeeResult.rows[0].salary);



        // Get attendance count

        const attendanceResult = await pool.query(
            `
            SELECT 
            COUNT(*) FILTER (WHERE status='Present') AS present_days,
            COUNT(*) FILTER (WHERE status='Half Day') AS half_days,
            COUNT(*) FILTER (WHERE status='Absent') AS absent_days
            FROM attendance
            WHERE employee_id=$1
            `,
            [employee_id]
        );


        const attendance = attendanceResult.rows[0];


        const presentDays =
            Number(attendance.present_days || 0);

        const halfDays =
            Number(attendance.half_days || 0);

        const absentDays =
            Number(attendance.absent_days || 0);



        const totalDays = 30;

        const perDaySalary =
            monthlySalary / totalDays;


        const finalSalary =
            (presentDays * perDaySalary)
            +
            (halfDays * perDaySalary / 2);



        const result = await pool.query(
            `
            INSERT INTO salary_payments
            (
                employee_id,
                month,
                total_days,
                present_days,
                half_days,
                absent_days,
                final_salary
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
            `,
            [
                employee_id,
                month,
                totalDays,
                presentDays,
                halfDays,
                absentDays,
                finalSalary
            ]
        );


        res.json({
            message:"Salary generated successfully",
            salary:result.rows[0]
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};
