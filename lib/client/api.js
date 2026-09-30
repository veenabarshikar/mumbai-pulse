/** Small fetch wrapper. Every failure becomes an ApiError with a message that is safe to show. */
export class ApiError extends Error {
  constructor(message, status = 0, fieldErrors = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request(url, options = {}) {
  let response;
  try {
    response = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  } catch {
    throw new ApiError('Network problem. Check your connection and try again.');
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Empty or non-JSON body: handled below.
  }

  if (!response.ok) {
    throw new ApiError(data?.error || 'Request failed. Please try again.', response.status, data?.errors);
  }
  return data;
}

export const api = {
  get: (url) => request(url),
  post: (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) }),
  put: (url, body) => request(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (url) => request(url, { method: 'DELETE' }),
  /** Sends a FormData body. The browser sets the multipart header itself. */
  upload: (url, formData) => request(url, { method: 'POST', body: formData, headers: {} }),
};
