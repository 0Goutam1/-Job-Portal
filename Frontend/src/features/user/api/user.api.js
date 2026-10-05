import {api }from '../../../shared/api'

export async function updateProfile(profile) {
  const formData = new FormData();

  formData.append("fullName", profile.fullName || "");
  formData.append("bio", profile.bio || "");
  formData.append("skills", profile.skills || "");
  formData.append( "experienceStatus",profile.experienceStatus || "" );

  if (profile.profileImage) {
    formData.append("profileImage", profile.profileImage);
  }

  if (profile.resume) {
    formData.append("resume", profile.resume);
  }

  const response = await api.put("/api/user/profile",formData);

  return response.data;
}

export async function getMyApplications() {
  const response = await api.get( "/api/application/my-applications");
  return response.data;
}
