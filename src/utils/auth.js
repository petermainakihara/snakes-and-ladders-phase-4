// Manage authentication token in localStorage

// Save token after login/signup
export const saveToken = (token) => {
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

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token"); // true if token exists
};

// Optional: Save or get user info
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
