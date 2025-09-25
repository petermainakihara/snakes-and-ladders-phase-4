import React, { useState, useEffect } from 'react';

function GameState() {
  const [playerPositions, setPlayerPositions] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);
  const [winner, setWinner] = useState(null);

  const initGame = (numPlayers = 2) => {
    setPlayerPositions(Array(numPlayers).fill(0));
    setCurrentPlayer(0);
    setDiceRoll(null);
    setWinner(null);
  };

  useEffect(() => {
    initGame(2);
  }, []);

  const rollDice = () => {
    if (winner !== null) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    movePlayer(roll);
  };

  const movePlayer = (roll) => {
    setPlayerPositions((prevPositions) => {
      const updatedPositions = [...prevPositions];
      let newPos = updatedPositions[currentPlayer] + roll;

      if (newPos >= 100) {
        newPos = 100;
        setWinner(currentPlayer);
      }

      updatedPositions[currentPlayer] = newPos;
      return updatedPositions;
    });
  };

  const nextTurn = () => {
    if (winner !== null) return;
    setCurrentPlayer((prev) => (prev + 1) % playerPositions.length);
    setDiceRoll(null);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1> Snakes and Ladders</h1>
      {winner !== null ? (
        <h2>🏆 Player {winner + 1} Wins!</h2>
      ) : (
        <>
          <h2>Player {currentPlayer + 1}'s Turn</h2>
          <p>Dice Roll: {diceRoll !== null ? diceRoll : 'Not rolled yet'}</p>
          <button onClick={rollDice} disabled={playerPositions[currentPlayer] >= 100}>
            Roll Dice
          </button>
          <button onClick={nextTurn}>Next Turn</button>
        </>
      )}
      <ul>
        {playerPositions.map((pos, index) => (
          <li key={index}>Player {index + 1} is at position {pos}</li>
        ))}
      </ul>
      <button onClick={() => initGame(2)}>Restart Game</button>
    </div>
  );
}

export default GameState;
