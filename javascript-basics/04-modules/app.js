import { calculatePrice, calculateDiscount } from './math.js';

const price = calculatePrice(100, 2);
const discountedPrice = calculateDiscount(price, 10);

console.log(`Price: $${price}`);
console.log(`Discounted Price: $${discountedPrice}`);
