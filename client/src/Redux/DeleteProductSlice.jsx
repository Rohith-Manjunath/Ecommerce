import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const DeleteProductAdmin = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      let response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      let jsonData = await response.json();

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

export const DeleteOrderSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DeleteProductAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on pending
      })
      .addCase(DeleteProductAdmin.fulfilled, (state, action) => {
        const { err, message } = action.payload;

        if (err) {
          state.loading = false;
          state.error = action.payload.err; // Adjust here
        } else {
          state.loading = false;
          state.error = null;
          state.message = message;
        }
      })
      .addCase(DeleteProductAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err; // Adjust here
      });
  },
});

export default DeleteOrderSlice.reducer;
