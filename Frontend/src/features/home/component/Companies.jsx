import { useEffect, useRef } from "react";
import { useCompany } from "../../recruiter/hooks/company.hook";
import gsap from "gsap";

const DEFAULT_LOGO =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&h=100&q=80";

const Companies = () => {
  const { companies, loading, error, fetchCompanies } = useCompany();
  const marqueeRef = useRef(null);
  const marqueeAnimationRef = useRef(null);

  useEffect(() => {
    fetchCompanies();
  // Fetch once on mount; hook actions are intentionally not memoized.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!companies.length || !marqueeRef.current) {
      return undefined;
    }

    const animation = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
      paused: true,
    });

    marqueeAnimationRef.current = animation;

    return () => {
      animation.kill();
      marqueeAnimationRef.current = null;
    };
  }, [companies]);

  return (
    <section className="overflow-hidden bg-[#F8FAFC] px-0 py-[60px]">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-[32px] font-extrabold text-[#111827]">
            Top Corporate Partners
          </h2>

          <p className="mx-auto max-w-[500px] text-[16px] text-[#64748B]">
            Direct pipeline execution setups with industry leading tech
            clusters.
          </p>
        </div>

        {error && (
          <p className="mb-4 text-center text-[14px] text-[#B91C1C]">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-10 text-center text-[#64748B]">
            Loading companies...
          </p>
        ) : (
          <div className="overflow-hidden">
            <div
              ref={marqueeRef}
              className="flex w-max"
              onMouseEnter={() => marqueeAnimationRef.current?.resume()}
              onMouseLeave={() => marqueeAnimationRef.current?.pause()}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 gap-6 pr-6"
                >
                  {companies.map((company) => (
                    <div
                      key={`${company._id || company.id}-${copy}`}
                      className="w-[270px] shrink-0 rounded-xl border border-[#E2E8F0] bg-white p-6 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-[#059669] hover:shadow-lg"
                    >
                      <img
                        src={company.logo || DEFAULT_LOGO}
                        alt={company.companyName || "Company"}
                        className="mx-auto mb-3 h-[52px] w-[52px] rounded-lg border border-[#E2E8F0] object-cover"
                      />

                      <h3 className="mb-1 text-[16px] font-bold text-[#111827]">
                        {company.companyName || "Company"}
                      </h3>

                      <p className="text-[12px] font-semibold text-[#059669]">
                        {company.location || "Location not specified"}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Companies;
