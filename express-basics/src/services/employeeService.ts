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

    update(id: number, updatedEmployee: CreateEmployee): Employee | undefined {
        const employeeIndex = employees.findIndex(emp => emp.id === id);
        if (employeeIndex === -1) {
            return undefined;
        }

        const employee = employees[employeeIndex];
        if (!employee) {
            return undefined;
        }
        const updatedEmployeeData = { ...employee, ...updatedEmployee };
        employees[employeeIndex] = updatedEmployeeData;
        return updatedEmployeeData;
    }

    delete(id: number): boolean {
        const employeeIndex = employees.findIndex(emp => emp.id === id);
        if (employeeIndex === -1) {
            return false;
        }
        employees.splice(employeeIndex, 1);
        return true;
    }
}

export default EmployeeService;
