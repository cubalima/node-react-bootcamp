import { CreateEmployee, Employee } from "../models/employee.js";
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

    create(employee: CreateEmployee): Employee {
        const newEmployee = { ...employee, id: this.newId() };
        employees.push(newEmployee);
        return newEmployee;
    }

    private newId(): number {
        if (employees.length === 0) {
            return 1;
        }
        return Math.max(...employees.map(e => e.id)) + 1;
    }
}

export default EmployeeService;
