import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PremiumLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);

  const [shouldShow, setShouldShow] = useState(() => {
    return !sessionStorage.getItem("visitedBefore");
  });

  useEffect(() => {
    if (!shouldShow) {
      onComplete?.();
      return;
    }

    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;

      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }

      if (progress >= 100) {
        clearInterval(interval);

        sessionStorage.setItem("visitedBefore", "true");

        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            setShouldShow(false);
            onComplete?.();
          },
        });
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [shouldShow, onComplete]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="
        fixed
        left-0
        top-0
        z-[99999]
        flex
        h-screen
        w-full
        flex-col
        items-center
        justify-center
        bg-[#059669]
      "
    >
      <div
        className="
          mb-6
          text-[38px]
          font-extrabold
          tracking-[-1.5px]
          text-white
        "
      >
        HirePulse
        <span className="text-[rgba(255,255,255,0.4)]">.</span>
      </div>

      <div
        className="
          h-[3px]
          w-[240px]
          overflow-hidden
          rounded-full
          bg-[rgba(255,255,255,0.15)]
        "
      >
        <div
          ref={progressRef}
          className="
            h-full
            w-0
            rounded-full
            bg-white
          "
        />
      </div>
    </div>
  );
};

export default PremiumLoader;
