import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router";
import { getMe } from "../features/auth/api/auth-api";
import {
  setAuthError,
  setAuthLoading,
  setUser,
} from "./authSlice";
import { getRequestError } from "./requests";
import { router } from "../AppRouter";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthLoading(true));
    getMe()
      .then((data) => dispatch(setUser(data.user)))
      .catch((error) =>
        dispatch(setAuthError(getRequestError(error, "Unable to load your account.")))
      )
      .finally(() => dispatch(setAuthLoading(false)));
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default AuthInitializer;
