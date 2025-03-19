import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

// Add Agent
export const addAgent = createAsyncThunk("agent/addAgent",async (agentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/agent/addAgent", agentData);
      toast.success(response.data.message);
      return response.data.agent;
    } catch (error) {
      toast.error( error.response?.data?.message || "Failed to add agent. Please try again.");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get Agents
export const getAgents = createAsyncThunk("agent/getAgents",async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/agent/getAgents");
      return response.data;
    } catch (error) {
      // toast.error(error.response?.data?.message || "Failed to fetch agents. Please try again.");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get Agent Tasks
export const getAgentTasks = createAsyncThunk("agent/getAgentTasks",async (agentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/agent/getAgentTask/${agentId}`);
      return response.data.tasks;
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch tasks for this agent.");
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agents: [],
    tasks: [],
    addLoading: false,
    fetchLoading: false,
    taskLoading: false,
    error: null,
    selectedAgent:null,
  },
  reducers: {
    setSelectedAgent(state,action){
        state.selectedAgent=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Agent
      .addCase(addAgent.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addAgent.fulfilled, (state, action) => {
        state.addLoading = false;
        state.agents.push(action.payload);
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })

      // Get Agents
      .addCase(getAgents.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAgents.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.agents = action.payload;
      })      
      .addCase(getAgents.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      // Get Agent Tasks
      .addCase(getAgentTasks.pending, (state) => {
        state.taskLoading = true;
      })
      .addCase(getAgentTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(getAgentTasks.rejected, (state, action) => {
        state.taskLoading = false;
        state.error = action.payload;
      });
  },
});

export const {setSelectedAgent}=agentSlice.actions;

export default agentSlice.reducer;
