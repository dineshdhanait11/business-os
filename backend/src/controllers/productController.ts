import { Request, Response } from "express";
import pool from "../database";


// Add Product

export const addProduct = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            tenant_id,
            name,
            category,
            purchase_price,
            selling_price,
            quantity,
            unit
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO products
            (
                tenant_id,
                name,
                category,
                purchase_price,
                selling_price,
                quantity,
                unit
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
            `,
            [
                tenant_id,
                name,
                category,
                purchase_price,
                selling_price,
                quantity,
                unit
            ]
        );


        res.status(201).json({
            message:"Product added successfully",
            product: result.rows[0]
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};



// Get Products

export const getProducts = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            tenant_id
        } = req.params;


        const result = await pool.query(
            `
            SELECT * FROM products
            WHERE tenant_id=$1
            `,
            [tenant_id]
        );


        res.json(result.rows);


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};
