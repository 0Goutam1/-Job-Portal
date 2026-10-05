import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    error: "",
  },
  reducers: {
    setApplications(state, action) {
      state.applications = action.payload;
    },
    setApplicationsLoading(state, action) {
      state.loading = action.payload;
    },
    setApplicationsError(state, action) {
      state.error = action.payload;
    },
    setApplicationStatus(state, action) {
      const { applicationId, status } = action.payload;
      state.applications = state.applications.map((application) =>
        application._id === applicationId
          ? { ...application, status }
          : application
      );
    },
  },
});

export const {
  setApplications,
  setApplicationsLoading,
  setApplicationsError,
  setApplicationStatus,
} = applicationSlice.actions;
export default applicationSlice.reducer;
