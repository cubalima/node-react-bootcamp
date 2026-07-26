import { Request, Response } from "express";
import EmployeeService from "../services/employeeService.js";
import { Employee } from "../models/employee.js";

const employeeService = new EmployeeService();

export const getAllEmployees = (req: Request, res: Response): void => {
    const employees: Employee[] = employeeService.getAll();
    res.json(employees);
};