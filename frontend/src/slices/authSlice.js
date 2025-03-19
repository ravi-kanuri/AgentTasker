import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/auth/check");
    return res.data;
  } catch (error) {
    console.error("Error in checkAuth:", error);
    return rejectWithValue(null);
  }
});

export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    toast.success("Account created successfully");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
    return rejectWithValue(null);
  }
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    toast.success("Logged in successfully");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    return rejectWithValue(null);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/logout");
    toast.success("Logged out successfully"); 
    return null;
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
    return rejectWithValue(null);
  }
});


const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      // signup
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state) => {
        toast.error("Logout failed. Try again.");
      });
  },
});

export default authSlice.reducer;