import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice";
import authReducer from "./authSlice";
import companyReducer from "./companySlice";
import jobReducer from "./jobSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    user: userReducer,
    companies: companyReducer,
    applications: applicationReducer,
  },
});
