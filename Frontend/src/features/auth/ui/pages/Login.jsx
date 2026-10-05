import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth-hook";
import { getRequestError } from "../../../../redux/requests";

const Login = () => {
  const { handleLogin, loading } = useAuth();

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await handleLogin({ userName, password });
      navigate("/");
    } catch (error) {
      setSubmitError(getRequestError(error, "Unable to log in."));
    }

  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F8FAFC] px-[8%] py-[100px]">
      <div className="w-full max-w-[460px]">
        {/* Form Card */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-10 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)]">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-[32px] font-extrabold tracking-[-0.02em] text-[#111827]">
              Login
            </h2>

            <p className="text-[14px] leading-[1.6] text-[#64748B]">
              Welcome back to HirePulse. Sign in to continue.
            </p>
          </div>

          {submitError && (
            <p
              role="alert"
              className="mb-5 rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-3 text-[13px] text-[#B91C1C]"
            >
              {submitError}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-5">
              <label
                htmlFor="userName"
                className="mb-2 block text-[14px] font-semibold text-[#111827]"
              >
                UserName
              </label>

              <input
                type="text"
                placeholder="userName"
                name="userName"
                id="userName"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-4
                  text-[14px]
                  text-[#111827]
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-[#94A3B8]
                  focus:border-[#059669]
                  focus:ring-2
                  focus:ring-[rgba(5,150,105,0.08)]
                "
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-[14px] font-semibold text-[#111827]"
              >
                Password
              </label>

              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-4
                  text-[14px]
                  text-[#111827]
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-[#94A3B8]
                  focus:border-[#059669]
                  focus:ring-2
                  focus:ring-[rgba(5,150,105,0.08)]
                "
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-[50px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-[12px]
                bg-[#059669]
                px-[26px]
                text-[15px]
                font-semibold
                text-white
                shadow-[0_1px_3px_rgba(0,0,0,0.05)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#047857]
                hover:shadow-[0_10px_20px_-10px_rgba(5,150,105,0.4)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-[14px] text-[#64748B]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
                font-semibold
                text-[#059669]
                transition-colors
                duration-300
                hover:text-[#047857]
              "
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
