import { Router } from "express";
import { getAllEmployees, getEmployeeById } from "../controllers/employeeController.js";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);

export default router;
