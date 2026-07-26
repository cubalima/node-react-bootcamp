import { Router } from "express";
import { createEmployee, getAllEmployees, getEmployeeById } from "../controllers/employeeController.js";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);

export default router;
