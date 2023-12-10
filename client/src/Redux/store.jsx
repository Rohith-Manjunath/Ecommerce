import { configureStore } from "@reduxjs/toolkit";
import Slice from "./ProductSlice";
import UserSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    products: Slice,
    user: UserSlice,
  }, // Use the correct reducer name
});
