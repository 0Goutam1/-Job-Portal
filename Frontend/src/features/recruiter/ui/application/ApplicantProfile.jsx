const ApplicantProfile = ({
  applicant,
  onBack,
  onStatusChange,
}) => {
  if (!applicant) return null;

  const status = applicant.status || "pending";

  const handleStatusChange = (event) => {
    onStatusChange?.(applicant, event.target.value);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] px-[8%] py-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#64748B] transition-colors duration-300 hover:text-[#059669]"
      >
        <i className="ri-arrow-left-line text-[17px]" />
        Back to Applicants
      </button>

      <section className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)]">
        <div className="border-b border-[#E2E8F0] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[rgba(5,150,105,0.1)] text-[22px] font-bold text-[#059669]">
                {applicant.profileImage ? (
                  <img
                    src={applicant.profileImage}
                    alt={applicant.name || "Applicant"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  applicant.name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              <div>
                <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-[#111827]">
                  {applicant.name || "Unknown Applicant"}
                </h1>

                <p className="mt-1 text-[13px] text-[#64748B]">
                  {applicant.email || "Email not provided"}
                </p>

                <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
                  <i className="ri-map-pin-line text-[14px]" />
                  {applicant.location || "Location not provided"}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-medium text-[#94A3B8]">
                Application Status
              </p>

              <select
                value={status}
                onChange={handleStatusChange}
                className="h-[42px] rounded-xl border border-[#E2E8F0] bg-white px-4 text-[13px] font-semibold text-[#111827] outline-none transition-all duration-300 focus:border-[#059669] focus:ring-2 focus:ring-[rgba(5,150,105,0.08)]"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          <div>
            <p className="text-[11px] font-medium text-[#94A3B8]">
              Experience
            </p>
            <p className="mt-2 text-[14px] font-semibold text-[#111827]">
              {applicant.experience || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-[#94A3B8]">
              Location
            </p>
            <p className="mt-2 text-[14px] font-semibold text-[#111827]">
              {applicant.location || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-[#94A3B8]">
              Applied
            </p>
            <p className="mt-2 text-[14px] font-semibold text-[#111827]">
              {applicant.appliedAt || "Recently"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-[#94A3B8]">
              Phone
            </p>
            <p className="mt-2 text-[14px] font-semibold text-[#111827]">
              {applicant.phone || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-[#94A3B8]">
              Education
            </p>
            <p className="mt-2 text-[14px] font-semibold text-[#111827]">
              {applicant.education || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-[#94A3B8]">
              Skills
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {(applicant.skills?.length
                ? applicant.skills
                : ["Not provided"]
              ).map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-medium text-[#475569]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] p-6 sm:p-8">
          <h2 className="text-[16px] font-bold text-[#111827]">
            About Candidate
          </h2>

          <p className="mt-3 max-w-3xl text-[13px] leading-[1.8] text-[#64748B]">
            {applicant.about ||
              "Candidate has not added an introduction yet."}
          </p>
        </div>

        <div className="border-t border-[#E2E8F0] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[16px] font-bold text-[#111827]">
                Resume
              </h2>

              <p className="mt-1 text-[12px] text-[#94A3B8]">
                Candidate's uploaded resume
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                applicant.resume &&
                window.open(
                  applicant.resume,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              disabled={!applicant.resume}
              className="inline-flex h-[42px] w-fit items-center gap-2 rounded-xl bg-[#059669] px-4 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#047857] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
            >
              <i className="ri-file-text-line text-[16px]" />
              {applicant.resume ? "View Resume" : "No Resume"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ApplicantProfile;
