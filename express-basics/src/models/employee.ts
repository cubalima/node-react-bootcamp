export interface Employee {
    id: number;
    name: string;
    position: string;
    department?: string;
    salary: number;
}

export type CreateEmployee = Omit<Employee, "id">;
