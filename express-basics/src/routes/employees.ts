import { Router } from "express";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "../controllers/employeeController.js";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);

export default router;
