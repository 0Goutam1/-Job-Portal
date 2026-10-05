import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/authSlice";
import { getMyApplications, updateProfile } from "../api/user.api";
import {
  setApplications,
  setSavedProfile,
  setUserError,
  setUserLoading,
} from "../../../redux/userSlice";
import {
  getRequestError,
  normalizeListResponse,
} from "../../../redux/requests";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);
  const { applications, savedProfile, loading } = useSelector(
    (state) => state.user
  );

  async function handleProfile(profile) {
    dispatch(setUserLoading(true));
    dispatch(setUserError(""));
    try {
      const data = await updateProfile(profile);
      dispatch(setSavedProfile(data.profile));
      if (data.profile) dispatch(setUser(data.profile));
      return data;
    } catch (error) {
      dispatch(setUserError(getRequestError(error, "Unable to update your profile.")));
      throw error;
    } finally {
      dispatch(setUserLoading(false));
    }
  }

  async function handleMyApplication() {
    dispatch(setUserLoading(true));
    dispatch(setUserError(""));
    try {
      const data = await getMyApplications();
      const result = Array.isArray(data)
        ? data
        : data?.applications || data?.data || [];
      const myApplications = normalizeListResponse(result);
      dispatch(setApplications(myApplications));
      return myApplications;
    } catch (error) {
      dispatch(setUserError(getRequestError(error, "Unable to load your applications.")));
      throw error;
    } finally {
      dispatch(setUserLoading(false));
    }
  }

  return {
    user,
    setuser: (nextUser) => dispatch(setUser(nextUser)),
    applications: Array.isArray(applications) ? applications : [],
    setApplications: (nextApplications) => dispatch(setApplications(nextApplications)),
    fetchApplications: handleMyApplication,
    handleMyApplication,
    handleProfile,
    saveProfile: savedProfile,
    setSaveProfile: (profile) => dispatch(setSavedProfile(profile)),
    loading,
    setLoading: (isLoading) => dispatch(setUserLoading(isLoading)),
    authLoading,
  };
};
