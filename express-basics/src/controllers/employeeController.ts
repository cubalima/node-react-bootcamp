import { Request, Response } from "express";
import EmployeeService from "../services/employeeService.js";
import { Employee } from "../models/employee.js";
import { createEmployeeSchema } from "../schemas/employeeSchema.js";

const employeeService = new EmployeeService();
interface EmployeeParams {
    id: string;
}

export const getAllEmployees = (req: Request, res: Response): void => {
    const employees: Employee[] = employeeService.getAll();
    res.json(employees);
};

export const getEmployeeById = (req: Request<EmployeeParams>, res: Response): void => {
    const idNumber = parseEmployeeId(req.params.id);

    if (!idNumber) {
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
    const result = createEmployeeSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ message: "Invalid employee data" });
        return;
    }
    const newEmployee: Employee = employeeService.create(result.data);
    res.status(201).json(newEmployee);
}

export const updateEmployee = (req: Request<EmployeeParams, {}, unknown>, res: Response): void => {
    const idNumber = parseEmployeeId(req.params.id);
    if (!idNumber) {
        res.status(400).json({ message: "Invalid employee ID" });
        return;
    }

    const result = createEmployeeSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ message: "Invalid employee data" });
        return;
    }

    const updatedEmployee = employeeService.update(idNumber, result.data);
    if (updatedEmployee) {
        res.json(updatedEmployee);
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
};

export const deleteEmployee = (req: Request<EmployeeParams>, res: Response): void => {
    const idNumber = parseEmployeeId(req.params.id);

    if (!idNumber) {
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

function parseEmployeeId(idParam: string): number | undefined {
    if (!/^[1-9]\d*$/.test(idParam)) {
        return undefined;
    }
    return Number(idParam);
}

