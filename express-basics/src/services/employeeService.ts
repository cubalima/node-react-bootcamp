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
}

export default EmployeeService;