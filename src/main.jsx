// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './styles.css'

// 🧠 Import your pages
import App from "./App.jsx";
import Login from "./components/board/Auth/Login.jsx";
import Signup from "./components/board/Auth/Signup.jsx";

function Main() {
  return (
    <Router>
      {/* 🔗 Simple navigation for testing routes */}
      <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link to="/" style={{ marginRight: '15px' }}>🎲 Game</Link>
        <Link to="/login" style={{ marginRight: '15px' }}>🔐 Login</Link>
        <Link to="/signup">🆕 Signup</Link>
      </nav>

      <Routes>
        {/* 🏠 Default page — game board */}
        <Route path="/*" element={<App />} />  {/* ✅ Changed "/" to "/*" */}
        {/* 🔐 Login route */}
        <Route path="/login" element={<Login />} />
        {/* 🆕 Signup route */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
