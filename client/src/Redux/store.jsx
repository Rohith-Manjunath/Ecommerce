import { configureStore } from "@reduxjs/toolkit";
import Slice from "./ProductSlice";
import userSlice from "./userSlice";
import CartSlice from "./CartSlice";

export const store = configureStore({
  reducer: {
    products: Slice,
    user: userSlice,
    cart: CartSlice,
  }, // Use the correct reducer name
});
