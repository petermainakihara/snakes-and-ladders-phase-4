import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import Dice from "./components/Dice";
import { snakes, ladders } from "./logic/boardSetup";
import {
  initGame,
  getCurrentPlayer,
  nextTurn,
  playerPositions,
  updatePlayerPosition,
} from "./logic/gameState";
import { checkSnakeOrLadder } from "./logic/boardSetup";
import { checkWin } from "./logic/winCheck";

const NUM_PLAYERS = 2;
const BOARD_SIZE = 100;

const App = () => {
  const [positions, setPositions] = useState(initGame(NUM_PLAYERS)); // [0, 0]
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [winner, setWinner] = useState(null);

  // Roll handler
  const handleRoll = (value) => {
    if (winner !== null) return;

    setDiceValue(value);

    let newPos = positions[currentPlayer] + value;

    if (newPos > BOARD_SIZE) {
      newPos = positions[currentPlayer]; // Don't move if over limit
    }

    // Check if landed on snake or ladder
    const finalPos = checkSnakeOrLadder(newPos, snakes, ladders);

    // Update position
    const newPositions = [...positions];
    newPositions[currentPlayer] = finalPos;
    setPositions(newPositions);

    // Check win
    if (checkWin(finalPos)) {
      setWinner(currentPlayer);
    } else {
      // Next turn
      setTimeout(() => {
        setCurrentPlayer(nextTurn(currentPlayer, NUM_PLAYERS));
        setDiceValue(null);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-100 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎲 Snakes and Ladders</h1>

      <Board
        positions={positions}
        snakes={snakes}
        ladders={ladders}
        boardSize={BOARD_SIZE}
      />

      {winner !== null ? (
        <h2 className="text-green-600 text-2xl font-bold mt-4">
          🏆 Player {winner + 1} Wins!
        </h2>
      ) : (
        <>
          <h2 className="text-xl mt-4">
            Player {currentPlayer + 1}'s turn
          </h2>
          <Dice onRoll={handleRoll} disabled={diceValue !== null} />
          {diceValue && <p className="mt-2">Rolled: {diceValue}</p>}
        </>
      )}
    </div>
  );
};

export default App;
