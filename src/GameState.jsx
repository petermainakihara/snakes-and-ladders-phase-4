import React, { useState } from 'react';

function GameState() {
  const [playerPositions, setPlayerPositions] = useState([0, 0]); // assuming 2 players
  const [currentPlayer, setCurrentPlayer] = useState(0); // 0 for Player 1, 1 for Player 2
  const [diceRoll, setDiceRoll] = useState(null);

  
  const initGame = (numPlayers) => {
    setPlayerPositions(Array(numPlayers).fill(0));
    setCurrentPlayer(0);
    setDiceRoll(null);
  };

  const nextTurn = () => {
    setCurrentPlayer((prev) => (prev + 1) % playerPositions.length);
  };

  
  const getCurrentPlayer = () => currentPlayer;

  return (
    <div>
      <h1> Snakes and Ladders</h1>
      <p>Player {currentPlayer + 1}'s turn</p>
      <p>Dice Roll: {diceRoll !== null ? diceRoll : 'Not rolled yet'}</p>
      <ul>
        {playerPositions.map((pos, index) => (
          <li key={index}>Player {index + 1} is at position {pos}</li>
        ))}
      </ul>

      <button onClick={() => initGame(2)}>Restart Game</button>
      <button onClick={nextTurn}>Next Turn</button>
    </div>
  );
}
export default GameState