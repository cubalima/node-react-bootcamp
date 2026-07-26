import { Request, Response } from "express";
import EmployeeService from "../services/employeeService.js";
import { CreateEmployee, Employee } from "../models/employee.js";

const employeeService = new EmployeeService();
interface EmployeeParams {
    id: string;
}

export const getAllEmployees = (req: Request, res: Response): void => {
    const employees: Employee[] = employeeService.getAll();
    res.json(employees);
};

export const getEmployeeById = (req: Request<EmployeeParams>, res: Response): void => {
    const idNumber = Number(req.params.id);

    if (!Number.isInteger(idNumber)) {
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

export const createEmployee = (req: Request<{}, {}, unknown>, res: Response): void => {
    const employee = req.body;
    if (!isValidEmployee(employee)) {
        res.status(400).json({ message: "Missing required fields or invalid data" });
        return;
    }
    const newEmployee: Employee = employeeService.create(employee);
    res.status(201).json(newEmployee);
}

function isValidEmployee(data: unknown): data is CreateEmployee {
    if (typeof data !== "object" || data === null) {
        return false;
    }

    const employeeData = data as Record<string, unknown>;

    if ("id" in employeeData) {
        return false; // ID should not be provided when creating a new employee
    }

    return typeof employeeData.name === "string" &&
        typeof employeeData.position === "string" &&
        typeof employeeData.salary === "number" && 
        (typeof employeeData.department === "string" || employeeData.department === undefined);
}

export const updateEmployee = (req: Request<EmployeeParams, {}, unknown>, res: Response): void => {
    const idNumber: number = parseInt(req.params.id, 10);

    if (isNaN(idNumber)) {
        res.status(400).json({ message: "Invalid employee ID" });
        return;
    }

    const employee = req.body;
    if (!isValidEmployee(employee)) {
        res.status(400).json({ message: "Invalid employee data" });
        return;
    }

    const updatedEmployee = employeeService.update(idNumber, employee);
    if (updatedEmployee) {
        res.json(updatedEmployee);
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
};

export const deleteEmployee = (req: Request<EmployeeParams>, res: Response): void => {
    const idNumber: number = parseInt(req.params.id, 10);

    if (isNaN(idNumber)) {
        res.status(400).json({ message: "Invalid employee ID" });
        return;
    }

    const isDeleted = employeeService.delete(idNumber);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
};
