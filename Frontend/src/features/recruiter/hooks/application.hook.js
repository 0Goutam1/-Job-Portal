import { useDispatch, useSelector } from "react-redux";
import {
  jobApplications,
  statusApplications,
} from "../api/application.api";
import {
  setApplicationStatus,
  setApplications,
  setApplicationsError,
  setApplicationsLoading,
} from "../../../redux/applicationSlice";
import {
  getRequestError,
  normalizeListResponse,
} from "../../../redux/requests";

export const useApplication = () => {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector(
    (state) => state.applications
  );

  async function handleApplications(jobId) {
    dispatch(setApplicationsLoading(true));
    dispatch(setApplicationsError(""));
    try {
      const data = normalizeListResponse(await jobApplications(jobId));
      dispatch(setApplications(data));
      return data;
    } catch (error) {
      dispatch(setApplicationsError(getRequestError(error, "Unable to load applications.")));
      throw error;
    } finally {
      dispatch(setApplicationsLoading(false));
    }
  }

  async function handleStatus(applicationId, status) {
    dispatch(setApplicationsLoading(true));
    dispatch(setApplicationsError(""));
    try {
      const data = await statusApplications(applicationId, status);
      dispatch(setApplicationStatus({ applicationId, status }));
      return data;
    } catch (error) {
      dispatch(setApplicationsError(getRequestError(error, "Unable to update application status.")));
      throw error;
    } finally {
      dispatch(setApplicationsLoading(false));
    }
  }

  return {
    applications,
    loading,
    error,
    fetchApplications: handleApplications,
    handleApplications,
    updateApplicationStatus: handleStatus,
    handleStatus,
  };
};
