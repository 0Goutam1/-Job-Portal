
const ApplicationOverview = ({ applications = [] }) => {
  const applicationStats = [
    {
      label: "Pending",
      value: applications.filter((application) => application.status === "pending").length,
      color: "bg-[#F59E0B]",
      textColor: "text-[#D97706]",
      bgColor: "bg-[#FFFBEB]",
    },
    {
      label: "Accepted",
      value: applications.filter((application) => application.status === "accepted").length,
      color: "bg-[#059669]",
      textColor: "text-[#059669]",
      bgColor: "bg-[#ECFDF5]",
    },
    {
      label: "Rejected",
      value: applications.filter((application) => application.status === "rejected").length,
      color: "bg-[#EF4444]",
      textColor: "text-[#EF4444]",
      bgColor: "bg-[#FEF2F2]",
    },
  ];

  return (
    <section
      className="
        mt-6
        rounded-xl
        border
        border-[#E2E8F0]
        bg-white
        p-6
        shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)]
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-[#111827]">
          Application Overview
        </h2>

        <p className="mt-1 text-[13px] text-[#64748B]">
          Overview of your candidate applications.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {applicationStats.map((item) => (
          <div
            key={item.label}
            className={`
              rounded-xl
              ${item.bgColor}
              p-5
            `}
          >
            <div className="flex items-center justify-between">
              <span
                className={`
                  text-[13px]
                  font-semibold
                  ${item.textColor}
                `}
              >
                {item.label}
              </span>

              <span
                className={`
                  h-2.5
                  w-2.5
                  rounded-full
                  ${item.color}
                `}
              />
            </div>

            <h3 className="mt-3 text-[24px] font-extrabold text-[#111827]">
              {item.value}
            </h3>

            <p className="mt-1 text-[12px] text-[#64748B]">
              Applications
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApplicationOverview;
