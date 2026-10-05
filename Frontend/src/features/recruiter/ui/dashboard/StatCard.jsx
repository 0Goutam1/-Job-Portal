
const StatCard = ({ title, value, description, icon, iconBg }) => {
  return (
    <div
      className="
        group
        rounded-xl
        border
        border-[#E2E8F0]
        bg-white
        p-6
        shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_15px_25px_-10px_rgba(0,0,0,0.08)]
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <p className="text-[14px] font-medium text-[#64748B]">
          {title}
        </p>

        {/* Icon */}
        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            ${iconBg || "bg-[rgba(5,150,105,0.1)]"}
            text-[#059669]
          `}
        >
          <i className={`${icon} text-[19px]`} />
        </div>
      </div>

      {/* Value */}
      <h2
        className="
          mt-4
          text-[28px]
          font-extrabold
          tracking-[-0.02em]
          text-[#111827]
        "
      >
        {value}
      </h2>

      {/* Description */}
      <p className="mt-2 text-[13px] text-[#64748B]">
        {description}
      </p>
    </div>
  );
};

export default StatCard;
