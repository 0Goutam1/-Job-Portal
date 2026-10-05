import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Statistics = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray(".stat-counter");

      counters.forEach((counter) => {
        const targetValue = Number(counter.dataset.target);

        gsap.to(counter, {
          innerText: targetValue,
          duration: 2,
          ease: "power2.out",
          snap: {
            innerText: 1,
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          modifiers: {
            innerText: (value) => {
              return Math.floor(value).toLocaleString();
            },
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        bg-[#059669]
        px-[8%]
        py-[100px]
        text-center
        text-white
      "
    >
      <div
        className="
          grid
          grid-cols-3
          gap-10
        "
      >
        {/* Active Placements */}
        <div>
          <h3
            className="
              mb-2
              text-[48px]
              font-extrabold
              tracking-[-0.02em]
              text-white
            "
          >
            <span
              className="stat-counter"
              data-target="12000"
            >
              0
            </span>
            +
          </h3>

          <p className="text-[15px] font-medium text-[rgba(255,255,255,0.85)]">
            Active Placements
          </p>
        </div>

        {/* Verified Corporations */}
        <div>
          <h3
            className="
              mb-2
              text-[48px]
              font-extrabold
              tracking-[-0.02em]
              text-white
            "
          >
            <span
              className="stat-counter"
              data-target="450"
            >
              0
            </span>
            +
          </h3>

          <p className="text-[15px] font-medium text-[rgba(255,255,255,0.85)]">
            Verified Corporations
          </p>
        </div>

        {/* Average Base Pack */}
        <div>
          <h3
            className="
              mb-2
              text-[48px]
              font-extrabold
              tracking-[-0.02em]
              text-white
            "
          >
            $
            <span
              className="stat-counter"
              data-target="180"
            >
              0
            </span>
            K
          </h3>

          <p className="text-[15px] font-medium text-[rgba(255,255,255,0.85)]">
            Average Base Pack
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
