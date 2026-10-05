import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useJob } from "../hook/job.hook";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { user, applyForJob } = useJob();
  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const jobId = job.id || job._id;
  const company =
    job.companyId && typeof job.companyId === "object" ? job.companyId : null;
  const companyName = job.company || company?.companyName || "Company";
  const skills = Array.isArray(job.skillsRequired)
    ? job.skillsRequired.slice(0, 4)
    : [];

  async function handleApply() {
    if (!user) {
      navigate("/login");
      return;
    }

    setApplying(true);
    setApplyMessage("");
    try {
      const result = await applyForJob(jobId);
      setApplyMessage(result.message || "Application submitted successfully.");
    } catch (error) {
      setApplyMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to apply for this job."
      );
    } finally {
      setApplying(false);
    }
  }

  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.3)] transition-shadow hover:shadow-[0_14px_32px_-16px_rgba(15,23,42,0.28)]">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-3">
          {company?.logo || job.logo ? (
            <img
              src={job.logo || company.logo}
              alt={`${companyName} logo`}
              className="h-11 w-11 rounded-xl border border-[#E2E8F0] object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#059669]">
              <i className="ri-building-4-line text-[20px]" />
            </div>
          )}

          <div>
            <div className="mb-1 flex items-center gap-3">
              <span className="text-[13px] font-semibold text-[#64748B]">
                {companyName}
              </span>
              {job.jobType && (
                <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-[11px] font-semibold text-[#047857]">
                  {job.jobType}
                </span>
              )}
            </div>
            <Link
              to={`/jobs/${jobId}`}
              className="block text-[18px] font-bold tracking-[-0.02em] text-[#111827] no-underline hover:text-[#059669]"
            >
              {job.title}
            </Link>
            <p className="mt-2 flex items-center gap-2 text-[13px] text-[#64748B]">
              <i className="ri-map-pin-line text-[#059669]" />
              {job.location || "Location not specified"}
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl bg-[#F8FAFC] px-4 py-2.5 text-right">
          <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
            Salary
          </span>
          <span className="text-[14px] font-bold text-[#111827]">
            {job.salary || "Not disclosed"}
          </span>
        </div>
      </div>

      <p className="mt-4 max-w-[900px] text-[13px] leading-5 text-[#64748B]">
        {job.description}
      </p>

      {skills.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-[11px] font-medium text-[#475569]"
            >
              {skill}
            </span>
          ))}
          {job.skillsRequired.length > skills.length && (
            <span className="text-[12px] font-medium text-[#64748B]">
              +{job.skillsRequired.length - skills.length} more
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
        <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
          <i className="ri-group-line text-[15px] text-[#059669]" />
          {Array.isArray(job.applicants) ? job.applicants.length : 0} applicants
          {applyMessage && (
            <span
              role="status"
              className={`ml-3 font-medium ${
                applyMessage.startsWith("Application submitted")
                  ? "text-[#047857]"
                  : "text-[#B91C1C]"
              }`}
            >
              {applyMessage}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/jobs/${jobId}`}
            className="rounded-lg border border-[#D1FAE5] px-3.5 py-2 text-[12px] font-semibold text-[#047857] no-underline hover:bg-[#ECFDF5]"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={handleApply}
            disabled={
              applying || applyMessage.startsWith("Application submitted")
            }
            className="rounded-lg bg-[#059669] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#047857] disabled:opacity-60"
          >
            {applying
              ? "Applying..."
              : applyMessage.startsWith("Application submitted")
              ? "Applied"
              : "Apply Now"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
