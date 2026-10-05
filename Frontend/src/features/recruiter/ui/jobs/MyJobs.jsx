import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useJob } from "../../../job/hook/job.hook";
import { useApplication } from "../../hooks/application.hook";
import {useAuth} from "../../../auth/hooks/auth-hook"
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import ApplicantsList from "../application/ApplicantsList";
import ApplicantProfile from "../application/ApplicantProfile";

const formatApplicant = (application) => {
  const seeker = application.seekerId || {};

  return {
    id: application._id,
    applicationId: application._id,
    name: seeker.fullName || seeker.userName || "Candidate",
    email: seeker.email || "",
    experience: seeker.experienceStatus || "Not specified",
    location: seeker.location || "Not provided",
    status: application.status || "pending",
    appliedAt: application.createdAt
      ? new Date(application.createdAt).toLocaleDateString()
      : "Recently",
    skills: seeker.skills || [],
    about: seeker.bio || "",
    resume: seeker.resume || "",
    profileImage: seeker.profileImage || "",
    phone: seeker.phone || "",
    education: seeker.education || "",
  };
};

const MyJobs = () => {
  const { user, loading } = useAuth();

  const {
    jobs,
    loading: jobsLoading,
    error: jobError,
    handleJobs,
    handlePostJob,
  } = useJob();

  const {
    applications,
    loading: applicationsLoading,
    error: applicationError,
    handleApplications,
    handleStatus,
  } = useApplication();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    if (user) {
      handleJobs();
    }
  // Refetch when the signed-in user changes; hook actions are not memoized.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[#F8FAFC] px-[8%] py-16">
        <p className="rounded-xl border border-[#E2E8F0] bg-white p-10 text-center text-[#64748B]">
          Loading...
        </p>
      </main>
    );
  }

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

  const recruiterId = String(user._id || user.id || "");

  const myJobs = jobs.filter(
    (job) => String(job.recruiterId || "") === recruiterId
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setSaving(true);

    try {
      await handlePostJob({
        title: formData.get("title"),
        description: formData.get("description"),
        skillsRequired: formData
          .get("skillsRequired")
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        location: formData.get("location"),
        salary: formData.get("salary"),
        jobType: formData.get("jobType"),
      });

      await handleJobs();
      setIsFormOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleViewApplicants = async (job) => {
    await handleApplications(job.id || job._id);
    setSelectedJob(job);
  };

  const handleStatusChange = async (applicant, status) => {
    await handleStatus(
      applicant.applicationId,
      status.toLowerCase()
    );

    setSelectedApplicant((current) =>
      current?.applicationId === applicant.applicationId
        ? { ...current, status: status.toLowerCase() }
        : current
    );
  };

  if (selectedApplicant) {
    return (
      <ApplicantProfile
        applicant={selectedApplicant}
        onBack={() => setSelectedApplicant(null)}
        onStatusChange={handleStatusChange}
      />
    );
  }

  if (selectedJob) {
    return applicationsLoading ? (
      <main className="min-h-[70vh] bg-[#F8FAFC] px-[8%] py-10">
        <p className="rounded-xl border border-[#E2E8F0] bg-white p-10 text-center text-[#64748B]">
          Loading applicants...
        </p>
      </main>
    ) : (
      <ApplicantsList
        job={selectedJob}
        applicants={applications.map(formatApplicant)}
        onBack={() => setSelectedJob(null)}
        onViewProfile={setSelectedApplicant}
        onStatusChange={handleStatusChange}
      />
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] px-[8%] py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-[14px] font-medium text-[#64748B]">
            Recruitment
          </p>

          <h1 className="text-[30px] font-extrabold text-[#111827]">
            {isFormOpen ? "Post New Job" : "My Jobs"}
          </h1>

          <p className="mt-2 text-[14px] text-[#64748B]">
            {isFormOpen
              ? "Add the details of your job opening."
              : "Manage your posted jobs and view applications."}
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex h-[48px] items-center gap-2 rounded-xl bg-[#059669] px-5 text-[14px] font-semibold text-white hover:bg-[#047857]"
          >
            <i className="ri-add-line text-[18px]" />
            Post New Job
          </button>
        )}
      </div>

      {(jobError || applicationError) && (
        <p className="mb-5 rounded-lg bg-[#FEF2F2] p-3 text-[14px] text-[#B91C1C]">
          {jobError || applicationError}
        </p>
      )}

      {isFormOpen ? (
        <JobForm
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          saving={saving}
        />
      ) : jobsLoading ? (
        <p className="rounded-xl border border-[#E2E8F0] bg-white p-10 text-center text-[#64748B]">
          Loading your jobs...
        </p>
      ) : myJobs.length > 0 ? (
        <div className="space-y-4">
          {myJobs.map((job) => (
            <JobCard
              key={job.id || job._id}
              job={job}
              onViewApplicants={handleViewApplicants}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E2E8F0] bg-white px-6 py-16 text-center">
          <i className="ri-briefcase-line mb-3 inline-block text-[40px] text-[#059669]" />

          <h2 className="text-[17px] font-bold text-[#111827]">
            No jobs posted yet
          </h2>

          <p className="mt-2 text-[13px] text-[#64748B]">
            Create your first job opening to start receiving applications.
          </p>

          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="mt-5 rounded-xl bg-[#059669] px-4 py-3 text-[13px] font-semibold text-white hover:bg-[#047857]"
          >
            Post New Job
          </button>
        </div>
      )}
    </main>
  );
};

export default MyJobs;
