import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useUser } from "../hooks/user.hook";

const Profile = () => {
  const { user, handleProfile } = useUser();

  const [profileFile, setProfileFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const previewUrl = useRef("");

  useEffect(() => {
    return () => {
      if (previewUrl.current) {
        URL.revokeObjectURL(previewUrl.current);
      }
    };
  }, []);

  const handleProfileFileChange = (event) => {
    const file = event.target.files?.[0] || null;

    if (previewUrl.current) {
      URL.revokeObjectURL(previewUrl.current);
    }

    previewUrl.current = file ? URL.createObjectURL(file) : "";

    setProfileFile(file);
    setProfilePreview(previewUrl.current);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setNotice("");

    const form = new FormData(event.currentTarget);

    const profileData = {
      fullName: form.get("fullName"),
      bio: form.get("bio"),
      skills: form.get("skills"),
      experienceStatus: form.get("experienceStatus"),
      profileImage: profileFile,
      resume: resumeFile,
    };

    await handleProfile(profileData);

    setProfileFile(null);
    setResumeFile(null);

    if (previewUrl.current) {
      URL.revokeObjectURL(previewUrl.current);
    }

    previewUrl.current = "";
    setProfilePreview("");
    setNotice("Profile updated successfully.");
    setSaving(false);
  };

  return (
    <main className="min-h-[90vh] bg-[#F8FAFC] px-[8%] py-[60px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 md:grid-cols-[320px_1fr]">

        <aside className="rounded-xl border border-[#E2E8F0] bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

          <div className="relative mx-auto mb-5 h-[120px] w-[120px]">

            {profileFile ? (
              <img
                src={profilePreview}
                alt="Profile"
                className="h-full w-full rounded-full border-[3px] border-[#E2E8F0] object-cover"
              />
            ) : user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="h-full w-full rounded-full border-[3px] border-[#E2E8F0] object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full border-[3px] border-[#E2E8F0] bg-[rgba(5,150,105,0.1)] text-[40px] font-bold text-[#059669]">
                {(user?.userName || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#059669] text-white shadow-sm"
            >
              <i className="ri-camera-switch-line text-[16px]" />
            </label>

            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleProfileFileChange}
              className="hidden"
            />
          </div>

          <h3 className="mb-1 text-[18px] font-extrabold text-[#111827]">
            {user?.fullName || user?.userName || "Your Profile"}
          </h3>

          <p className="mb-6 text-[13px] text-[#64748B]">
            {user?.role || "seeker"}
          </p>

          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left text-[13px] leading-[1.5]">

            <p className="mb-1 font-semibold text-[#111827]">
              Resume
            </p>

            {user?.resume ? (
              <a
                href={user.resume}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-[#059669]"
              >
                {resumeFile?.name || "View uploaded resume"}
              </a>
            ) : (
              <span className="block truncate text-[#64748B]">
                {resumeFile?.name || "No resume uploaded"}
              </span>
            )}

            <span className="mt-2 block truncate text-[#64748B]">
              <i className="ri-mail-line" /> {user?.email || ""}
            </span>

          </div>
        </aside>

        <section className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10">

          <h2 className="mb-6 border-b border-[#E2E8F0] pb-3 text-[22px] font-extrabold text-[#111827]">
            Profile Details
          </h2>

          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-[#FEF2F2] p-3 text-[14px] text-[#B91C1C]"
            >
              {error}
            </p>
          )}

          {notice && (
            <p
              role="status"
              className="mb-4 rounded-lg bg-[#ECFDF5] p-3 text-[14px] text-[#047857]"
            >
              {notice}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >

            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-[13px] font-semibold text-[#111827]"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                defaultValue={user?.fullName || ""}
                className="h-[46px] w-full rounded-lg border border-[#E2E8F0] px-3 text-[14px] outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label
                htmlFor="experienceStatus"
                className="mb-1.5 block text-[13px] font-semibold text-[#111827]"
              >
                Experience
              </label>

              <select
                id="experienceStatus"
                name="experienceStatus"
                defaultValue={user?.experienceStatus || ""}
                className="h-[46px] w-full rounded-lg border border-[#E2E8F0] px-3 text-[14px] outline-none focus:border-[#059669]"
              >
                <option value="">Choose experience status</option>
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-1.5 block text-[13px] font-semibold text-[#111827]"
              >
                About
              </label>

              <textarea
                id="bio"
                name="bio"
                rows="4"
                defaultValue={user?.bio || ""}
                className="w-full resize-y rounded-lg border border-[#E2E8F0] px-3 py-3 text-[14px] outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label
                htmlFor="skills"
                className="mb-1.5 block text-[13px] font-semibold text-[#111827]"
              >
                Skills (comma separated)
              </label>

              <input
                id="skills"
                name="skills"
                defaultValue={(user?.skills || []).join(", ")}
                placeholder="e.g. React, Node.js, MongoDB"
                className="h-[46px] w-full rounded-lg border border-[#E2E8F0] px-3 text-[14px] outline-none focus:border-[#059669]"
              />
            </div>

            <div>
              <label
                htmlFor="resume"
                className="mb-1.5 block text-[13px] font-semibold text-[#111827]"
              >
                Resume (PDF / DOCX)
              </label>

              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) =>
                  setResumeFile(event.target.files?.[0] || null)
                }
                className="block w-full rounded-lg border border-[#E2E8F0] p-3 text-[14px]"
              />
            </div>

            <div className="mt-3 flex justify-end gap-4">

              <Link
                to="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-5 text-[14px] font-semibold text-[#111827]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#059669] px-5 text-[14px] font-semibold text-white hover:bg-[#047857] disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Profile"}
                <i className="ri-save-3-line" />
              </button>

            </div>

          </form>
        </section>
      </div>
    </main>
  );
};

export default Profile;
