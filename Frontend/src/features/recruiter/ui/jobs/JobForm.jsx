
const JobForm = ({ job = {}, onSubmit, onCancel, saving = false }) => {
  return (
    <section
      className="
        rounded-xl
        border
        border-[#E2E8F0]
        bg-white
        p-6
        shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)]
        sm:p-8
      "
    >
      {/* Form Header */}
      <div className="mb-8">
        <h2 className="text-[20px] font-bold text-[#111827]">
          Job Information
        </h2>

        <p className="mt-1.5 text-[13px] leading-[1.6] text-[#64748B]">
          Add the details of the position you want to hire for.
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Job Title */}
          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-[14px] font-semibold text-[#111827]"
            >
              Job Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              defaultValue={job.title || ""}
              placeholder="e.g. Frontend Developer"
              required
              className="
                h-[50px]
                w-full
                rounded-[12px]
                border
                border-[#E2E8F0]
                bg-white
                px-4
                text-[14px]
                text-[#111827]
                outline-none
                transition-all
                duration-300
                placeholder:text-[#94A3B8]
                focus:border-[#059669]
                focus:ring-2
                focus:ring-[rgba(5,150,105,0.08)]
              "
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-[14px] font-semibold text-[#111827]"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              defaultValue={job.location || ""}
              placeholder="e.g. Bangalore, India"
              required
              className="
                h-[50px]
                w-full
                rounded-[12px]
                border
                border-[#E2E8F0]
                bg-white
                px-4
                text-[14px]
                text-[#111827]
                outline-none
                transition-all
                duration-300
                placeholder:text-[#94A3B8]
                focus:border-[#059669]
                focus:ring-2
                focus:ring-[rgba(5,150,105,0.08)]
              "
            />
          </div>

          {/* Job Type */}
          <div>
            <label
              htmlFor="jobType"
              className="mb-2 block text-[14px] font-semibold text-[#111827]"
            >
              Job Type
            </label>

            <select
              id="jobType"
              name="jobType"
              defaultValue={job.jobType || ""}
              required
              className="
                h-[50px]
                w-full
                rounded-[12px]
                border
                border-[#E2E8F0]
                bg-white
                px-4
                text-[14px]
                text-[#111827]
                outline-none
                transition-all
                duration-300
                focus:border-[#059669]
                focus:ring-2
                focus:ring-[rgba(5,150,105,0.08)]
              "
            >
              <option value="" disabled>
                Select job type
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label
              htmlFor="salary"
              className="mb-2 block text-[14px] font-semibold text-[#111827]"
            >
              Salary
            </label>

            <input
              id="salary"
              name="salary"
              type="text"
              defaultValue={job.salary || ""}
              placeholder="e.g. ₹8 - ₹12 LPA"
              required
              className="
                h-[50px]
                w-full
                rounded-[12px]
                border
                border-[#E2E8F0]
                bg-white
                px-4
                text-[14px]
                text-[#111827]
                outline-none
                transition-all
                duration-300
                placeholder:text-[#94A3B8]
                focus:border-[#059669]
                focus:ring-2
                focus:ring-[rgba(5,150,105,0.08)]
              "
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="skillsRequired" className="mb-2 block text-[14px] font-semibold text-[#111827]">
              Required Skills
            </label>
            <input
              id="skillsRequired"
              name="skillsRequired"
              type="text"
              defaultValue={(job.skillsRequired || []).join(", ")}
              placeholder="e.g. React, JavaScript, CSS"
              required
              className="h-[50px] w-full rounded-[12px] border border-[#E2E8F0] bg-white px-4 text-[14px] outline-none focus:border-[#059669]"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-[14px] font-semibold text-[#111827]"
            >
              Job Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="7"
              defaultValue={job.description || ""}
              placeholder="Describe the role, responsibilities and requirements..."
              required
              className="
                w-full
                resize-none
                rounded-[12px]
                border
                border-[#E2E8F0]
                bg-white
                px-4
                py-3.5
                text-[14px]
                leading-[1.6]
                text-[#111827]
                outline-none
                transition-all
                duration-300
                placeholder:text-[#94A3B8]
                focus:border-[#059669]
                focus:ring-2
                focus:ring-[rgba(5,150,105,0.08)]
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="
              h-[48px]
              rounded-xl
              border
              border-[#E2E8F0]
              bg-white
              px-5
              text-[14px]
              font-semibold
              text-[#111827]
              transition-all
              duration-300
              hover:border-[#CBD5E1]
              hover:bg-[#F8FAFC]
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              h-[48px]
              rounded-xl
              bg-[#059669]
              px-6
              text-[14px]
              font-semibold
              text-white
              shadow-[0_1px_3px_rgba(0,0,0,0.05)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#047857]
              hover:shadow-[0_10px_20px_-10px_rgba(5,150,105,0.4)]
            "
          >
            {saving ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default JobForm;
