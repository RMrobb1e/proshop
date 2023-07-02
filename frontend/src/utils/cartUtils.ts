import { CartState } from '../types/cart';

export const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (cartState: CartState) => {
  // Calculate items price
  cartState.itemsPrice = addDecimals(
    cartState.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price (If order is over 100 then free, else 10 is shipping)
  cartState.shippingPrice = addDecimals(cartState.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price (15% tax)
  cartState.taxPrice = addDecimals(
    Number((0.15 * cartState.itemsPrice).toFixed(2))
  );

  // Calculate total price
  cartState.totalPrice = Number(
    (
      Number(cartState.itemsPrice) +
      Number(cartState.shippingPrice) +
      Number(cartState.taxPrice)
    ).toFixed(2)
  );

  localStorage.setItem('cart', JSON.stringify(cartState));

  return cartState;
};
