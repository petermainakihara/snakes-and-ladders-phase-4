const API_URL = import.meta.env.VITE_API_URL;

export const testBackend = async () => {
  try {
    const res = await fetch(`${API_URL}/api/test`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Failed to connect to backend:", err);
    return { message: "Connection failed" };
  }
};

export const signup = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};
