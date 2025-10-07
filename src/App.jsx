import React, { useState, useEffect } from "react";

// 🧠 Game Components
import Board from "./components/board/board";
import Dice from "./components/dice";

// 🐍 Snakes & Ladders Resolver
import { resolveSnakesAndLadders } from "./components/GameLogic/gameLogic";

// ⚙️ Game Logic Helpers
import {
  initialGameState,
  getCurrentPlayer,
  updatePlayerPosition,
  nextPlayerTurn,
  checkWinCondition,
} from "./components/GameLogic/GameState";

// 🌐 Backend API URL
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const App = () => {
  const [gameState, setGameState] = useState(initialGameState);
  const [backendMessage, setBackendMessage] = useState("Connecting to backend...");
  const [gameId, setGameId] = useState(null); // 🔑 store backend game ID

  // ✅ Test backend connection when app loads
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(`${API_URL}/api/test`);
        const data = await response.json();
        setBackendMessage(data.message || "Connected to backend ✅");
      } catch (error) {
        console.error("Backend connection failed:", error);
        setBackendMessage("❌ Failed to connect to backend");
      }
    };
    testConnection();
  }, []);

  // ✅ Start new game (sync with backend)
  const startNewGame = async () => {
    try {
      const res = await fetch(`${API_URL}/game/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: "Player 1" }),
      });

      const data = await res.json();
      if (data && data.game_id) {
        setGameId(data.game_id);
        setGameState(initialGameState);
        alert(`Game started successfully! Game ID: ${data.game_id}`);
      } else {
        alert("Failed to start game on backend.");
      }
    } catch (err) {
      console.error("Error starting game:", err);
    }
  };

  // 🎯 Handle Dice Roll (sync move to backend)
  const handleRoll = async (roll) => {
    if (gameState.gameOver) return;

    const currentPlayer = getCurrentPlayer(gameState);
    let tentative = currentPlayer.position + roll;
    if (tentative > 100) tentative = currentPlayer.position;

    let finalPosition = resolveSnakesAndLadders(tentative);
    const hasWon = checkWinCondition(finalPosition);

    // ✅ Update frontend state
    let updated = updatePlayerPosition(gameState, finalPosition);

    // ✅ Send move to backend
    try {
      if (gameId) {
        const moveRes = await fetch(`${API_URL}/game/move`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            game_id: gameId,
            player_id: 1, // hardcoded for single player for now
            dice_roll: roll,
          }),
        });

        const moveData = await moveRes.json();
        console.log("Move recorded in backend:", moveData);
      }
    } catch (err) {
      console.error("Backend move failed:", err);
    }

    // ✅ Check for win
    if (hasWon) {
      setGameState({
        players: updated.players,
        currentPlayerIndex: updated.currentPlayerIndex,
        gameOver: true,
        winner: currentPlayer,
      });
    } else {
      const rotated = nextPlayerTurn(updated);
      setGameState(rotated);
    }
  };

  // 🕹️ Fetch Game History (optional)
  const fetchGameHistory = async () => {
    if (!gameId) return alert("Start a game first!");

    try {
      const res = await fetch(`${API_URL}/game/history?game_id=${gameId}`);
      const data = await res.json();
      console.log("Game history:", data);
      alert(`History: ${JSON.stringify(data)}`);
    } catch (err) {
      console.error("Failed to fetch game history:", err);
    }
  };

  // 🔁 Reset Game (frontend only)
  const handleReset = () => {
    setGameState(initialGameState);
    setGameId(null);
  };

  const currentPlayer = getCurrentPlayer(gameState);

  return (
    <div className="app" style={{ padding: "20px" }}>
      <h1>🎲 Snakes and Ladders</h1>

      {/* 🧠 Backend Connection Status */}
      <p style={{ fontStyle: "italic", color: "gray" }}>{backendMessage}</p>

      {/* 🧩 Start Game */}
      <button onClick={startNewGame} style={{ marginBottom: "10px" }}>
        Start New Game
      </button>

      {/* 🧩 Game Board */}
      <Board players={gameState.players} />

      {/* 🏆 Winner */}
      {gameState.gameOver && <h2>{gameState.winner.name} Wins!</h2>}

      {/* 🎯 Game Turn and Dice */}
      {!gameState.gameOver && (
        <div>
          <p>
            Turn: <strong>{currentPlayer.name}</strong>
          </p>
          <Dice onRoll={handleRoll} />
        </div>
      )}

      {/* 🔁 Reset Button */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleReset} className="reset-btn">
          Reset Game
        </button>
        <button onClick={fetchGameHistory} style={{ marginLeft: "10px" }}>
          View Game History
        </button>
      </div>
    </div>
  );
};

export default App;
