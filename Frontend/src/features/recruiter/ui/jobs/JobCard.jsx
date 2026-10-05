
const JobCard = ({ job, onViewApplicants }) => {
  return (
    <article
      className="
        rounded-xl
        border
        border-[#E2E8F0]
        bg-white
        p-6
        shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_15px_25px_-10px_rgba(0,0,0,0.08)]
      "
    >
      {/* Top Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        {/* Job Information */}
        <div className="flex min-w-0 gap-4">
          {/* Job Icon */}
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[rgba(5,150,105,0.1)]
              text-[#059669]
            "
          >
            <i className="ri-briefcase-4-line text-[22px]" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-[17px] font-bold text-[#111827]">
              {job.title}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#64748B]">
              {/* Location */}
              <span className="flex items-center gap-1.5">
                <i className="ri-map-pin-line text-[15px]" />
                {job.location}
              </span>

              {/* Job Type */}
              <span className="flex items-center gap-1.5">
                <i className="ri-time-line text-[15px]" />
                {job.type}
              </span>

              {/* Work Mode */}
            </div>
          </div>
        </div>

        {/* Status */}
        <span
          className={`
            inline-flex
            w-fit
            shrink-0
            rounded-full
            px-3
            py-1
            text-[11px]
            font-semibold
            ${
              job.status === "Active"
                ? "bg-[#ECFDF5] text-[#059669]"
                : "bg-[#F1F5F9] text-[#64748B]"
            }
          `}
        >
          {job.status}
        </span>
      </div>

      {/* Job Meta */}
      <div className="mt-6 grid grid-cols-1 gap-4 border-y border-[#E2E8F0] py-4 sm:grid-cols-3">
        {/* Salary */}
        <div>
          <p className="text-[11px] font-medium text-[#94A3B8]">
            Salary
          </p>

          <p className="mt-1 text-[13px] font-semibold text-[#111827]">
            {job.salary}
          </p>
        </div>

        {/* Applicants */}
        <div>
          <p className="text-[11px] font-medium text-[#94A3B8]">
            Applications
          </p>

          <p className="mt-1 text-[13px] font-semibold text-[#059669]">
            {job.applicants} Applicants
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {/* Posted Date */}
        <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
          <i className="ri-calendar-line text-[14px]" />
          Posted {job.posted}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {/* View Applicants */}
          <button
            type="button"
            onClick={() => onViewApplicants?.(job)}
            className="
              inline-flex
              h-[42px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#059669]
              px-4
              text-[13px]
              font-semibold
              text-white
              shadow-[0_1px_3px_rgba(0,0,0,0.05)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#047857]
              hover:shadow-[0_10px_20px_-10px_rgba(5,150,105,0.4)]
            "
          >
            <i className="ri-group-line text-[16px]" />
            View Applicants
          </button>

        </div>
      </div>
    </article>
  );
};

export default JobCard;
