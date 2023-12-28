import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

// Create a unique key for storing data in local storage
const LOCAL_STORAGE_KEY = "productsData";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (
    {
      keyword = "",
      currentPage = 1,
      priceRange = [10, 200000],
      category = "",
      ratingsRange = [0, 5],
    },
    { rejectWithValue }
  ) => {
    try {
      let response = await fetch(
        `https://ecommerce2-0.onrender.com/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${ratingsRange[0]}&ratings[lte]=${ratingsRange[1]}` +
          (category ? `&category=${category}` : "")
      );
      let jsonData = await response.json();

      // Save the fetched data to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jsonData));

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

// Try to get initial state from local storage
const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState = {
  products: storedData ? JSON.parse(storedData) : [],
  loading: false,
  error: null,
};

export const clearError = createAction("products/clearError");

export const Slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
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
