import {api }from '../../../shared/api'

export async function jobApplications(jobId) {
  const response = await api.get(`/api/application/job/${jobId}`);

  return response.data;
}

export async function statusApplications(applicationId, status) {
  const response = await api.patch(
    `/api/application/status/${applicationId}`,
    { status }
  );

  return response.data;
}

