import { configureStore } from "@reduxjs/toolkit";
import Slice from "./ProductSlice";
import userSlice from "./userSlice";
import CartSlice from "./CartSlice";
import OrderSlice from "./OrderSlice";
import MyOrderSlice from "./MyOrders";
import SingleOrderSlice from "./SingleOrderSlice";

export const store = configureStore({
  reducer: {
    products: Slice,
    user: userSlice,
    cart: CartSlice,
    order: OrderSlice,
    myOrders: MyOrderSlice,
    singleorder: SingleOrderSlice,
  },
});
