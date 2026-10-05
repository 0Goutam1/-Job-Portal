import ApplicantCard from "./ApplicantCard";

const ApplicantsList = ({
  job,
  applicants = [],
  onBack,
  onViewProfile,
  onStatusChange,
}) => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] px-[8%] py-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#64748B] transition-colors duration-300 hover:text-[#059669]"
      >
        <i className="ri-arrow-left-line text-[17px]" />
        Back to My Jobs
      </button>

      <div className="mb-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <p className="mb-2 text-[14px] font-medium text-[#64748B]">
              Applications
            </p>

            <h1 className="text-[30px] font-extrabold tracking-[-0.02em] text-[#111827]">
              {job?.title || "Job Applicants"}
            </h1>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <i className="ri-map-pin-line text-[15px]" />
                {job?.location || "Location not specified"}
              </span>

              <span className="flex items-center gap-1.5">
                <i className="ri-group-line text-[15px]" />
                {applicants.length} Applicants
              </span>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-semibold ${
              job?.status === "Active"
                ? "bg-[#ECFDF5] text-[#059669]"
                : "bg-[#F1F5F9] text-[#64748B]"
            }`}
          >
            {job?.status || "Active"}
          </span>
        </div>
      </div>

      {applicants.length > 0 ? (
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <ApplicantCard
              key={applicant.applicationId || applicant.id}
              applicant={applicant}
              onViewProfile={onViewProfile}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <section className="rounded-xl border border-[#E2E8F0] bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(5,150,105,0.1)] text-[#059669]">
            <i className="ri-group-line text-[24px]" />
          </div>

          <h2 className="mt-4 text-[17px] font-bold text-[#111827]">
            No applicants yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-[13px] leading-[1.6] text-[#64748B]">
            Candidates who apply for this job will appear here.
          </p>
        </section>
      )}
    </main>
  );
};

export default ApplicantsList;
