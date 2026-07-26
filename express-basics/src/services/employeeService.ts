import { Employee } from "../models/employee.js";
const employees: Employee[] = [
    {
        id: 1,
        name: "John Doe",
        position: "Software Engineer",
        salary: 60000
    }
];

class EmployeeService {
    getAll(): Employee[] {
        return employees;
    }

    getById(id: number): Employee | undefined {
        return employees.find(employee => employee.id === id);
    }
}

export default EmployeeService;
