// userSlice.js

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const PostReview = createAsyncThunk(
  "review",
  async (reviewData, { rejectWithValue }) => {
    try {
      const { productId, comment, rating } = reviewData;

      const form = new FormData();
      form.set("productId", productId);
      form.set("comment", comment);
      form.set("rating", rating);

      let response = await fetch(
        `https://ecommerce-ev4m.onrender.com/api/review`,
        {
          method: "PUT",
          credentials: "include",

          body: form,
        }
      );
      let jsonData = await response.json();

      return jsonData;
    } catch (e) {
      return rejectWithValue({ message: e.message });
    }
  }
);

// Define the initial state for the user slice
const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const updateSuccess = createAction("review/updateSuccess");

// Create the user slice
export const ReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    updateSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Handling the pending state while fetching user orders
    builder
      .addCase(PostReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostReview.fulfilled, (state, action) => {
        const { success, err } = action.payload;

        if (!success) {
          state.error = err;
          state.loading = false;
        } else {
          state.loading = false;
          state.success = true;
        }
      })
      .addCase(PostReview.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default ReviewSlice.reducer;
