import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetSingleOrder = createAsyncThunk(
  "order/singleOrder",
  async (id, { rejectWithValue }) => {
    try {
      let response = await fetch(
        `https://ecommerce-ev4m.onrender.com/api/orders/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      let jsonData = await response.json();
      if (jsonData.success) {
        localStorage.setItem(
          "singleOrderDetails",
          JSON.stringify(jsonData.order)
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
  item: JSON.parse(localStorage.getItem("singleOrderDetails")) || {},
};

export const singleOrderSlice = createSlice({
  name: "singleOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on pending
      })
      .addCase(GetSingleOrder.fulfilled, (state, action) => {
        const { order, err } = action.payload;

        if (err) {
          state.loading = false;
          state.error = action.payload.err; // Adjust here
        } else {
          state.loading = false;
          state.error = null;
          state.item = order;
        }
      })
      .addCase(GetSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err; // Adjust here
      });
  },
});

export default singleOrderSlice.reducer;
