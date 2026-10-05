import {api }from '../../../shared/api'

export async function allJobs() {
const response = await api.get("/api/job/");
return response.data;
}

export async function postJob({
title,
description,
skillsRequired,
location,
salary,
jobType,
}) {
const response = await api.post("/api/job/", {
title,
description,
skillsRequired,
location,
salary,
jobType,
});

return response.data;
}

export async function applyJob(jobId) {
const response = await api.post("/api/job/apply/" + jobId);
return response.data;
}

export async function jobApplicants(applicantId) {
const response = await api.get("/api/job/applicants/" + applicantId);
return response.data;
}