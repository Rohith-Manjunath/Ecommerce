import { configureStore } from "@reduxjs/toolkit";
import Slice from "./ProductSlice";
import userSlice from "./userSlice";
import CartSlice from "./CartSlice";
import OrderSlice from "./OrderSlice";

export const store = configureStore({
  reducer: {
    products: Slice,
    user: userSlice,
    cart: CartSlice,
    order: OrderSlice,
  }, // Use the correct reducer name
});
