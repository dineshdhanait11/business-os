import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../database";



// REGISTER

export const register = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            business_name,
            owner_name,
            email,
            password
        } = req.body;



        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );



        if(existingUser.rows.length > 0){

            return res.status(400).json({
                message:"Email already exists"
            });

        }




        const tenant = await pool.query(

            `
            INSERT INTO tenants
            (
                business_name,
                owner_name,
                email
            )

            VALUES
            ($1,$2,$3)

            RETURNING id
            `,

            [
                business_name,
                owner_name,
                email
            ]

        );



        const tenantId = tenant.rows[0].id;



        const hashedPassword = await bcrypt.hash(
            password,
            10
        );




        await pool.query(

            `
            INSERT INTO users
            (
                tenant_id,
                role_id,
                name,
                email,
                password_hash
            )

            VALUES
            ($1,1,$2,$3,$4)

            `,

            [

                tenantId,
                owner_name,
                email,
                hashedPassword

            ]

        );




        res.status(201).json({

            message:"Business registered successfully"

        });



    } catch(error:any){


        console.log(error);



        res.status(500).json({

            message:"Server error",

            error:error.message

        });


    }

};








// LOGIN


export const login = async (

    req: Request,

    res: Response

) => {


    try {


        const {

            email,

            password

        } = req.body;




        const userResult = await pool.query(

            "SELECT * FROM users WHERE email=$1",

            [email]

        );





        if(userResult.rows.length === 0){


            return res.status(404).json({

                message:"User not found"

            });


        }





        const user = userResult.rows[0];





        const passwordMatch = await bcrypt.compare(

            password,

            user.password_hash

        );





        if(!passwordMatch){


            return res.status(401).json({

                message:"Invalid password"

            });


        }





        const token = jwt.sign(

            {

                id:user.id,

                tenant_id:user.tenant_id,

                role_id:user.role_id

            },

            "business_secret_key",

            {

                expiresIn:"7d"

            }

        );






        res.json({

            message:"Login successful",

            token,


            user:{


                id:user.id,

                name:user.name,

                email:user.email,

                tenant_id:user.tenant_id,

                role_id:user.role_id


            }


        });





    } catch(error:any){



        console.log(error);



        res.status(500).json({

            message:"Server error",

            error:error.message

        });



    }


};
