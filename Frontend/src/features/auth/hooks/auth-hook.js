import { useDispatch, useSelector } from "react-redux";
import { getMe, logOut, login, register ,sendOTP} from "../api/auth-api";
import {
  setAuthError,
  setAuthLoading,
  setUser,
} from "../../../redux/authSlice";
import { getRequestError } from "../../../redux/requests";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  async function handleLogin({ userName, password }) {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));
    try {
      const data = await login({ userName, password });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(setAuthError(getRequestError(error, "Unable to log in.")));
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  }

  async function handleRegister({ userName, email, password, role ,otp}) {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));
    try {
      const data = await register({ userName, email, password, role,otp });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(setAuthError(getRequestError(error, "Unable to register.")));
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  }

  async function handleLogOut() {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));
    try {
      const data = await logOut();
      dispatch(setUser(null));
      return data;
    } catch (error) {
      dispatch(setAuthError(getRequestError(error, "Unable to log out.")));
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  }

  async function handleGetMe() {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));
    try {
      const data = await getMe();
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(setAuthError(getRequestError(error, "Unable to load your account.")));
      return null;
    } finally {
      dispatch(setAuthLoading(false));
    }
  }

  async function handleSendOTP(email) {
  dispatch(setAuthLoading(true));
  dispatch(setAuthError(null));

  try {
    const data = await sendOTP(email);
    return data;
  } catch (error) {
    dispatch(setAuthError(getRequestError(error, "Unable to send OTP.")));
    throw error;
  } finally {
    dispatch(setAuthLoading(false));
  }
}


  return {
    user,
    loading,
    error,
    setuser: (nextUser) => dispatch(setUser(nextUser)),
    setloading: (isLoading) => dispatch(setAuthLoading(isLoading)),
    handleGetMe,
    handleLogOut,
    handleLogin,
    handleRegister,
    handleSendOTP,

  };
};
