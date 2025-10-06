import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './styles.css'

// 🧠 Import your pages
import App from './App.jsx'                 // 🎲 Game page
import Login from './components/Auth/Login.jsx'   // 🔐 Login page
import Signup from './components/Auth/Signup.jsx' // 🆕 Signup page

function Main() {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>🎲 Game</Link>
        <Link to="/login" style={{ marginRight: '10px' }}>🔐 Login</Link>
        <Link to="/signup">🆕 Signup</Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
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
