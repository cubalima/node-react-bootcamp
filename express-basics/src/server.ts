import express from "express";
import employeeRoutes from "./routes/employees.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/employees", employeeRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});