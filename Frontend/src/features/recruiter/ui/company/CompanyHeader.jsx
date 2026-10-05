const CompanyHeader = ({ onEdit }) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
      {/* Page Title */}
      <div>
        <p className="mb-2 text-[14px] font-medium text-[#64748B]">
          Company
        </p>

        <h1 className="text-[30px] font-extrabold tracking-[-0.02em] text-[#111827]">
          Company Profile
        </h1>

        <p className="mt-2 text-[14px] leading-[1.6] text-[#64748B]">
          Manage your company information and profile.
        </p>
      </div>

      {/* Edit Button */}
      {onEdit && <button
        type="button"
        onClick={onEdit}
        className="
          inline-flex
          h-[48px]
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-[#E2E8F0]
          bg-white
          px-5
          text-[14px]
          font-semibold
          text-[#111827]
          shadow-[0_1px_3px_rgba(0,0,0,0.03)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-[#CBD5E1]
          hover:bg-[#F8FAFC]
        "
      >
        <i className="ri-edit-line text-[17px]" />
        Edit Company
      </button>}
    </div>
  );
};

export default CompanyHeader;
