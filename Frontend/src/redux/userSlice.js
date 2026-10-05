import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    applications: [],
    loading: false,
    error: "",
    savedProfile: null,
  },
  reducers: {
    setApplications(state, action) {
      state.applications = action.payload;
    },
    setUserLoading(state, action) {
      state.loading = action.payload;
    },
    setUserError(state, action) {
      state.error = action.payload;
    },
    setSavedProfile(state, action) {
      state.savedProfile = action.payload;
    },
  },
});

export const {
  setApplications,
  setUserLoading,
  setUserError,
  setSavedProfile,
} = userSlice.actions;
export default userSlice.reducer;
