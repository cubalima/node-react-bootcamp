
const calculateDiscountedPrice = (price, quantity, discount) => 
    price * quantity * (1 - discount);


const total = calculateDiscountedPrice(10, 5, 0.1);
console.log(`Total Price: $${total}`);

const developer = {
    name: "Angel",
    age: 25,
    isDeveloper: true,
    technologies: ["JavaScript", "React", "Node.js"]
};

console.log("Developer Info:", developer);
console.log(`Name: ${developer.name}`);
console.log(`Age: ${developer.age}`);
console.log(`Is Developer: ${developer.isDeveloper}`);
console.log(`Technologies: ${developer.technologies.join(", ")}`);

developer.company = "Tech Solutions"; // Adding a new property to the object
console.log(`Company: ${developer.company}`);

const { name, age, isDeveloper, technologies, company } = developer; // Destructuring the object
console.log(`Destructured Info - Name: ${name}, Age: ${age}, Is Developer: ${isDeveloper}, Technologies: ${technologies.join(", ")}, Company: ${company}`);
