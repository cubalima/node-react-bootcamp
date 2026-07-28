import request from "supertest";
import { app } from "../app.js";
import { describe, it, expect } from "vitest";

describe("GET /employees", () => {
    it("should retrieve all employees", async () => {
        const response = await request(app)
            .get("/employees");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("GET /employees/:id", () => {
    it("should retrieve an employee by ID", async () => {
        const newEmployee = {
            name: "John Doe",
            position: "Software Engineer",
            salary: 60000
        };

        const createResponse = await request(app)
            .post("/employees")
            .send(newEmployee);

        expect(createResponse.status).toBe(201);

        const response = await request(app)
            .get(`/employees/${createResponse.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(createResponse.body);
    });
});

describe("POST /employees", () => {
    it("should create a new employee without department", async () => {
        const newEmployee = {
            name: "John Doe",
            position: "Software Engineer",
            salary: 60000
        };

        const response = await request(app)
            .post("/employees")
            .send(newEmployee);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newEmployee);
        expect(response.body.id).toBeTypeOf("number");
    });

    it("should create a new employee with department", async () => {
        const newEmployee = {
            name: "John Doe",
            position: "Software Engineer",
            department: "Engineering",
            salary: 60000
        };

        const response = await request(app)
            .post("/employees")
            .send(newEmployee);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newEmployee);
        expect(response.body.id).toBeTypeOf("number");
    });

    const invalidEmployees = [
        {   
            testName: "salary is not a number", 
            employee: { name: "Jane Doe", position: "Software Engineer", salary: "60000" } 
        },
        {   
            testName: "department is not a string", 
            employee: { name: "Jane Doe", position: "Software Engineer", department: 123, salary: 60000 } 
        },
        {   
            testName: "body contains an unknown field", 
            employee: { name: "Jane Doe", position: "Software Engineer", salary: 60000, email: "whatever@gmail.com" } 
        },
        {   
            testName: "name field is missing", 
            employee: { position: "Software Engineer", salary: 60000 } 
        },
        {   
            testName: "body contains an id", 
            employee: { id: 1, name: "Jane Doe", position: "Software Engineer", salary: 60000 } 
        }
    ];

    it.each(invalidEmployees)("should return 400 when $testName", async ({ employee }) => {
        const employeesBefore = (await request(app)
            .get("/employees"))
            .body;

        const response = await request(app)
            .post("/employees")
            .send(employee);

        const employeesAfter = (await request(app)
            .get("/employees"))
            .body;

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Invalid employee data");
        expect(employeesAfter).toHaveLength(employeesBefore.length);
    });
});
