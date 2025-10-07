import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/board/Auth/Login.jsx";
import Signup from "./components/board/Auth/Signup.jsx";

import GameBoard from "./components/GameBoard.jsx";
import { isLoggedIn } from "./utils/auth";

// ✅ Protects routes from unauthenticated access
function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

// ✅ App Component — handles all routing inside Router
function App() {
  return (
    <Routes>
      {/* 🔐 Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🎮 Protected Route — Game Board */}
      <Route
        path="/game"
        element={
          <PrivateRoute>
            <GameBoard />
          </PrivateRoute>
        }
      />

      {/* 🚀 Default Behavior:
           - If logged in → go to /game
           - If not logged in → go to /login
      */}
      <Route
        path="/"
        element={
          isLoggedIn() ? <Navigate to="/game" replace /> : <Navigate to="/login" replace />
        }
      />

      {/* 🧭 Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
