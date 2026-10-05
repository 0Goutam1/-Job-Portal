const ApplicantCard = ({
  applicant,
  onViewProfile,
  onStatusChange,
}) => {
  const status = applicant.status || "pending";

  const getStatusStyle = (value) => {
    if (value === "accepted") {
      return "bg-[#ECFDF5] text-[#059669]";
    }

    if (value === "rejected") {
      return "bg-[#FEF2F2] text-[#EF4444]";
    }

    return "bg-[#FFFBEB] text-[#D97706]";
  };

  const handleStatusChange = (event) => {
    onStatusChange?.(applicant, event.target.value);
  };

  return (
    <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:border-[#CBD5E1] hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[rgba(5,150,105,0.1)] text-[16px] font-bold text-[#059669]">
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

          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-bold text-[#111827]">
              {applicant.name || "Unknown Applicant"}
            </h3>

            <p className="mt-1 truncate text-[13px] text-[#64748B]">
              {applicant.email || "Email not provided"}
            </p>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#94A3B8]">
              <span className="flex items-center gap-1">
                <i className="ri-briefcase-line text-[13px]" />
                {applicant.experience || "Experience not specified"}
              </span>

              <span className="flex items-center gap-1">
                <i className="ri-map-pin-line text-[13px]" />
                {applicant.location || "Location not provided"}
              </span>
            </div>
          </div>
        </div>

        <span
          className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${getStatusStyle(
            status
          )}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-[#E2E8F0] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[12px] text-[#94A3B8]">
          Applied {applicant.appliedAt || "Recently"}
        </span>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onViewProfile?.(applicant)}
            className="inline-flex h-[38px] items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 text-[12px] font-semibold text-[#111827] transition-all duration-300 hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
          >
            <i className="ri-user-line text-[14px]" />
            View Profile
          </button>

          <select
            value={status}
            onChange={handleStatusChange}
            className="h-[38px] cursor-pointer rounded-lg border border-[#E2E8F0] bg-white px-3 text-[12px] font-semibold text-[#111827] outline-none transition-all duration-300 focus:border-[#059669] focus:ring-2 focus:ring-[rgba(5,150,105,0.08)]"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </article>
  );
};

export default ApplicantCard;
