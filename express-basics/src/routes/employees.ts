import { Router } from "express";
import { getAllEmployees } from "../controllers/employeeController.js";

const router = Router();

router.get("/", getAllEmployees);

export default router;