import { useDispatch, useSelector } from "react-redux";
import {
  allCompanies,
  createCompany,
  getMyCompanies,
} from "../api/company.api";
import {
  setCompanies,
  setCompaniesError,
  setCompaniesLoading,
  setMyCompanies,
} from "../../../redux/companySlice";
import {
  getRequestError,
  normalizeListResponse,
} from "../../../redux/requests";

export const useCompany = () => {
  const dispatch = useDispatch();
  const { companies, myCompanies, loading, error } = useSelector(
    (state) => state.companies
  );

  async function handleCreateCompany(company) {
    dispatch(setCompaniesLoading(true));
    dispatch(setCompaniesError(""));
    try {
      return await createCompany(company);
    } catch (error) {
      dispatch(setCompaniesError(getRequestError(error, "Unable to create company.")));
      throw error;
    } finally {
      dispatch(setCompaniesLoading(false));
    }
  }

  async function handleMyCompanies() {
    dispatch(setCompaniesLoading(true));
    dispatch(setCompaniesError(""));
    try {
      const data = normalizeListResponse(await getMyCompanies());
      dispatch(setMyCompanies(data));
      return data;
    } catch (error) {
      dispatch(setMyCompanies([]));
      dispatch(setCompaniesError(getRequestError(error, "Unable to load your companies.")));
      return [];
    } finally {
      dispatch(setCompaniesLoading(false));
    }
  }

  async function handleAllCompanies() {
    dispatch(setCompaniesLoading(true));
    dispatch(setCompaniesError(""));
    try {
      const data = normalizeListResponse(await allCompanies());
      dispatch(setCompanies(data));
      return data;
    } catch (error) {
      dispatch(setCompanies([]));
      dispatch(setCompaniesError(getRequestError(error, "Unable to load companies.")));
      return [];
    } finally {
      dispatch(setCompaniesLoading(false));
    }
  }

  return {
    companies,
    myCompanies,
    loading,
    error,
    fetchMyCompanies: handleMyCompanies,
    handleMyCompanies,
    fetchCompanies: handleAllCompanies,
    handleCreateCompany,
  };
};
