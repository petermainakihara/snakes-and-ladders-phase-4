// src/components/board/Auth/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, saveUser } from "../../../utils/auth";

const Login = () => {
  // -------------------------------
  // ✅ State variables
  // -------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // -------------------------------
  // ✅ Handle form submission
  // -------------------------------
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
        // -------------------------------
        // ✅ Save token and user info
        // -------------------------------
        if (data.token) saveToken(data.token);
        if (data.user) saveUser(data.user);

        setMessage("✅ Login successful! Redirecting...");

        // Redirect to /game after a short delay
        setTimeout(() => navigate("/game"), 1000);
      } else {
        // -------------------------------
        // Show backend-provided error message or default
        // -------------------------------
        setError(data.error || data.message || "Invalid login credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Something went wrong. Check if backend is running and CORS is enabled."
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Display messages */}
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
