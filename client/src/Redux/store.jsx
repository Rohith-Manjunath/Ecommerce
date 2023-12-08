import { configureStore } from "@reduxjs/toolkit";
import Slice from "./ProductSlice";

export const store = configureStore({
  reducer: Slice, // Use the correct reducer name
});
