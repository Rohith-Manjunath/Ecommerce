import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create a unique key for storing data in local storage
const LOCAL_STORAGE_KEY = "productsData";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (
    { keyword, currentPage, priceRange, category, ratingsRange = [0, 5] },
    { rejectWithValue }
  ) => {
    try {
      let response = await fetch(
        `http://localhost:4000/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${ratingsRange[0]}&ratings[lte]=${ratingsRange[1]}` +
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
        state.error = action.payload;
      });
  },
});

export default Slice.reducer;
