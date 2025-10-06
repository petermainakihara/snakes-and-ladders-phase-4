// src/api/index.js
const API_BASE = "http://127.0.0.1:5000";  // Flask backend base URL

// ---------- AUTH ----------
export async function signup(username, password) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return res.json();
}

// ---------- GAME ----------
export async function startGame(player_name) {
  const res = await fetch(`${API_BASE}/game/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player_name }),
  });
  return res.json();
}

export async function movePlayer(game_id, player_id, dice_roll) {
  const res = await fetch(`${API_BASE}/game/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game_id, player_id, dice_roll }),
  });
  return res.json();
}

export async function getHistory(game_id) {
  const res = await fetch(`${API_BASE}/game/history?game_id=${game_id}`);
  return res.json();
}
