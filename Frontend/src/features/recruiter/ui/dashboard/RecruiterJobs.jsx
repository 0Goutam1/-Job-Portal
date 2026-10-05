
const RecruiterJobs = ({ jobs = [] }) => {

  return (
    <section
      className="
        rounded-xl
        border
        border-[#E2E8F0]
        bg-white
        p-6
        shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)]
      "
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-[#111827]">
            Your Jobs
          </h2>

          <p className="mt-1 text-[13px] text-[#64748B]">
            Recently posted jobs.
          </p>
        </div>

        <a
          href="/myjobs"
          className="
            text-[13px]
            font-semibold
            text-[#059669]
            transition-colors
            duration-300
            hover:text-[#047857]
          "
        >
          View All
        </a>
      </div>

      {/* Jobs */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="
              rounded-xl
              border
              border-[#E2E8F0]
              p-4
              transition-all
              duration-300
              hover:border-[#CBD5E1]
              hover:shadow-[0_5px_15px_rgba(0,0,0,0.04)]
            "
          >
            {/* Job Top */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-[14px] font-semibold text-[#111827]">
                  {job.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <i className="ri-map-pin-line text-[14px]" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <i className="ri-time-line text-[14px]" />
                    {job.jobType}
                  </span>
                </div>
              </div>

              {/* Status */}
              <span
                className={`
                  shrink-0
                  rounded-full
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  ${
                    (job.status || "Active") === "Active"
                      ? "bg-[#ECFDF5] text-[#059669]"
                      : "bg-[#F1F5F9] text-[#64748B]"
                  }
                `}
              >
                {job.status || "Active"}
              </span>
            </div>

            {/* Job Bottom */}
            <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-3">
              <div className="flex items-center gap-1 text-[12px] text-[#64748B]">
                <i className="ri-user-line text-[14px]" />
                <span>
                  {job.applicants} Applicants
                </span>
              </div>

              <span className="text-[11px] text-[#94A3B8]">
                {job.posted}
              </span>
            </div>
          </div>
        ))}
        {!jobs.length && <p className="py-6 text-center text-[13px] text-[#64748B]">No jobs posted yet.</p>}
      </div>
    </section>
  );
};

export default RecruiterJobs;
