import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch("http://localhost:4000/api/products");
      let jsonData = await response.json();
      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const Slice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default Slice.reducer;
