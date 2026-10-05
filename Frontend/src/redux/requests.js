export const getRequestError = (error, fallback) => {
  const validationErrors = error?.response?.data?.errors;
  if (Array.isArray(validationErrors)) {
    const messages = [...new Set(
      validationErrors
        .map((item) => item?.msg || item?.message)
        .filter(Boolean)
    )];
    if (messages.length) return messages.join(" ");
  }

  return error?.response?.data?.message || error?.message || fallback;
};

export const normalizeListResponse = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};
