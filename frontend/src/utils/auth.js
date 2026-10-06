export function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem("authUser") || "null");
  } catch {
    localStorage.removeItem("authUser");
    return null;
  }
}

export function normalizeRole(role) {
  const value = String(role || "").trim().toUpperCase();
  if (value === "OWNER" || value === "STOREOWNER" || value === "STORE-OWNER") {
    return "STORE_OWNER";
  }
  return value;
}

export function getHomePath(user) {
  const role = normalizeRole(user?.role);
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "STORE_OWNER") return "/owner/dashboard";
  return "/stores";
}

export function saveAuthUser(user) {
  localStorage.setItem("authUser", JSON.stringify(user));
}

export function clearAuthUser() {
  localStorage.removeItem("authUser");
}
