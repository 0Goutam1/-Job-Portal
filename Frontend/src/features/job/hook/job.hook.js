import { useDispatch, useSelector } from "react-redux";
import { allJobs, applyJob, jobApplicants, postJob } from "../api/job.api";
import { setUser } from "../../../redux/authSlice";
import {
  setJobs,
  setJobsError,
  setJobsLoading,
} from "../../../redux/jobSlice";
import {
  getRequestError,
  normalizeListResponse,
} from "../../../redux/requests";

export const useJob = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const user = useSelector((state) => state.auth.user);

  async function handleJobs() {
    dispatch(setJobsLoading(true));
    dispatch(setJobsError(""));
    try {
      const data = normalizeListResponse(await allJobs());
      dispatch(setJobs(data));
      return data;
    } catch (error) {
      dispatch(setJobs([]));
      dispatch(setJobsError(getRequestError(error, "Unable to load jobs.")));
      return [];
    } finally {
      dispatch(setJobsLoading(false));
    }
  }

  async function handlePostJob(job) {
    dispatch(setJobsLoading(true));
    dispatch(setJobsError(""));
    try {
      return await postJob(job);
    } catch (error) {
      dispatch(setJobsError(getRequestError(error, "Unable to post job.")));
      throw error;
    } finally {
      dispatch(setJobsLoading(false));
    }
  }

  async function handleApplyJob(jobId) {
    dispatch(setJobsLoading(true));
    dispatch(setJobsError(""));
    try {
      return await applyJob(jobId);
    } catch (error) {
      dispatch(setJobsError(getRequestError(error, "Unable to apply for this job.")));
      throw error;
    } finally {
      dispatch(setJobsLoading(false));
    }
  }

  async function handleJobApplicants(applicantId) {
    dispatch(setJobsLoading(true));
    dispatch(setJobsError(""));
    try {
      return await jobApplicants(applicantId);
    } catch (error) {
      dispatch(setJobsError(getRequestError(error, "Unable to load applicants.")));
      throw error;
    } finally {
      dispatch(setJobsLoading(false));
    }
  }

  return {
    jobs: Array.isArray(jobs) ? jobs : [],
    setJobs: (nextJobs) => dispatch(setJobs(nextJobs)),
    loading,
    setLoading: (isLoading) => dispatch(setJobsLoading(isLoading)),
    error,
    setError: (nextError) => dispatch(setJobsError(nextError)),
    user,
    setuser: (nextUser) => dispatch(setUser(nextUser)),
    handleJobs,
    fetchJobs: handleJobs,
    handlePostJob,
    handleApplyJob,
    applyForJob: handleApplyJob,
    handleJobApplicants,
  };
};
