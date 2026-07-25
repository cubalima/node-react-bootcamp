function calculatePrice(
    price: number,
    quantity: number
): number {
    return price * quantity;
}

const total = calculatePrice(25, 4);

console.log(total);
