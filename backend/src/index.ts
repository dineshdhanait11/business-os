
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import salaryRoutes from "./routes/salaryRoutes";
import productRoutes from "./routes/productRoutes";
import stockRoutes from "./routes/stockRoutes";
import customerRoutes from "./routes/customerRoutes";
import invoiceRoutes from "./routes/invoiceRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";



const app = express();

app.use(cors());
app.use(express.json());


// Authentication routes
app.use("/api/auth", authRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/salary", salaryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/stock", stockRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/invoices", invoiceRoutes);

app.use("/api/dashboard", dashboardRoutes);





app.get("/", (req, res) => {
    res.send("Business OS Backend Running");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

