import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, getAccount, updateUser } from '../api';
import { pendingCase, rejectedCase } from './functions';

export const updateUserThunk = createAsyncThunk(
  'auth/updateUserThunk',
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await updateUser(id, values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  'auth/registerUserThunk',
  async (values, thunkAPI) => {
    try {
      const response = await registerUser(values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/loginUserThunk',
  async (values, thunkAPI) => {
    try {
      const response = await loginUser(values);
      localStorage.setItem('token', response.data.data.token);
      return response.data.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAccountThunk = createAsyncThunk(
  'auth/getAccountThunk',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No token');
      }
      const response = await getAccount();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUserThunk',
  async () => {
    localStorage.removeItem('token');
  }
);

const fulfilledCase = (state, action) => {
  state.error = null;
  state.isLoading = false;
  state.user = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null;
      state.error = null;
    });

    builder.addCase(updateUserThunk.pending, pendingCase);
    builder.addCase(registerUserThunk.pending, pendingCase);
    builder.addCase(loginUserThunk.pending, pendingCase);
    builder.addCase(getAccountThunk.pending, pendingCase);

    builder.addCase(updateUserThunk.rejected, rejectedCase);
    builder.addCase(registerUserThunk.rejected, rejectedCase);
    builder.addCase(loginUserThunk.rejected, rejectedCase);
    builder.addCase(getAccountThunk.rejected, rejectedCase);

    builder.addCase(updateUserThunk.fulfilled, fulfilledCase);
    builder.addCase(registerUserThunk.fulfilled, fulfilledCase);
    builder.addCase(loginUserThunk.fulfilled, fulfilledCase);
    builder.addCase(getAccountThunk.fulfilled, fulfilledCase);
  },
});

export default authSlice.reducer;
