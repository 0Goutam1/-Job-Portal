import { useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import gsap from "gsap";
import{useAuth} from "../features/auth/hooks/auth-hook"

const Navbar = () => {
  const { handleLogOut, user } = useAuth();
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  // Check recruiter
  const isRecruiter = user?.role === "recruiter";

  // Navbar GSAP animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navbarRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  // Logout
  const handleLogout = async () => {
    setLogoutError("");
    try {
      await handleLogOut();
      navigate("/");
    } catch (error) {
      setLogoutError(error.response?.data?.message || "Unable to log out. Please try again.");
    }
  };

  return (
    <nav
      ref={navbarRef}
      className="
        sticky top-0 z-[1000]
        flex items-center justify-between
        border-b border-[#E2E8F0]
        bg-white
        px-[8%] py-5
      "
    >
      {/* Logo */}
      <Link
        to="/"
        className="
          text-[24px]
          font-extrabold
          tracking-[-1px]
          text-[#111827]
          no-underline
        "
      >
        HirePulse<span className="text-[#059669]">.</span>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-9">
        {logoutError && <span role="alert" className="text-[12px] text-[#B91C1C]">{logoutError}</span>}
        {user ? (
          <>
            {/* =========================
                RECRUITER NAVIGATION
            ========================== */}
            {isRecruiter ? (
              <>
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className="
                    text-[15px]
                    font-medium
                    text-[#64748B]
                    no-underline
                    transition-all
                    duration-300
                    hover:text-[#059669]
                  "
                >
                  Dashboard
                </Link>

                {/* My Jobs */}
                <Link
                  to="/myjobs"
                  className="
                    text-[15px]
                    font-medium
                    text-[#64748B]
                    no-underline
                    transition-all
                    duration-300
                    hover:text-[#059669]
                  "
                >
                  My Jobs
                </Link>

                {/* Company */}
                <Link
                  to="/company"
                  className="
                    text-[15px]
                    font-medium
                    text-[#64748B]
                    no-underline
                    transition-all
                    duration-300
                    hover:text-[#059669]
                  "
                >
                  Company
                </Link>
              </>
            ) : (
              /* =========================
                 SEEKER NAVIGATION
              ========================== */
              <>
                {/* Find Jobs */}
                <Link
                  to="/jobs"
                  className="
                    text-[15px]
                    font-medium
                    text-[#64748B]
                    no-underline
                    transition-all
                    duration-300
                    hover:text-[#059669]
                  "
                >
                  Find Jobs
                </Link>

                {/* Dashboard */}
                <Link
                  to="/UserDashboard"
                  className="
                    text-[15px]
                    font-medium
                    text-[#64748B]
                    no-underline
                    transition-all
                    duration-300
                    hover:text-[#059669]
                  "
                >
                  Dashboard
                </Link>
              </>
            )}

            {/* Profile */}
            <Link
              to="/profile"
              className="
                flex items-center gap-2
                px-0 py-1
                text-[14px]
                font-semibold
                text-[#111827]
                no-underline
                transition-all
                duration-300
                hover:text-[#059669]
              "
            >
              {/* User Icon */}
              <div
                className="
                  flex h-6 w-6
                  shrink-0
                  items-center justify-center
                  rounded-full
                  border border-[#059669]
                  bg-[rgba(5,150,105,0.1)]
                  text-[#059669]
                "
              >
                <i className="ri-user-3-fill text-[12px]" />
              </div>

              {/* Username */}
              <span>{user.userName}</span>
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                cursor-pointer
                rounded-xl
                border border-[rgba(239,68,68,0.2)]
                bg-transparent
                px-[18px] py-[10px]
                text-[15px]
                font-semibold
                text-[#EF4444]
                transition-all
                duration-300
                hover:bg-[#FEF2F2]
              "
            >
              Log Out
            </button>
          </>
        ) : (
          /* =========================
             LOGGED OUT NAVIGATION
          ========================== */
          <>
            {/* Find Jobs */}
            <Link
              to="/jobs"
              className="
                text-[15px]
                font-medium
                text-[#64748B]
                no-underline
                transition-all
                duration-300
                hover:text-[#059669]
              "
            >
              Find Jobs
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="
                rounded-xl
                border border-transparent
                bg-transparent
                px-[18px] py-[10px]
                text-[15px]
                font-semibold
                text-[#111827]
                no-underline
                transition-all
                duration-300
                hover:bg-[#F8FAFC]
              "
            >
              Log In
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#059669]
                px-5 py-[10px]
                text-[15px]
                font-semibold
                text-white
                no-underline
                shadow-[0_1px_3px_rgba(0,0,0,0.05)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#047857]
                hover:shadow-[0_10px_20px_-10px_rgba(5,150,105,0.4)]
              "
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
