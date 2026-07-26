import { Request, Response } from "express";
import EmployeeService from "../services/employeeService.js";
import { Employee } from "../models/employee.js";

const employeeService = new EmployeeService();
interface EmployeeParams {
    id: string;
}

export const getAllEmployees = (req: Request, res: Response): void => {
    const employees: Employee[] = employeeService.getAll();
    res.json(employees);
};

export const getEmployeeById = (req: Request<EmployeeParams>, res: Response): void => {
    const idNumber: number = parseInt(req.params.id, 10);

    if (isNaN(idNumber)) {
        res.status(400).json({ message: "Invalid employee ID" });
        return;
    }

    const employee: Employee | undefined = employeeService.getById(idNumber);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
};
