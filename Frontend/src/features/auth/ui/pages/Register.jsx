import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth-hook";
import { getRequestError } from "../../../../redux/requests";

const Register = () => {
  const { handleSendOTP, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const initialRegistration = location.state?.registration;

  const [userName, setUserName] = useState(initialRegistration?.userName || "");
  const [email, setEmail] = useState(initialRegistration?.email || "");
  const [password, setPassword] = useState(initialRegistration?.password || "");
  const [role, setRole] = useState(initialRegistration?.role || "seeker");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await handleSendOTP(email.trim().toLowerCase());
      navigate("/verify-otp", {
        state: {
          registration: {
            userName,
            email: email.trim().toLowerCase(),
            password,
            role,
          },
        },
      });
    } catch (error) {
      setSubmitError(getRequestError(error, "Unable to send OTP."));
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
              Register
            </h2>

            <p className="text-[14px] leading-[1.6] text-[#64748B]">
              Create your HirePulse account and get started.
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
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
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

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-[14px] font-semibold text-[#111827]"
              >
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-2 block text-[14px] font-semibold text-[#111827]"
              >
                Password
              </label>

              <input
                type="password"
                placeholder="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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

            {/* Role */}
            <div className="mb-6">
              <label
                htmlFor="role"
                className="mb-2 block text-[14px] font-semibold text-[#111827]"
              >
                Role
              </label>

              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
                  h-[50px]
                  w-full
                  cursor-pointer
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
                  focus:border-[#059669]
                  focus:ring-2
                  focus:ring-[rgba(5,150,105,0.08)]
                "
              >
                <option value="seeker">Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            {/* Register Button */}
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
              {loading ? "Sending code..." : "Continue to verification"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-[14px] text-[#64748B]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="
                font-semibold
                text-[#059669]
                transition-colors
                duration-300
                hover:text-[#047857]
              "
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
