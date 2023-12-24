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
      // Handle network errors or other exceptions
      return rejectWithValue({ message: e.message });
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "admin/delete/order",
  async (id, { rejectWithValue }) => {
    try {
      let response = await fetch(
        `http://localhost:4000/api/orders/delete/${id}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );
      let jsonData = await response.json();

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const CreateProducts = createAsyncThunk(
  "admin/create",
  async (data, { rejectWithValue }) => {
    const { name, stock, price, description, category, images } = data;
    const formData = new FormData();
    formData.set("name", name);
    formData.set("stock", stock);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      let response = await fetch(`http://localhost:4000/api/product/new`, {
        credentials: "include",
        method: "POST",
        body: formData,
        headers: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
      response = await response.json();
      return response;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const UpdateProductAdmin = createAsyncThunk(
  "admin/update",
  async ({ finalData, id }, { rejectWithValue }) => {
    const { name, stock, price, description, category, images } = finalData;
    const formData = new FormData();
    formData.set("name", name);
    formData.set("stock", stock);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      let response = await fetch(`http://localhost:4000/api/product/${id}`, {
        credentials: "include",
        method: "PUT",
        body: formData,
        headers: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
      response = await response.json();
      return response;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/status/update",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.set("status", status);

      let data = await fetch(`http://localhost:4000/api/orders/update/${id}`, {
        credentials: "include",
        method: "PUT",
        body: form,
      });
      data = await data.json();

      return data;
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
  users: JSON.parse(localStorage.getItem("UsersForAdmin")) || [],
  orders: JSON.parse(localStorage.getItem("adminOrders")) || [],
  message: "",
  isUpdated: false,
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
        const { err, orders } = action.payload; // Corrected destructuring
        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.orders = orders;
        }
      })
      .addCase(fetchUsersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CreateProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateProducts.fulfilled, (state, action) => {
        const { err, users, message } = action.payload; // Corrected destructuring
        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.users = users;
          state.message = message;
        }
      })
      .addCase(CreateProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UpdateProductAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProductAdmin.fulfilled, (state, action) => {
        const { err, message } = action.payload; // Corrected destructuring
        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.message = message;
        }
      })
      .addCase(UpdateProductAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const { err } = action.payload; // Corrected destructuring
        if (err) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.message = "Order deleted successfully";
        }
      })
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { err, success } = action.payload;
        if (!success) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.message = "Order status updated successfull";
          state.error = null;
          state.isUpdated = true;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdminProductsSlice.reducer;
