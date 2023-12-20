import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsAdmin = createAsyncThunk(
  "admin/products",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch(`http://localhost:4000/api/admin/products`, {
        credentials: "include",
        method: "GET",
      });
      let jsonData = await response.json();

      if (jsonData.success) {
        localStorage.setItem(
          "adminProducts",
          JSON.stringify(jsonData.products)
        );
        return jsonData; // Return the entire jsonData object
      } else {
        // Handle the case where success is false
        return rejectWithValue({ message: jsonData.message });
      }
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const fetchUsersAdmin = createAsyncThunk(
  "admin/users",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch(`http://localhost:4000/api/admin/users`, {
        credentials: "include",
        method: "GET",
      });
      let jsonData = await response.json();

      if (jsonData.success) {
        localStorage.setItem("UsersForAdmin", JSON.stringify(jsonData.users));
        return jsonData; // Return the entire jsonData object
      } else {
        // Handle the case where success is false
        return rejectWithValue({ message: jsonData.message });
      }
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const fetchOrdersAdmin = createAsyncThunk(
  "admin/orders",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch(`http://localhost:4000/api/orders`, {
        credentials: "include",
        method: "GET",
      });
      let jsonData = await response.json();

      if (jsonData.success) {
        localStorage.setItem("adminOrders", JSON.stringify(jsonData.orders));
        return jsonData; // Return the entire jsonData object
      }
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

// Try to get initial state from local storage
const storedData = localStorage.getItem("adminProducts");
const initialState = {
  products: storedData ? JSON.parse(storedData) : [],
  loading: false,
  error: null,
  users: localStorage.getItem("UsersForAdmin") || [],
  orders: localStorage.getItem("adminOrders") || [],
};

export const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsAdmin.fulfilled, (state, action) => {
        const { err, products } = action.payload; // Corrected destructuring
        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.products = products;
        }
      })
      .addCase(fetchProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAdmin.fulfilled, (state, action) => {
        const { err, orders, totalAmount } = action.payload; // Corrected destructuring
        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.orders = orders;
          state.totalAmount = totalAmount;
        }
      })
      .addCase(fetchOrdersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAdmin.fulfilled, (state, action) => {
        const { err, users } = action.payload; // Corrected destructuring
        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.users = users;
        }
      })
      .addCase(fetchUsersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdminProductsSlice.reducer;
