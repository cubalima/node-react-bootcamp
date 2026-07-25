async function getUser(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();
    console.log(user); // This will log a Promise, not the actual user data
}

async function suma(a, b) {
    return a + b;
}

getUser();
const result = suma(1, 2);
console.log(result);
const value = await result;
console.log(value);