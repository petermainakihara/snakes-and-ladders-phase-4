// src/utils/auth.js

// -------------------------------
// ✅ Manage authentication token & user in localStorage
// -------------------------------

// Save token after login/signup
export const saveToken = (token) => {
  if (!token) return;
  localStorage.setItem("token", token);
};

// Get token for API requests
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token on logout
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Save user information in localStorage
export const saveUser = (user) => {
  if (!user) return;
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user information from localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Remove user info on logout
export const removeUser = () => {
  localStorage.removeItem("user");
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken(); // returns true if token exists
};

// Logout helper: remove both token and user info
export const logout = () => {
  removeToken();
  removeUser();
};
