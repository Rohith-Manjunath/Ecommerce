import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const fetchProductsAdmin = createAsyncThunk(
  "admin/products",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch(`/api/admin/products`, {
        credentials: "include",
        method: "GET",
      });
      let jsonData = await response.json();

      if (jsonData.success) {
        localStorage.setItem(
          "adminProducts",
          JSON.stringify(jsonData.products)
        );
      }

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const fetchOrdersAdmin = createAsyncThunk(
  "admin/orders",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch(`/api/orders`, {
        credentials: "include",
        method: "GET",
      });
      let jsonData = await response.json();
      if (jsonData.success) {
        localStorage.setItem("adminOrders", JSON.stringify(jsonData.orders));
      }
      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const fetchUsersAdmin = createAsyncThunk(
  "admin/users",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch(`/api/admin/users`, {
        credentials: "include",
        method: "GET",
      });
      let jsonData = await response.json();
      if (jsonData.success) {
        localStorage.setItem("adminUsers", JSON.stringify(jsonData.users));
      }

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
      let response = await fetch(`/api/product/new`, {
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

export const deleteOrder = createAsyncThunk(
  "admin/delete/order",
  async (id, { rejectWithValue }) => {
    try {
      let response = await fetch(`/api/orders/delete/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      let jsonData = await response.json();

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/delete/product",
  async (id, { rejectWithValue }) => {
    try {
      let response = await fetch(`/api/product/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      let jsonData = await response.json();

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/delete/user",
  async (id, { rejectWithValue }) => {
    try {
      let response = await fetch(`/api/admin/user/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      let jsonData = await response.json();

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const UpdateProduct = createAsyncThunk(
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
      let response = await fetch(`/api/product/${id}`, {
        credentials: "include",
        method: "PUT",
        body: formData,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      response = await response.json();
      return response;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "admin/product",
  async (id, { rejectWithValue }) => {
    try {
      let response = await fetch(`/api/product/${id}`, {
        credentials: "include",
        method: "GET",
      });
      let jsonData = await response.json();

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = {
  products: JSON.parse(localStorage.getItem("adminProducts")) || [],
  orders: JSON.parse(localStorage.getItem("adminOrders")) || [],
  users: JSON.parse(localStorage.getItem("adminUsers")) || [],
  loading: false,
  error: "",
  success: false,
  isDeleted: false,
  isUpdated: false,
  product: {},
};

export const updateOrderStatus = createAsyncThunk(
  "order/status/update",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.set("status", status);

      let data = await fetch(`/api/orders/update/${id}`, {
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

export const updateUserRole = createAsyncThunk(
  "user/role/update",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.set("role", role);

      let data = await fetch(`/api/admin/user/${id}`, {
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

export const clearError = createAction("admin/clearError");
export const clearDeleteStatus = createAction("admin/clearDeleteStatus");
export const clearUpdateStatus = createAction("admin/clearUpdateStatus");
export const clearSuccess = createAction("admin/clearSuccess");

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUpdateStatus: (state) => {
      state.isUpdated = false;
    },
    clearDeleteStatus: (state) => {
      state.isDeleted = false;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsAdmin.fulfilled, (state, action) => {
        const { success, err, products } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.products = products;
          state.loading = false;
        }
      })
      .addCase(fetchProductsAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAdmin.fulfilled, (state, action) => {
        const { success, err, orders } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.orders = orders;
          state.loading = false;
        }
      })
      .addCase(fetchOrdersAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAdmin.fulfilled, (state, action) => {
        const { success, err, users } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.users = users;
          state.loading = false;
        }
      })
      .addCase(fetchUsersAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(CreateProducts.fulfilled, (state, action) => {
        const { success, err } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(CreateProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateProducts.rejected, (state, action) => {
        state.error = action.payload.err;
        state.loading = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const { success, err } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.loading = false;
          state.isDeleted = true;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { success, err } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.loading = false;
          state.isDeleted = true;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { success, err } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.loading = false;
          state.isDeleted = true;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(UpdateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        const { success, err } = action.payload;

        if (!success) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.isUpdated = true;
        }
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { success, err } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.loading = false;
          state.isUpdated = true;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        const { success, err, product } = action.payload;

        if (!success) {
          state.error = err;
        } else {
          state.loading = false;
          state.product = product;
        }
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { success, err } = action.payload;
        if (!success) {
          state.error = err;
        } else {
          state.loading = false;
          state.isUpdated = true;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default AdminSlice.reducer;
