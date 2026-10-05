import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
