import { configureStore } from "@reduxjs/toolkit";
import Slice from "./ProductSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    products: Slice,
    user: userSlice,
  }, // Use the correct reducer name
});
