import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};
// ... (previous code)

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += 1; // If item exists, increase quantity
      } else {
        // If item doesn't exist, add with quantity 1
        state.cart.push({ ...newItem, quantity: 1 });
      }

      // Update local storage with the new cart state
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cart = state.cart.filter((item) => item._id !== itemIdToRemove._id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    IncreaseQuantity: (state, action) => {
      const itemIdToIncrease = action.payload._id;
      const itemToIncrease = state.cart.find(
        (item) => item._id === itemIdToIncrease
      );

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;

        // Update local storage with the new cart state
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    DecreaseQuantity: (state, action) => {
      const itemIdToDecrease = action.payload._id;
      const itemToDecrease = state.cart.find(
        (item) => item._id === itemIdToDecrease
      );

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;

        // Update local storage with the new cart state
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addToCart, removeFromCart, IncreaseQuantity, DecreaseQuantity } =
  CartSlice.actions;
export default CartSlice.reducer;
