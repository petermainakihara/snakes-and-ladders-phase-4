import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, getToken, removeToken } from "../../../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // to redirect after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save token and user info
        saveToken(data.token || "dummy-token"); // Replace with real token if backend provides
        saveUser(data.user);

        setMessage("✅ Login successful! Redirecting...");
        // Redirect to /game after 1 second
        setTimeout(() => navigate("/game"), 1000);
      } else {
        setError(data.error || "Invalid login credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
