import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, updateOrderStatus } from '../api';
import { pendingCase, rejectedCase } from './functions';

export const createOrderThunk = createAsyncThunk(
  'orders/createOrderThunk',
  async (values, thunkAPI) => {
    try {
      const response = await createOrder(values);
      return response.data.data;
    } catch (error) {
      const msg = error.response.data.errors[0];
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  'orders/updateOrderStatusThunk',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updateOrderStatus(id, status);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.errors[0]);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateOrderStatusThunk.pending, pendingCase);
    builder.addCase(updateOrderStatusThunk.rejected, rejectedCase);
    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.orders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(createOrderThunk.pending, pendingCase);
    builder.addCase(createOrderThunk.rejected, rejectedCase);
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders.push(action.payload);
    });
  },
});

export default ordersSlice.reducer;
