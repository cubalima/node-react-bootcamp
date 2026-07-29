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

    it("should return 404 for a non-existent employee", async () => {
        const getAllResponse = await request(app)
            .get("/employees");
        expect(getAllResponse.status).toBe(200);
        const maxId = getAllResponse.body.reduce((max: number, emp: { id: number }) => Math.max(max, emp.id), 0);

        const response = await request(app)
            .get(`/employees/${maxId + 1}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Employee not found");
    });

    const invalidIds = [
        { testName: "zero ID", id: "0" },
        { testName: "negative ID", id: "-1" },
        { testName: "decimal ID", id: "1.5" },
        { testName: "not numeric", id: "1abc" },
        { testName: "scientific notation", id: "1e2" },
        { testName: "hexadecimal", id: "0x10" },
        { testName: "leading zero", id: "01" },
    ];

    it.each(invalidIds)("should return 400 for an invalid employee ID: $testName --> $id", async (invalidId) => {
        const response = await request(app)
            .get(`/employees/${invalidId.id}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Invalid employee ID");
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
            .get("/employees"));
        expect(employeesBefore.status).toBe(200);

        const response = await request(app)
            .post("/employees")
            .send(employee);

        const employeesAfter = (await request(app)
            .get("/employees"));
        expect(employeesAfter.status).toBe(200);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Invalid employee data");
        expect(employeesAfter.body).toEqual(employeesBefore.body);
    });
});

describe("PUT /employees/:id", () => {
    it("should update an existing employee", async () => {
        const newEmployee = {
            name: "John Doe",
            position: "Software Engineer",
            salary: 60000
        };

        const createResponse = await request(app)
            .post("/employees")
            .send(newEmployee);
        expect(createResponse.status).toBe(201);

        const updatedEmployee = {
            name: "John Doe",
            position: "Senior Software Engineer",
            salary: 70000
        };
        const updateResponse = await request(app)
            .put(`/employees/${createResponse.body.id}`)
            .send(updatedEmployee);
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toEqual({ ...updatedEmployee, id: createResponse.body.id });

        const getResponse = await request(app)
            .get(`/employees/${createResponse.body.id}`);

        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toEqual(updateResponse.body);
    });

    it("should return 404 for a non-existent employee", async () => {
        const getAllResponse = await request(app)
            .get("/employees");
        expect(getAllResponse.status).toBe(200);
        const maxId = getAllResponse.body.reduce((max: number, emp: { id: number }) => Math.max(max, emp.id), 0);

        const response = await request(app)
            .put(`/employees/${maxId + 1}`)
            .send({ name: "Jane Doe", position: "Software Engineer", salary: 60000 });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Employee not found");
    });

    it("should return 400 for an invalid employee ID", async () => {
        const response = await request(app)
            .put("/employees/1abc")
            .send({ name: "Jane Doe", position: "Software Engineer", salary: 60000 });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Invalid employee ID");
    });

    it("should return 400 for invalid employee data", async () => {
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
            .put(`/employees/${createResponse.body.id}`)
            .send({ name: "Jane Doe", position: "Software Engineer", salary: "60000" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Invalid employee data");

        const getResponse = await request(app)
            .get(`/employees/${createResponse.body.id}`);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toEqual(createResponse.body);
    });
});

describe("DELETE /employees/:id", () => {
    it("should delete an existing employee", async () => {
        const newEmployee = {
            name: "John Doe",
            position: "Software Engineer",
            salary: 60000
        };
        const createResponse = await request(app)
            .post("/employees")
            .send(newEmployee);
        expect(createResponse.status).toBe(201);
        const deleteResponse = await request(app)
            .delete(`/employees/${createResponse.body.id}`);
        expect(deleteResponse.status).toBe(204);
        expect(deleteResponse.text).toBe("");

        const getResponse = await request(app)
            .get(`/employees/${createResponse.body.id}`);
        expect(getResponse.status).toBe(404);
        expect(getResponse.body).toHaveProperty("message", "Employee not found");
    });

    it("should return 404 for a non-existent employee", async () => {
        const getAllResponse = await request(app)
            .get("/employees");
        expect(getAllResponse.status).toBe(200);
        const maxId = getAllResponse.body.reduce((max: number, emp: { id: number }) => Math.max(max, emp.id), 0);

        const response = await request(app)
            .delete(`/employees/${maxId + 1}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Employee not found");

        const getAllResponseAfter = await request(app)
            .get("/employees");
        expect(getAllResponseAfter.status).toBe(200);
        expect(getAllResponseAfter.body).toEqual(getAllResponse.body);
    });

    it("should return 400 for an invalid employee ID", async () => {
        const response = await request(app)
            .delete("/employees/1abc");
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Invalid employee ID");
    });
});
