import { Request, Response } from "express";
import pool from "../database";


export const getDashboard = async (
    req: Request,
    res: Response
) => {

    try {

        const { tenant_id } = req.params;


        const employees = await pool.query(
            `
            SELECT COUNT(*) 
            FROM employees
            WHERE tenant_id=$1
            `,
            [tenant_id]
        );


        const products = await pool.query(
            `
            SELECT COUNT(*)
            FROM products
            WHERE tenant_id=$1
            `,
            [tenant_id]
        );


        const customers = await pool.query(
            `
            SELECT COUNT(*)
            FROM customers
            WHERE tenant_id=$1
            `,
            [tenant_id]
        );


        const invoices = await pool.query(
            `
            SELECT 
            COUNT(*) AS total_invoices,
            COALESCE(SUM(total_amount),0) AS total_sales
            FROM invoices
            WHERE tenant_id=$1
            `,
            [tenant_id]
        );


        const lowStock = await pool.query(
            `
            SELECT *
            FROM products
            WHERE tenant_id=$1
            AND quantity < 10
            `,
            [tenant_id]
        );


        res.json({

            employees: employees.rows[0].count,

            products: products.rows[0].count,

            customers: customers.rows[0].count,

            sales: invoices.rows[0],

            low_stock_products: lowStock.rows

        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error"
        });

    }

};
