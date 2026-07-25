import { Request, Response } from "express";
import EmployeeService from "../services/employeeService";
import { Employee } from "../models/employee";
export const getAllEmployees = (req: Request, res: Response): void => {
    const employeeService = new EmployeeService();
    const employees: Employee[] = employeeService.getAll();
    res.json(employees);
};