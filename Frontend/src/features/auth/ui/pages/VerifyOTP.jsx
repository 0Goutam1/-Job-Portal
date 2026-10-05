import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth-hook";
import { getRequestError } from "../../../../redux/requests";

const VerifyOTP = () => {
  const { handleRegister, handleSendOTP, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const registration = location.state?.registration;

  const [otp, setOtp] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  if (!registration?.userName || !registration?.email || !registration?.password) {
    return <Navigate to="/register" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await handleRegister({ ...registration, otp });
      navigate("/");
    } catch (error) {
      setSubmitError(getRequestError(error, "Unable to verify your email."));
    }
  };

  const handleResendOTP = async () => {
    setSubmitError("");
    setStatusMessage("");

    try {
      const response = await handleSendOTP(registration.email);
      setOtp("");
      setStatusMessage(response.message || "A new verification code was sent.");
    } catch (error) {
      setSubmitError(getRequestError(error, "Unable to resend OTP."));
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F8FAFC] px-[8%] py-[100px]">
      <div className="w-full max-w-[460px]">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-10 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)]">
          <div className="mb-8 text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF5] text-2xl text-[#059669]"
            >
              @
            </div>
            <h2 className="mb-3 text-[32px] font-extrabold tracking-[-0.02em] text-[#111827]">
              Check your email
            </h2>
            <p className="text-[14px] leading-[1.6] text-[#64748B]">
              We sent a 6-digit verification code to
            </p>
            <p className="mt-1 break-all text-[14px] font-semibold text-[#111827]">
              {registration.email}
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

          {statusMessage && (
            <p role="status" className="mb-5 rounded-lg border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-[13px] text-[#047857]">
              {statusMessage}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="mb-2 block text-[14px] font-semibold text-[#111827]"
              >
                Verification code
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Enter 6-digit code"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                pattern="[0-9]{6}"
                title="Enter the 6-digit code sent to your email."
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-4
                  text-center
                  text-[18px]
                  tracking-[0.5em]
                  text-[#111827]
                  outline-none
                  transition-all
                  duration-300
                  placeholder:tracking-normal
                  placeholder:text-[#94A3B8]
                  focus:border-[#059669]
                  focus:ring-2
                  focus:ring-[rgba(5,150,105,0.08)]
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="
                flex
                h-[50px]
                w-full
                items-center
                justify-center
                rounded-[12px]
                bg-[#059669]
                px-[26px]
                text-[15px]
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#047857]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <div className="mt-6 text-center text-[14px] text-[#64748B]">
            <p>Didn&apos;t receive the code?</p>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="mt-2 font-semibold text-[#059669] transition-colors hover:text-[#047857] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Resend code"}
            </button>
          </div>

          <p className="mt-5 text-center text-[14px] text-[#64748B]">
            <Link
              to="/register"
              state={{ registration }}
              className="font-semibold text-[#059669] transition-colors hover:text-[#047857]"
            >
              Back to registration
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default VerifyOTP;
