import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-[8%] pb-10 pt-[60px]">
      {/* Main Footer Content */}
      <div className="flex items-start justify-between gap-10 border-b border-[#E2E8F0] pb-10">
        
        {/* Brand Section */}
        <div className="max-w-[320px]">
          <h3 className="mb-4 text-[22px] font-extrabold tracking-[-0.02em] text-[#111827]">
            HirePulse<span className="text-[#059669]">.</span>
          </h3>

          <p className="text-[14px] leading-[1.6] text-[#64748B]">
            A modern corporate job engine and talent matching ecosystem
            optimized for performance.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex gap-[60px]">
          
          {/* Ecosystem */}
          <div>
            <h4 className="mb-4 text-[15px] font-bold text-[#111827]">
              Ecosystem
            </h4>

            <div className="flex flex-col gap-3 text-[14px] text-[#64748B]">
              <Link
                to="/jobs"
                className="transition-all duration-300 hover:text-[#059669]"
              >
                Explore Jobs
              </Link>

              <Link
                to="/about"
                className="transition-all duration-300 hover:text-[#059669]"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 className="mb-4 text-[15px] font-bold text-[#111827]">
              Account
            </h4>

            <div className="flex flex-col gap-3 text-[14px] text-[#64748B]">
              <Link
                to="/login"
                className="transition-all duration-300 hover:text-[#059669]"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="transition-all duration-300 hover:text-[#059669]"
              >
                Create Account
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Section */}
      <div className="flex items-center justify-between pt-[30px] text-[13px] text-[#64748B]">
        <p>
          &copy; 2026 HirePulse Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
