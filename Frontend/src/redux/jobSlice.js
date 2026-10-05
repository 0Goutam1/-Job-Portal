import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: "",
  },
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    setJobsLoading(state, action) {
      state.loading = action.payload;
    },
    setJobsError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setJobs, setJobsLoading, setJobsError } = jobSlice.actions;
export default jobSlice.reducer;
