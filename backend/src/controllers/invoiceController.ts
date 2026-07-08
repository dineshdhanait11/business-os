import { Request, Response } from "express";
import pool from "../database";


// Create Invoice

export const createInvoice = async (
    req: Request,
    res: Response
) => {

    const client = await pool.connect();

    try {

        const {
            tenant_id,
            customer_id,
            items
        } = req.body;


        await client.query("BEGIN");


        let totalAmount = 0;


        // Calculate total

        for (const item of items) {

            const product = await client.query(
                `
                SELECT selling_price, quantity
                FROM products
                WHERE id=$1
                `,
                [
                    item.product_id
                ]
            );


            if(product.rows.length === 0){

                throw new Error("Product not found");

            }


            if(product.rows[0].quantity < item.quantity){

                throw new Error("Not enough stock");

            }


            totalAmount +=
                Number(product.rows[0].selling_price)
                *
                Number(item.quantity);

        }



        // Create invoice

        const invoice = await client.query(
            `
            INSERT INTO invoices
            (
                tenant_id,
                customer_id,
                total_amount,
                status
            )
            VALUES
            ($1,$2,$3,'Completed')
            RETURNING *
            `,
            [
                tenant_id,
                customer_id,
                totalAmount
            ]
        );


        const invoiceId = invoice.rows[0].id;



        // Add items and reduce stock

        for (const item of items) {


            const product = await client.query(
                `
                SELECT selling_price
                FROM products
                WHERE id=$1
                `,
                [
                    item.product_id
                ]
            );


            const price =
                product.rows[0].selling_price;


            const subtotal =
                Number(price)
                *
                Number(item.quantity);



            await client.query(
                `
                INSERT INTO invoice_items
                (
                    invoice_id,
                    product_id,
                    quantity,
                    price,
                    subtotal
                )
                VALUES
                ($1,$2,$3,$4,$5)
                `,
                [
                    invoiceId,
                    item.product_id,
                    item.quantity,
                    price,
                    subtotal
                ]
            );



            await client.query(
                `
                UPDATE products
                SET quantity = quantity - $1
                WHERE id=$2
                `,
                [
                    item.quantity,
                    item.product_id
                ]
            );

        }


        await client.query("COMMIT");


        res.status(201).json({

            message:"Invoice created successfully",

            invoice: invoice.rows[0]

        });



    } catch(error:any){

        await client.query("ROLLBACK");

        console.log(error);


        res.status(500).json({

            message:error.message

        });


    } finally {

        client.release();

    }

};
export const getInvoices = async (req: any, res: any) => {
  try {
    const { tenant_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM invoices WHERE tenant_id = $1 ORDER BY created_at DESC",
      [tenant_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
