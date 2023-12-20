// userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
  loading: false,
  error: null,
  message: "",
  isUpdated: false,
};

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

// Create the user slice
export const ReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling the pending state while fetching user orders
    builder.addCase(PostReview.pending, (state) => {
      state.loading = true;
      state.isUpdated = false;
    });

    // Handling the fulfilled state after successfully fetching user orders
    builder.addCase(PostReview.fulfilled, (state, action) => {
      const { err, message } = action.payload;

      if (err) {
        state.error = err;
        state.loading = false;
        state.isUpdated = false;
      } else {
        state.loading = false;
        state.message = message;
        state.isUpdated = true;
      }
    });

    // Handling the rejected state if there is an error fetching user orders
    builder.addCase(PostReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
    });
  },
});

export default ReviewSlice.reducer;
