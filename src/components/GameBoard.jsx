import React, { useState } from "react";
import Board from "./board/Board";
import { startGame, movePlayer, getHistory } from "../api";

export default function GameBoard() {
  const [gameData, setGameData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Start a new game
  const handleStartGame = async () => {
    try {
      const data = await startGame(["Player1", "Player2"]);
      setGameData(data);
      setPlayers(data.players || []);
      setMessage("🎲 Game started!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to start game.");
    }
  };

  // ✅ Move a random player
  const handleMove = async () => {
    if (!gameData || !players.length) return alert("Start the game first!");

    try {
      // For simplicity, move the first player
      const player = players[0];
      const roll = Math.ceil(Math.random() * 6);
      const data = await movePlayer(gameData.id, player.id, roll);
      setPlayers(data.players || players);
      setMessage(`🎲 ${player.name} moved ${roll} steps!`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to move player.");
    }
  };

  // ✅ View game history
  const handleHistory = async () => {
    if (!gameData) return alert("Start the game first!");
    try {
      const data = await getHistory(gameData.id);
      setPlayers(data.players || []);
      setMessage("📜 Game history updated!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to get history.");
    }
  };

  return (
    <div className="game-container">
      <h2>🎲 Snakes & Ladders</h2>

      <div className="controls">
        <button onClick={handleStartGame}>Start Game</button>
        <button onClick={handleMove}>Move Player</button>
        <button onClick={handleHistory}>View History</button>
      </div>

      {players.length > 0 && <Board players={players} />}

      <pre className="message">{message}</pre>
    </div>
  );
}
