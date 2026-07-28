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

describe("POST /employees", () => {
    it("should create a new employee", async () => {
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
});
