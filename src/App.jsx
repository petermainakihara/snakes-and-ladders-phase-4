import React, { useState } from "react";
import Board from "./components/board/board"; // Game board layout
import Dice from "./assets/dice"; // Dice component
import { snakes, ladders, checkSnakeOrLadder } from "./components/data/snakesAndLadders"; // Game elements
import { checkWin } from "./components/GameLogic/winCheck"; // Win condition checker

// Constants
const NUM_PLAYERS = 2;
const BOARD_SIZE = 100;

const App = () => {
  // State for each player's current position on the board
  const [positions, setPositions] = useState(Array(NUM_PLAYERS).fill(0));

  // Track which player's turn it is (0-based index)
  const [currentPlayer, setCurrentPlayer] = useState(0);

  // Store the last dice value rolled
  const [diceValue, setDiceValue] = useState(null);

  // Store the winner's index (if game ends)
  const [winner, setWinner] = useState(null);

  // Handle the dice roll logic
  const handleRoll = (value) => {
    if (winner !== null) return; // Do nothing if the game is already won

    setDiceValue(value); // Set the rolled dice value

    let newPos = positions[currentPlayer] + value;

    // Prevent moving beyond the board size
    if (newPos > BOARD_SIZE) {
      newPos = positions[currentPlayer];
    }

    // Check if landed on a snake or ladder
    const finalPos = checkSnakeOrLadder(newPos);

    // Update the player's new position
    const updatedPositions = [...positions];
    updatedPositions[currentPlayer] = finalPos;
    setPositions(updatedPositions);

    // Check for win condition
    if (checkWin(finalPos)) {
      setWinner(currentPlayer);
    } else {
      // Proceed to next player's turn
      setCurrentPlayer((currentPlayer + 1) % NUM_PLAYERS);
    }
  };

  return (
    <div className="app">
      <h1>🎲 Snakes and Ladders 🐍</h1>

      {/* Render the game board with current player positions and elements */}
      <Board positions={positions} snakes={snakes} ladders={ladders} />

      {/* Dice component to roll and trigger game moves */}
      <Dice onRoll={handleRoll} />

      {/* Show dice roll result */}
      {diceValue && <p>Player {currentPlayer + 1} rolled a {diceValue}</p>}

      {/* Display winner if there's one */}
      {winner !== null && <h2>🏆 Player {winner + 1} Wins!</h2>}
    </div>
  );
};

export default App;
