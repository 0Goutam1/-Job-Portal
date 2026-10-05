import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useJob } from "../hook/job.hook";

const Jobs = () => {
  const { fetchJobs, loading, error } = useJob();

  const [jobList, setJobList] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("ALL");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchJobs().then((data) => {
      setJobList(Array.isArray(data) ? data : []);
    });
  // Fetch once on mount; hook actions are intentionally not memoized.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleType = (type) => {
    if (types.includes(type)) {
      setTypes(types.filter((item) => item !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  const filteredJobs = jobList.filter((job) => {
    const keyword = search.toLowerCase();

    const searchableText = [
      job.title,
      job.company,
      job.description,
    ]
      .join(" ")
      .toLowerCase();

    const matchSearch =
      !keyword || searchableText.includes(keyword);

    const matchLocation =
      location === "ALL" ||
      (job.location || "")
        .toLowerCase()
        .includes(location.toLowerCase());

    const matchType =
      types.length === 0 || types.includes(job.jobType);

    return matchSearch && matchLocation && matchType;
  });

  return (
    <main className="min-h-[90vh] bg-[#F8FAFC] px-[8%] py-[60px]">
      <div className="mb-10">
        <h1 className="mb-2 text-[36px] font-extrabold text-[#111827]">
          Explore Live Positions
        </h1>

        <p className="text-[16px] text-[#64748B]">
          Filter across elite tech partners to scale your architectural scope.
        </p>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-8">

        {/* Filters */}
        <aside className="sticky top-[100px] rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)]">

          <div className="mb-6 flex justify-between border-b border-[#E2E8F0] pb-3">
            <h3 className="font-bold text-[#111827]">
              Filter Configurations
            </h3>

            <button
              onClick={() => {
                setSearch("");
                setLocation("ALL");
                setTypes([]);
              }}
              className="text-[13px] font-semibold text-[#059669]"
            >
              Clear All
            </button>
          </div>

          <h4 className="mb-3 text-[14px] font-semibold text-[#111827]">
            Job Type
          </h4>

          <div className="mb-6 flex flex-col gap-2 text-[14px]">
            {[
              "Full-time",
              "Part-time",
              "Internship",
              "Contract",
            ].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={types.includes(type)}
                  onChange={() => toggleType(type)}
                  className="accent-[#059669]"
                />

                {type}
              </label>
            ))}
          </div>

          <h4 className="mb-3 text-[14px] font-semibold text-[#111827]">
            Location Focus
          </h4>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mb-6 h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2 text-[14px]"
          >
            <option value="ALL">All Locations</option>
            <option value="Remote">Remote Only</option>
            <option value="San Francisco">
              San Francisco
            </option>
            <option value="New York">
              New York
            </option>
          </select>
        </aside>

        {/* Results */}
        <div>

          <div className="mb-6 flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-6 py-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04)]">

            <div className="flex w-[500px] items-center gap-3">
              <i className="ri-search-2-line text-[#059669]" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Refine by keyword or core technical skill..."
                className="w-full outline-none"
              />
            </div>

            <div className="text-[14px] font-semibold">
              Result Count:

              <span className="ml-2 rounded-full bg-[rgba(5,150,105,0.08)] px-2.5 py-1 text-[#059669]">
                {filteredJobs.length} roles
              </span>
            </div>
          </div>

          {loading ? (
            <p className="rounded-xl border border-[#E2E8F0] bg-white p-8 text-center text-[#64748B]">
              Loading jobs...
            </p>
          ) : error ? (
            <p
              role="alert"
              className="rounded-xl border border-[#FECACA] bg-white p-8 text-center text-[#B91C1C]"
            >
              {error}
            </p>
          ) : filteredJobs.length ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id || job._id}
                  job={job}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-[60px] text-center">

              <i className="ri-briefcase-line mb-4 inline-block text-[48px] text-[#64748B] opacity-40" />

              <h3 className="mb-2 text-[18px] font-bold text-[#111827]">
                No matching jobs found
              </h3>

              <p className="text-[14px] text-[#64748B]">
                Try adjusting your selected filters or refining search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Jobs;
