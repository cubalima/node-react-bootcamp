export const calculatePrice = (price, quantity) =>
  price * quantity;

export const calculateDiscount = (price, discount) => {
  return price - (price * (discount / 100));
}