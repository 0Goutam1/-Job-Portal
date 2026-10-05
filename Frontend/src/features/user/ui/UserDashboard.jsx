import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useUser } from "../hooks/user.hook";

const UserDashboard = () => {
  const {
    user,
    applications,
    fetchApplications,
  } = useUser();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {


    fetchApplications()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load your applications.");
        setLoading(false);
      });
  // Fetch once on mount; hook actions are intentionally not memoized.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileCompletion = user
    ? Math.min(
        100,
        Math.round(
          (
            [
              user.fullName,
              user.bio,
              user.resume,
              user.skills?.length,
            ].filter(Boolean).length / 4
          ) * 100
        )
      )
    : 0;

  const stats = [
    {
      title: "Applications",
      value: applications.length,
      icon: "ri-briefcase-line",
      color: "#059669",
    },
    {
      title: "Accepted",
      value: applications.filter(
        (app) => app.status === "accepted"
      ).length,
      icon: "ri-checkbox-circle-line",
      color: "#3B82F6",
    },
    {
      title: "Profile Completion",
      value: `${profileCompletion}%`,
      icon: "ri-user-settings-line",
      color: "#10B981",
    },
  ];

  return (
    <main className="min-h-[90vh] bg-white px-[8%] py-[60px]">
      <div className="mb-10 flex items-center justify-between gap-5">
        <div>
          <h1 className="mb-1.5 text-[32px] font-extrabold tracking-[-0.5px] text-[#111827]">
            Welcome Back
            {user?.userName ? `, ${user.userName}` : ""}
          </h1>

          <p className="text-[15px] text-[#64748B]">
            Track your applications and keep your profile up to date.
          </p>
        </div>

        <Link
          to="/profile"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#059669] px-5 text-[14px] font-semibold text-white hover:bg-[#047857]"
        >
          <i className="ri-user-settings-line" />
          Manage Profile
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

      <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-[#E2E8F0] bg-white p-6"
          >
            <div className="mb-3 flex items-center justify-between text-[14px] font-semibold text-[#64748B]">
              {stat.title}

              <i
                className={`${stat.icon} text-[20px]`}
                style={{ color: stat.color }}
              />
            </div>

            <h2 className="text-[28px] font-extrabold text-[#111827]">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-[#E2E8F0] bg-white p-8">
        <h2 className="mb-5 border-b border-[#E2E8F0] pb-3 text-[18px] font-extrabold text-[#111827]">
          My Applications
        </h2>

        {loading ? (
          <p className="py-8 text-center text-[14px] text-[#64748B]">
            Loading applications...
          </p>
        ) : applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b-2 border-[#E2E8F0]">
                  <th className="px-2 py-3">Job</th>
                  <th className="px-2 py-3">Company</th>
                  <th className="px-2 py-3">Applied</th>
                  <th className="px-2 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application._id}
                    className="border-b border-[#E2E8F0]"
                  >
                    <td className="px-2 py-4 font-semibold">
                      {application.jobId?.title || "Job"}
                    </td>

                    <td className="px-2 py-4">
                      {application.companyId?.companyName ||
                        "Company"}
                    </td>

                    <td className="px-2 py-4 text-[#64748B]">
                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="px-2 py-4 capitalize">
                      {application.status || "pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-[14px] text-[#64748B]">
              No applications yet.
            </p>

            <Link
              to="/jobs"
              className="mt-2 inline-block text-[14px] font-semibold text-[#059669]"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default UserDashboard;
