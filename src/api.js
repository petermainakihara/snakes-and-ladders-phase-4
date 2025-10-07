
const BASE_URL = "http://localhost:5000";

// ✅ Start Game with multiple players
export async function startGame(playerNames = ["Player1", "Player2"]) {
  const res = await fetch(`${BASE_URL}/game/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ players: playerNames }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to start game");
  }

  return res.json();
}

// ✅ Move a player
export async function movePlayer(gameId, playerId, steps) {
  const res = await fetch(`${BASE_URL}/game/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game_id: gameId, player_id: playerId, steps }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to move player");
  }

  return res.json();
}

// ✅ Get game history
export async function getHistory(gameId) {
  const res = await fetch(`${BASE_URL}/game/history?game_id=${gameId}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to get history");
  }
  return res.json();
}
