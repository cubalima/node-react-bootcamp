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
