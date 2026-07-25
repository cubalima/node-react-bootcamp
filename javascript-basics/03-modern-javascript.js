const developer = {
  name: "John Doe",
  age: 30,
  isDeveloper: true,
  technologies: ["JavaScript", "React", "Node.js"]
};

const seniorDeveloper = {
  ...developer,
  age: 40,
  isSenior: true,
  technologies: [...developer.technologies, "TypeScript", "GraphQL"]
};

console.log(developer);
console.log(seniorDeveloper);

const employee = {
  name: "Jane Smith",
  position: "Frontend Developer",
  salary: 80000,
  skills: ["HTML", "CSS", "JavaScript"],
  address: null
};

console.log(employee.address.addressLine1);