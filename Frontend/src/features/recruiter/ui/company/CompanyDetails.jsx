
const CompanyDetails = ({ company }) => {
  return (
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* About Company */}
        <div className="md:col-span-2">
          <h3 className="mb-3 text-[15px] font-bold text-[#111827]">
            About Company
          </h3>

          <p className="max-w-4xl text-[14px] leading-[1.8] text-[#64748B]">
            {company.description}
          </p>
        </div>

        {/* Location */}
        <div>
          <p className="mb-1.5 text-[12px] font-medium text-[#94A3B8]">
            Location
          </p>

          <p className="text-[14px] font-semibold text-[#111827]">
            {company.location}
          </p>
        </div>

      </div>
    </div>
  );
};

export default CompanyDetails;
