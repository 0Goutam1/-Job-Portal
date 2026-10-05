import { useEffect, useState } from "react";
import { useCompany } from "../../hooks/company.hook";

import CompanyHeader from "./CompanyHeader";
import CompanyProfileCard from "./CompanyProfileCard";
import CompanyDetails from "./CompanyDetails";
import CompanyForm from "./CompanyForm";

const CompanyManagement = () => {
  const {
    myCompanies: companies,
    handleMyCompanies,
    handleCreateCompany,
    loading,
    error,
  } = useCompany();

  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    handleMyCompanies();
  // Fetch once on mount; hook actions are intentionally not memoized.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const logo = data.get("logo");

    setSaving(true);

    await handleCreateCompany({
      companyName: data.get("companyName"),
      description: data.get("description"),
      location: data.get("location"),
      logo: logo?.size ? logo : null,
    });

    setSaving(false);
    setIsCreating(false);
  };

  const company = companies[0]
    ? {
        ...companies[0],
        name: companies[0].companyName,
        industry: "Company",
        size: "Not provided",
        website: "Not provided",
      }
    : null;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] px-[8%] py-10">
      <CompanyHeader
        onEdit={
          company
            ? () => setIsCreating(true)
            : undefined
        }
      />

      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg bg-[#FEF2F2] p-3 text-[14px] text-[#B91C1C]"
        >
          {error}
        </p>
      )}

      {loading && !companies.length ? (
        <p className="rounded-xl border border-[#E2E8F0] bg-white p-10 text-center text-[#64748B]">
          Loading company details...
        </p>
      ) : isCreating || !companies.length ? (
        <CompanyForm
          onSubmit={handleSubmit}
          onCancel={
            company
              ? () => setIsCreating(false)
              : undefined
          }
          saving={saving}
        />
      ) : (
        <>
          <section className="mb-5 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.03)]">
            <CompanyProfileCard company={company} />
            <CompanyDetails company={company} />
          </section>

          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="rounded-xl bg-[#059669] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#047857]"
          >
            Register Another Company
          </button>
        </>
      )}
    </main>
  );
};

export default CompanyManagement;
