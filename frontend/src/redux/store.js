import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import csvReducer from "../slices/csvSlice";
import agentReducer from "../slices/agentSlice";

const store = configureStore({
    reducer: {
      auth: authReducer,
      csv: csvReducer,
      agent: agentReducer,
    },
  });
  
  export default store;