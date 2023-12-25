// userSlice.js

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const PostReview = createAsyncThunk(
  "review",
  async (reviewData, { rejectWithValue }) => {
    console.log(reviewData);
    try {
      let response = await fetch(`http://localhost:4000/api/review`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
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
