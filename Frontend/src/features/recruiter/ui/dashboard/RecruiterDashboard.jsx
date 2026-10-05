import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useJob } from "../../../job/hook/job.hook";
import { useApplication } from "../../hooks/application.hook";

import StatCard from "./StatCard";
import RecentApplications from "./RecentApplications";
import RecruiterJobs from "./RecruiterJobs";
import ApplicationOverview from "./ApplicationOverview";

const RecruiterDashboard = () => {
  const {
    user,
    jobs,
    loading: jobsLoading,
    error: jobError,
    handleJobs,
  } = useJob();

  const {
    loading: applicationsLoading,
    error: applicationError,
    handleApplications,
  } = useApplication();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadApplications = async () => {
      try {
        const allJobs = await handleJobs();

        const recruiterId = String(user._id || user.id || "");

        const myJobs = allJobs.filter(
          (job) => String(job.recruiterId || "") === recruiterId
        );

        const result = [];

        for (const job of myJobs) {
          const data = await handleApplications(job.id || job._id);

          result.push(
            ...(Array.isArray(data) ? data : []).map((application) => ({
              ...application,
              job,
            }))
          );
        }

        setApplications(result);
      } catch {
        setApplications([]);
      }
    };

    loadApplications();
  // Reload dashboard data when the signed-in user changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const recruiterId = String(user?._id || user?.id || "");

  const myJobs = jobs.filter(
    (job) => String(job.recruiterId || "") === recruiterId
  );

  const pendingCount = applications.filter(
    (application) => application.status === "pending"
  ).length;

  const acceptedCount = applications.filter(
    (application) => application.status === "accepted"
  ).length;

  const loading = jobsLoading || applicationsLoading;
  const error = jobError || applicationError;

  if (!user) {
    return (
      <main className="min-h-[70vh] bg-[#F8FAFC] px-[8%] py-16 text-center">
        <p className="mb-4 text-[#64748B]">
          Log in with a recruiter account to manage jobs.
        </p>

        <Link
          to="/login"
          className="rounded-lg bg-[#059669] px-5 py-3 font-semibold text-white"
        >
          Log In
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] px-[8%] py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-[14px] font-medium text-[#64748B]">
            Recruiter Dashboard
          </p>

          <h1 className="text-[30px] font-extrabold tracking-[-0.02em] text-[#111827]">
            Welcome back{user.userName ? `, ${user.userName}` : ""}
          </h1>

          <p className="mt-2 text-[14px] leading-[1.6] text-[#64748B]">
            Manage your jobs and find the right candidates.
          </p>
        </div>

        <Link
          to="/myjobs"
          className="inline-flex h-[48px] items-center justify-center gap-2 rounded-xl bg-[#059669] px-5 text-[14px] font-semibold text-white hover:bg-[#047857]"
        >
          <i className="ri-add-line text-[18px]" />
          Post New Job
        </Link>
      </div>

      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg bg-[#FEF2F2] p-3 text-[14px] text-[#B91C1C]"
        >
          {error}
        </p>
      )}

      {loading ? (
        <p className="rounded-xl border border-[#E2E8F0] bg-white p-10 text-center text-[#64748B]">
          Loading dashboard...
        </p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Jobs"
              value={myJobs.length}
              description="Jobs posted"
              icon="ri-briefcase-4-line"
            />

            <StatCard
              title="Applications"
              value={applications.length}
              description="Across your jobs"
              icon="ri-file-list-3-line"
            />

            <StatCard
              title="Pending Review"
              value={pendingCount}
              description="Need your attention"
              icon="ri-time-line"
            />

            <StatCard
              title="Accepted"
              value={acceptedCount}
              description="Accepted applications"
              icon="ri-user-star-line"
            />
          </div>

          {/* Recent Data */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentApplications applications={applications.slice(0, 5)} />

            <RecruiterJobs jobs={myJobs.slice(0, 5)} />
          </div>

          {/* Application Overview */}
          <ApplicationOverview applications={applications} />
        </>
      )}
    </main>
  );
};

export default RecruiterDashboard;
