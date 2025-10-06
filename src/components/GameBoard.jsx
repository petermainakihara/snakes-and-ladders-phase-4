import React, { useState } from "react";
import { startGame, movePlayer, getHistory } from "../api";

export default function GameBoard() {
  const [gameData, setGameData] = useState(null);
  const [message, setMessage] = useState("");

  async function handleStartGame() {
    const data = await startGame("Player1");
    setGameData(data);
    setMessage("Game started!");
  }

  async function handleMove() {
    if (!gameData || !gameData.game_id) return alert("Start game first!");
    const data = await movePlayer(gameData.game_id, 1, Math.ceil(Math.random() * 6));
    setMessage(JSON.stringify(data));
  }

  async function handleHistory() {
    if (!gameData || !gameData.game_id) return alert("Start game first!");
    const data = await getHistory(gameData.game_id);
    setMessage(JSON.stringify(data));
  }

  return (
    <div>
      <h2>Game Board</h2>
      <button onClick={handleStartGame}>Start Game</button>
      <button onClick={handleMove}>Move Player</button>
      <button onClick={handleHistory}>View History</button>
      <p>{message}</p>
    </div>
  );
}
