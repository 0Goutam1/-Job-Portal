import {api }from '../../../shared/api'

export async function createCompany({
  companyName,
  description,
  location,
  logo,
}) {
  const formData = new FormData();

  formData.append("companyName", companyName || "");
  formData.append("description", description || "");
  formData.append("location", location || "");

  if (logo) {
    formData.append("logo", logo);
  }

  const response = await api.post("/api/company/", formData);

  return response.data;
}

export async function getMyCompanies() {
  const response = await api.get("/api/company/my-companies");

  return response.data;
}

export async function allCompanies() {
  const response = await api.get("/api/company/all-companies");

  return response.data;
}
