import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetProductDetails = createAsyncThunk(
  "productDetails",
  async ({ id }, { rejectWithValue }) => {
    try {
      let response = await fetch(`http://localhost:4000/api/product/${id}`, {
        method: "GET",
        credentials: "include",
      });

      let jsonData = await response.json();

      if (jsonData.success) {
        localStorage.setItem(
          "productDetails",
          JSON.stringify(jsonData.product)
        );
      }

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  item: JSON.parse(localStorage.getItem("productDetails")) || {},
};

export const ProductDetailSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on pending
      })
      .addCase(GetProductDetails.fulfilled, (state, action) => {
        const { product, err } = action.payload;

        if (err) {
          state.loading = false;
          state.error = action.payload.err; // Adjust here
        } else {
          state.loading = false;
          state.error = null;
          state.item = product;
        }
      })
      .addCase(GetProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Adjust here
      });
  },
});

export default ProductDetailSlice.reducer;
