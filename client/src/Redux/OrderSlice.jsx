import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const NewOrder = createAsyncThunk(
  "order/success",
  async ({ order }, { rejectWithValue }) => {
    const {
      shippingInfo,
      phoneNo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus,
    } = order;

    try {
      const mappedOrderItems = orderItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        image: item.imageURLs[0].url,
        price: item.price,
        product: item._id, // Assuming productId is the property name for product id
      }));

      const { status } = paymentInfo;

      let response = await fetch(`/api/order/new`, {
        method: "POST",
        body: JSON.stringify({
          shippingInfo,
          phoneNo,
          orderItems: mappedOrderItems,
          paymentInfo: { id: "sample", status },
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
          orderStatus,
        }),
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
  success: false,
  error: null,
  message: "",
};

export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(NewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(NewOrder.fulfilled, (state, action) => {
        if (action.payload.err) {
          state.loading = false;
          state.error = action.payload.err; // Update here
        } else {
          state.success = true;
          state.error = null;
          state.loading = false;
          state.message = "Order placed successfully";
        }
      })
      .addCase(NewOrder.rejected, (state, action) => {
        state.error = action.payload.message; // Update here
        state.loading = false;
      });
  },
});

export default OrderSlice.reducer;
