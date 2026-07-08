import { Request, Response } from "express";
import pool from "../database";


// Add Employee

export const addEmployee = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            tenant_id,
            name,
            email,
            phone,
            position,
            joining_date,
            salary
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO employees
            (
                tenant_id,
                name,
                email,
                phone,
                position,
                joining_date,
                salary
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
            `,
            [
                tenant_id,
                name,
                email,
                phone,
                position,
                joining_date,
                salary
            ]
        );


        res.status(201).json({
            message:"Employee added successfully",
            employee: result.rows[0]
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};



// Get Employees

export const getEmployees = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            tenant_id
        } = req.params;


        const result = await pool.query(
            `
            SELECT * FROM employees
            WHERE tenant_id=$1
            `,
            [tenant_id]
        );


        res.json(result.rows);


    } catch(error){

        res.status(500).json({
            message:"Server error"
        });

    }

};
