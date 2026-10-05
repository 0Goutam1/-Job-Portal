import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-item", {
        y: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.14,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (title.trim()) {
      params.set("search", title.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section ref={heroRef} className="flex min-h-[80vh] flex-col items-center justify-center bg-white px-[8%] py-[100px] text-center">
      <div className="hero-item mb-6 rounded-full bg-[rgba(5,150,105,0.08)] px-[18px] py-2 text-[14px] font-semibold text-[#059669]">
         The Premium Corporate Recruitment Ecosystem
      </div>

      <h1 className="mb-6 max-w-[800px] text-[56px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111827]">
        <span className="hero-item block">Discover your ultimate <span className="text-[#059669]">career</span></span>
        <span className="hero-item block"><span className="text-[#059669]">evolution</span> trajectory.</span>
      </h1>

      <p className="hero-item mb-10 max-w-[600px] text-[18px] leading-[1.6] text-[#64748B]">
        Find tailored global roles across elite engineering divisions.
        Built on ultra-clean architectures with high-performance metrics.
      </p>

      <div className="hero-item flex w-full max-w-[750px] items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-[10px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-1 items-center gap-2 pl-3">
          <i className="ri-search-line text-[20px] text-[#059669]" />

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Job titles, tech stacks, or core skills..."
            className="w-full border-none bg-transparent text-[15px] text-[#111827] outline-none placeholder:text-[#64748B]"
          />
        </div>

        <div className="flex min-w-[180px] items-center gap-2 border-l border-[#E2E8F0] px-4">
          <i className="ri-map-pin-line text-[20px] text-[#64748B]" />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Location or Remote"
            className="w-full border-none bg-transparent text-[15px] text-[#111827] outline-none placeholder:text-[#64748B]"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="inline-flex h-[50px] items-center justify-center rounded-xl bg-[#059669] px-7 text-[15px] font-semibold text-white transition-all duration-[400ms] hover:-translate-y-0.5 hover:bg-[#047857]"
        >
          Search Roles
        </button>
      </div>
    </section>
  );
};

export default Hero;
