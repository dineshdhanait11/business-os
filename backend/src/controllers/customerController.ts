import { Request, Response } from "express";
import pool from "../database";


// Add Customer

export const addCustomer = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            tenant_id,
            name,
            phone,
            email,
            address
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO customers
            (
                tenant_id,
                name,
                phone,
                email,
                address
            )
            VALUES
            ($1,$2,$3,$4,$5)
            RETURNING *
            `,
            [
                tenant_id,
                name,
                phone,
                email,
                address
            ]
        );


        res.status(201).json({
            message:"Customer added successfully",
            customer:result.rows[0]
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};



// Get Customers

export const getCustomers = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            tenant_id
        } = req.params;


        const result = await pool.query(
            `
            SELECT * FROM customers
            WHERE tenant_id=$1
            `,
            [
                tenant_id
            ]
        );


        res.json(result.rows);


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};
