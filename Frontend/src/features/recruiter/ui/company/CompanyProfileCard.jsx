
const CompanyProfileCard = ({ company }) => {
  return (
    <div className="border-b border-[#E2E8F0] p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Company Logo */}
        <div
          className="
            flex
            h-[72px]
            w-[72px]
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[rgba(5,150,105,0.1)]
            text-[#059669]
          "
        >
          {company.logo
            ? <img src={company.logo} alt={`${company.name} logo`} className="h-full w-full rounded-xl object-cover" />
            : <i className="ri-building-4-line text-[32px]" />}
        </div>

        {/* Company Information */}
        <div>
          <h2 className="text-[22px] font-extrabold text-[#111827]">
            {company.name}
          </h2>

          <p className="mt-1 text-[14px] text-[#64748B]">
            {company.industry}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#64748B]">
            {/* Location */}
            <span className="flex items-center gap-1.5">
              <i className="ri-map-pin-line text-[15px] text-[#059669]" />
              {company.location}
            </span>

            {/* Company Size */}
            <span className="flex items-center gap-1.5">
              <i className="ri-group-line text-[15px] text-[#059669]" />
              {company.size}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileCard;
