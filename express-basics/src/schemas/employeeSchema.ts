import { z } from "zod";

export const createEmployeeSchema = z.object({
    name: z.string(),
    position: z.string(),
    department: z.string().optional(),
    salary: z.number()
}).strict();
