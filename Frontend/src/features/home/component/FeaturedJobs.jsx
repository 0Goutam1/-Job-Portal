import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useJob } from "../../job/hook/job.hook";

const DEFAULT_LOGO =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&h=100&q=80";

const FeaturedJobs = () => {
  const { jobs, loading, error, handleJobs } = useJob();
  const navigate = useNavigate();

  useEffect(() => {
    handleJobs();
  // Fetch once on mount; hook actions are intentionally not memoized.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featuredJobs = jobs.slice(0, 6);

  return (
    <section className="px-[8%] py-[100px]">
      <div className="mb-[50px] flex items-end justify-between gap-5">
        <div>
          <h2 className="mb-3 text-[32px] font-bold text-[#111827]">
            Premium Featured Openings
          </h2>

          <p className="text-[16px] text-[#64748B]">
            Handpicked high-performance engineering configurations live today.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-[26px] py-3 text-[15px] font-semibold text-[#111827] hover:bg-[#EDF2F7]"
        >
          Explore Master Directory
          <i className="ri-arrow-right-line ml-2" />
        </button>
      </div>

      {error && (
        <p className="mb-4 text-[14px] text-[#B91C1C]">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-10 text-center text-[#64748B]">
          Loading jobs...
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
          {featuredJobs.map((job) => {
            const jobId = job.id || job._id;
            const company = job.companyId && typeof job.companyId === "object"
              ? job.companyId
              : null;

            return (
              <div
                key={jobId}
                className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-7 hover:-translate-y-1"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <img
                      src={job.logo || company?.logo || DEFAULT_LOGO}
                      alt={job.company || company?.companyName || "Company"}
                      className="h-11 w-11 rounded-lg border border-[#E2E8F0] object-cover"
                    />

                    <span className="rounded-full bg-[rgba(5,150,105,0.08)] px-2.5 py-1 text-[11px] font-semibold text-[#059669]">
                      {job.jobType || "Full Time"}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigate(`/jobs/${jobId}`)}
                    className="mb-1.5 cursor-pointer text-[17px] font-bold text-[#111827] hover:text-[#059669]"
                  >
                    {job.title || "Job Role"}
                  </h3>

                  <p className="mb-4 text-[13px] font-medium text-[#111827]">
                    {job.company || company?.companyName || "Company"}{" "}
                    <span className="text-[#64748B]">
                      • {job.location || "India"}
                    </span>
                  </p>

                  <p className="mb-4 text-[14px] leading-[1.5] text-[#64748B]">
                    {job.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#E2E8F0] pt-[14px]">
                  <span className="text-[15px] font-bold text-[#111827]">
                    {job.salary || "Salary not specified"}
                  </span>

                  <button
                    type="button"
                    onClick={() => navigate(`/jobs/${jobId}`)}
                    className="text-[13px] font-semibold text-[#059669]"
                  >
                    Details
                    <i className="ri-arrow-right-up-line ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedJobs;
