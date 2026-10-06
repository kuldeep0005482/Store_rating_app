
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  let payload = {};
  try { payload = text ? JSON.parse(text) : {}; } catch { payload = { message: text }; }

  if (!response.ok) {
    if (response.status === 401) {
      window.dispatchEvent(new Event("storerate:unauthorized"));
    }
    const error = new Error(payload.message || "Request failed");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export function saveAuthUser(user) {
  localStorage.setItem("authUser", JSON.stringify(user));
}

export function clearAuthUser() {
  localStorage.removeItem("authUser");
}
