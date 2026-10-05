
const CompanyForm = ({ onSubmit, onCancel, saving = false }) => (
  <section className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)] sm:p-8">
    <div className="mb-8">
      <h2 className="text-[20px] font-bold text-[#111827]">Company Information</h2>
      <p className="mt-1.5 text-[13px] leading-[1.6] text-[#64748B]">
        These details are saved to your recruiter company profile.
      </p>
    </div>
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <label htmlFor="companyName" className="mb-2 block text-[14px] font-semibold text-[#111827]">Company Name</label>
        <input id="companyName" name="companyName" required className="h-[50px] w-full rounded-[12px] border border-[#E2E8F0] px-4 text-[14px] outline-none focus:border-[#059669]" placeholder="Enter company name" />
      </div>
      <div>
        <label htmlFor="location" className="mb-2 block text-[14px] font-semibold text-[#111827]">Location</label>
        <input id="location" name="location" required className="h-[50px] w-full rounded-[12px] border border-[#E2E8F0] px-4 text-[14px] outline-none focus:border-[#059669]" placeholder="e.g. Bangalore, India" />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="description" className="mb-2 block text-[14px] font-semibold text-[#111827]">About Company</label>
        <textarea id="description" name="description" rows="6" required className="w-full resize-y rounded-[12px] border border-[#E2E8F0] px-4 py-3.5 text-[14px] outline-none focus:border-[#059669]" placeholder="Tell candidates about your company..." />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="companyLogo" className="mb-2 block text-[14px] font-semibold text-[#111827]">Company Logo (optional)</label>
        <input id="companyLogo" name="logo" type="file" accept="image/*" className="block w-full rounded-lg border border-[#E2E8F0] p-3 text-[14px]" />
      </div>
      <div className="mt-3 flex justify-end gap-3 md:col-span-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="h-[48px] rounded-xl border border-[#E2E8F0] bg-white px-5 text-[14px] font-semibold text-[#111827]">
            Cancel
          </button>
        )}
        <button type="submit" disabled={saving} className="h-[48px] rounded-xl bg-[#059669] px-6 text-[14px] font-semibold text-white hover:bg-[#047857] disabled:opacity-60">
          {saving ? "Saving..." : "Save Company"}
        </button>
      </div>
    </form>
  </section>
);

export default CompanyForm;
