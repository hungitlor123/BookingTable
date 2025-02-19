import { IAccount, IRegister } from "@/interfaces/Account";
import {
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
} from "@/services/constant/apiConfig";
import axiosInstance from "@/services/constant/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type AuthState = {
  auth: IAccount | null;
  loading: boolean;
  error: string | unknown;
  success: boolean;
};

const initialState: AuthState = {
  auth: null,
  loading: false,
  error: null,
  success: false,
};

export const registerAcount = createAsyncThunk<IAccount, IRegister>(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(REGISTER_ENDPOINT, data);
      if (response.data.success != 0) {
        toast.error(response.data.message);
      }
      if (response.data.success === 0) {
        toast.success("Register Successfully");
      }

      return response.data;
    } catch (error: any) {
      toast.error("Server Error");
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const loginAccount = createAsyncThunk<IAccount, string | Object>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(LOGIN_ENDPOINT, data);
      const { errCode, message, user } = response.data;

      if (errCode !== 0) {
        toast.error(message || "Login failed");
        return thunkAPI.rejectWithValue(message || "Login failed");
      }

      localStorage.setItem("bookingToken", user);
      toast.success("Login successful");

      return user;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Server Error";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Thêm action để logout
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string[] | unknown>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      // Xóa thông tin đăng nhập khỏi localStorage
      localStorage.removeItem("bookingToken");

      // Reset lại trạng thái auth
      state.auth = null;
      state.success = false;
      toast.success("Logout successful");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerAcount.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAcount.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
        state.success = true;
      })
      .addCase(registerAcount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.auth = action.payload;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
