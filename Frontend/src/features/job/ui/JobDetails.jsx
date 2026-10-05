import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useJob } from "../hook/job.hook";
import { useUser } from "../../user/hooks/user.hook";

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const { user } = useUser();
  const { fetchJobs, applyForJob, loading, error } = useJob();

  const [job, setJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchJobs()
      .then((data) => {
        const foundJob = data.find(
          (item) => String(item.id || item._id) === jobId
        );
        setJob(foundJob || null);
      })
      .catch(() => {});
  // Refetch only when the selected job changes; hook actions are not memoized.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setApplying(true);
    setNotice("");

    applyForJob(job.id || job._id)
      .then((result) => {
        setNotice(result.message || "Application submitted successfully.");
      })
      .catch(() => {})
      .finally(() => {
        setApplying(false);
      });
  };

  if (loading) {
    return (
      <main className="min-h-[90vh] bg-[#F8FAFC] px-[8%] py-[60px] text-center">
        Loading job...
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-[90vh] bg-[#F8FAFC] px-[8%] py-[60px]">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-[60px] text-center">
          <i className="ri-error-warning-line text-[44px] text-[#EF4444]" />

          <h3 className="my-2 text-[18px] font-bold text-[#111827]">
            Job Not Found
          </h3>

          <p className="mb-4 text-[14px] text-[#64748B]">
            The requested job could not be found.
          </p>

          <Link
            to="/jobs"
            className="rounded-lg bg-[#059669] px-6 py-3 text-[14px] font-semibold text-white"
          >
            Back to Jobs
          </Link>
        </div>
      </main>
    );
  }

  const skills = Array.isArray(job.skillsRequired)
    ? job.skillsRequired
    : [];

  return (
    <main className="min-h-[90vh] bg-[#F8FAFC] px-[8%] py-[60px]">
      <Link
        to="/jobs"
        className="mb-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#059669]"
      >
        <i className="ri-arrow-left-line" />
        Back to Jobs Directory
      </Link>

      <div className="grid grid-cols-[1fr_360px] gap-8">
        <div className="flex flex-col gap-6">

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-10 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)]">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-5">
                <img
                  src={
                    job.logo ||
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&h=100&q=80"
                  }
                  alt={job.company}
                  className="h-16 w-16 rounded-xl border border-[#E2E8F0] object-cover"
                />

                <div>
                  <h1 className="mb-1 text-[28px] font-extrabold text-[#111827]">
                    {job.title}
                  </h1>

                  <p className="text-[15px] font-semibold text-[#111827]">
                    {job.company}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[rgba(5,150,105,0.08)] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
                {job.jobType}
              </span>
            </div>

            <div className="flex gap-6 border-t border-[#E2E8F0] pt-6 text-[14px] font-medium">
              <span>
                <i className="ri-map-pin-line mr-2 text-[#059669]" />
                {job.location}
              </span>

              <span>
                <i className="ri-money-dollar-circle-line mr-2 text-[#059669]" />
                {job.salary}
              </span>

              <span>
                <i className="ri-time-line mr-2 text-[#059669]" />
                Live Posting
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-10 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)]">
            <h2 className="mb-4 border-b border-[#E2E8F0] pb-3 text-[20px] font-bold">
              Job Description
            </h2>

            <p className="mb-8 text-[15px] leading-[1.7] text-[#64748B]">
              {job.description}
            </p>

            <h2 className="mb-4 text-[20px] font-bold">
              Requirements
            </h2>

            <ul className="flex flex-col gap-3 text-[15px] text-[#64748B]">
              <li>
                <i className="ri-checkbox-circle-fill mr-2 text-[#059669]" />
                Required skills:{" "}
                {skills.length
                  ? skills.join(", ")
                  : "As described in the posting"}
                .
              </li>

              <li>
                <i className="ri-checkbox-circle-fill mr-2 text-[#059669]" />
                Location: {job.location}
              </li>
            </ul>
          </div>
        </div>

        <aside className="sticky top-[100px] flex flex-col gap-6">

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-8 text-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)]">
            <h3 className="mb-2 text-[18px] font-bold">
              Apply for this Job
            </h3>

            <p className="mb-6 text-[13px] leading-[1.4] text-[#64748B]">
              Submit your application for this position.
            </p>

            {error && (
              <p className="mb-3 text-[13px] text-[#EF4444]">
                {error}
              </p>
            )}

            {notice && (
              <p className="mb-3 text-[13px] text-[#059669]">
                {notice}
              </p>
            )}

            <button
              onClick={handleApply}
              disabled={applying || Boolean(notice)}
              className="h-12 w-full rounded-lg bg-[#059669] text-[15px] font-semibold text-white hover:bg-[#047857] disabled:opacity-60"
            >
              {applying
                ? "Submitting..."
                : notice
                ? "Applied"
                : "Apply Now"}

              {" "}
              <i className="ri-send-plane-fill" />
            </button>

            <button
              onClick={() => setSaved(!saved)}
              className="mt-3 h-12 w-full rounded-lg border border-[#E2E8F0] bg-white text-[15px] font-semibold"
            >
              <i
                className={
                  saved
                    ? "ri-bookmark-fill"
                    : "ri-bookmark-line"
                }
              />

              {" "}

              {saved ? "Saved" : "Save Job"}
            </button>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-8">
            <h3 className="mb-4 text-[16px] font-bold">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {skills.length ? (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-[13px] font-semibold"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-[13px] text-[#64748B]">
                  Skills not specified
                </span>
              )}
            </div>
          </div>

        </aside>
      </div>
    </main>
  );
};

export default JobDetails;
