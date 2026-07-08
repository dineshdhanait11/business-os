import { Request, Response } from "express";
import pool from "../database";


export const markAttendance = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            employee_id,
            status,
            check_in,
            check_out
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO attendance
            (
                employee_id,
                status,
                check_in,
                check_out
            )
            VALUES
            ($1,$2,$3,$4)
            RETURNING *
            `,
            [
                employee_id,
                status,
                check_in,
                check_out
            ]
        );


        res.status(201).json({
            message:"Attendance marked",
            attendance:result.rows[0]
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};



export const getAttendance = async (
    req: Request,
    res: Response
)=>{

    try{

        const {employee_id}=req.params;


        const result = await pool.query(
            `
            SELECT * FROM attendance
            WHERE employee_id=$1
            ORDER BY date DESC
            `,
            [employee_id]
        );


        res.json(result.rows);


    }catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }

};
