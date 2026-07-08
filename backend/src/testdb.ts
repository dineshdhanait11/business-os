import pool from "./database";

async function testDatabase() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connected:");
        console.log(result.rows);
    } catch (error) {
        console.log("Database connection failed:");
        console.log(error);
    } finally {
        process.exit();
    }
}

testDatabase();
