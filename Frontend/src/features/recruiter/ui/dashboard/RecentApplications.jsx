const RecentApplications = ({ applications = [] }) => {

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
            Recent Applications
          </h2>

          <p className="mt-1 text-[13px] text-[#64748B]">
            Latest candidates who applied.
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

      {/* Applications */}
      <div className="divide-y divide-[#E2E8F0]">
        {applications.map((application) => {
          const applicant = application.seekerId || {};
          const status = application.status || "pending";
          return (
          <div
            key={application._id}
            className="
              flex
              items-center
              justify-between
              gap-4
              py-4
              first:pt-0
              last:pb-0
            "
          >
            {/* Applicant */}
            <div className="flex min-w-0 items-center gap-3">
              {/* Avatar */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[rgba(5,150,105,0.1)]
                  text-[13px]
                  font-bold
                  text-[#059669]
                "
              >
                {(applicant.fullName || applicant.userName || "C").charAt(0).toUpperCase()}
              </div>

              {/* Details */}
              <div className="min-w-0">
                <h3 className="truncate text-[14px] font-semibold text-[#111827]">
                  {applicant.fullName || applicant.userName || "Candidate"}
                </h3>

                <p className="mt-1 truncate text-[12px] text-[#64748B]">
                  {application.job?.title || application.jobId?.title || "Job"}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="shrink-0 text-right">
              <span
                className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  ${
                    status === "accepted"
                      ? "bg-[#ECFDF5] text-[#059669]"
                      : status === "rejected"
                        ? "bg-[#FEF2F2] text-[#EF4444]"
                        : "bg-[#FFFBEB] text-[#D97706]"
                  }
                `}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>

              <p className="mt-2 text-[11px] text-[#94A3B8]">
                {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : ""}
              </p>
            </div>
          </div>
        );})}
        {!applications.length && <p className="py-6 text-center text-[13px] text-[#64748B]">No applications yet.</p>}
      </div>
    </section>
  );
};

export default RecentApplications;
