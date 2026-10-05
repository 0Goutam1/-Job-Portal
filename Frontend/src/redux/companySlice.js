import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    myCompanies: [],
    loading: false,
    error: "",
  },
  reducers: {
    setCompanies(state, action) {
      state.companies = action.payload;
    },
    setMyCompanies(state, action) {
      state.myCompanies = action.payload;
    },
    setCompaniesLoading(state, action) {
      state.loading = action.payload;
    },
    setCompaniesError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCompanies,
  setMyCompanies,
  setCompaniesLoading,
  setCompaniesError,
} = companySlice.actions;
export default companySlice.reducer;
