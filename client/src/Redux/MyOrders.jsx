// userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
  orders: JSON.parse(localStorage.getItem("myOrders")) || [],
  loading: false,
  error: null,
};

export const OrdersDispatch = createAsyncThunk(
  "user/myorders",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch(
        `https://ecommerce2-0.onrender.com/api/orders/me`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let jsonData = await response.json();
      if (jsonData.success) {
        localStorage.setItem("myOrders", JSON.stringify(jsonData.order));
      }

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

// Create the user slice
export const MyOrderSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling the pending state while fetching user orders
    builder.addCase(OrdersDispatch.pending, (state) => {
      state.loading = true;
    });

    // Handling the fulfilled state after successfully fetching user orders
    builder.addCase(OrdersDispatch.fulfilled, (state, action) => {
      const { err, order } = action.payload;

      if (err) {
        state.error = err;
        state.loading = false;
      } else {
        state.loading = false;
        state.orders = order;
      }
    });

    // Handling the rejected state if there is an error fetching user orders
    builder.addCase(OrdersDispatch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default MyOrderSlice.reducer;
