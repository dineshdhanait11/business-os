import { Request, Response } from "express";
import pool from "../database";


// Stock IN / OUT

export const updateStock = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            product_id,
            type,
            quantity
        } = req.body;


        // Get current product quantity

        const productResult = await pool.query(
            `
            SELECT quantity 
            FROM products
            WHERE id=$1
            `,
            [product_id]
        );


        if(productResult.rows.length === 0){

            return res.status(404).json({
                message:"Product not found"
            });

        }


        let currentQuantity =
            Number(productResult.rows[0].quantity);



        let newQuantity;


        if(type === "IN"){

            newQuantity =
                currentQuantity + Number(quantity);

        }
        else if(type === "OUT"){

            newQuantity =
                currentQuantity - Number(quantity);


            if(newQuantity < 0){

                return res.status(400).json({
                    message:"Not enough stock"
                });

            }

        }
        else{

            return res.status(400).json({
                message:"Type must be IN or OUT"
            });

        }



        // Update product quantity

        await pool.query(
            `
            UPDATE products
            SET quantity=$1
            WHERE id=$2
            `,
            [
                newQuantity,
                product_id
            ]
        );



        // Save transaction history

        const result = await pool.query(
            `
            INSERT INTO stock_transactions
            (
                product_id,
                type,
                quantity
            )
            VALUES
            ($1,$2,$3)
            RETURNING *
            `,
            [
                product_id,
                type,
                quantity
            ]
        );



        res.json({

            message:"Stock updated successfully",

            current_quantity:newQuantity,

            transaction:result.rows[0]

        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};
