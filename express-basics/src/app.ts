import express from "express";
import employeeRoutes from "./routes/employees.js";

export const app = express();

app.use(express.json());
app.use("/employees", employeeRoutes);
