import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

// Upload CSV file
export const uploadCsv = createAsyncThunk('csv/uploadCsv',async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/csv/upload', formData, { headers: { 'Content-Type': 'multipart/form-data'}});
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'File upload failed');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Distribute CSV records among agents
export const distributeTask = createAsyncThunk('csv/distributeTask',async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/csv/distributeTask');
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Task distribution failed');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const csvSlice = createSlice({
  name: 'csv',
  initialState: {
    uploadLoading: false,
    distributeLoading: false,
    error: null,
    message: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCsv.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadCsv.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.message = action.payload.message;
      })
      .addCase(uploadCsv.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload;
      })
     //distribute
      .addCase(distributeTask.pending, (state) => {
        state.distributeLoading = true;
        state.error = null;
      })
      .addCase(distributeTask.fulfilled, (state, action) => {
        state.distributeLoading = false;
        state.message = action.payload.message;
      })
      .addCase(distributeTask.rejected, (state, action) => {
        state.distributeLoading = false;
        state.error = action.payload;
      });
  
  }
});


export default csvSlice.reducer;
