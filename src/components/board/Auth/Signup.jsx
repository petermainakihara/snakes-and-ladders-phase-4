// src/components/board/Auth/Signup.jsx

import React, { useState } from "react";
import { saveToken, saveUser } from "../../../utils/auth"; // Fixed path

const Signup = () => {
  // -------------------------------
  // ✅ State variables
  // -------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // -------------------------------
  // ✅ Handle form submission
  // -------------------------------
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // -------------------------------
    // 🛑 Validate password match
    // -------------------------------
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // -------------------------------
      // ✅ Send POST request to Flask backend
      // -------------------------------
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Parse JSON response
      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Account created successfully! You can now log in.");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Optional: store user/token if backend sends it
        if (data.token) saveToken(data.token);
        if (data.user) saveUser(data.user);
      } else {
        // Show backend-provided error message or default
        setError(data.error || data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      // Show network or fetch errors
      setError(
        "Something went wrong. Check if backend is running and CORS is enabled."
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>

        {/* Display messages */}
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
