import { useState, useEffect } from 'react';

const useGameLogic = () => {
  // Game state
  const [players, setPlayers] = useState([
    { id: 1, position: 0, color: 'red' },
    { id: 2, position: 0, color: 'blue' }
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing' | 'won'
  const [winner, setWinner] = useState(null);

  // Snakes and Ladders positions
  const snakes = { 17: 7, 54: 34, 62: 19, 98: 79 };
  const ladders = { 4: 14, 9: 31, 20: 38, 40: 59 };

  // Handle dice roll
  const rollDice = () => {
    if (gameStatus !== 'playing') return;
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    movePlayer(value);
  };

  // Move player and check conditions
  const movePlayer = (steps) => {
    setPlayers(prev => {
      const newPlayers = [...prev];
      let newPosition = newPlayers[currentPlayerIndex].position + steps;

      // Check boundaries
      if (newPosition > 100) newPosition = 100 - (newPosition - 100);

      // Check snakes/ladders
      if (snakes[newPosition]) newPosition = snakes[newPosition];
      if (ladders[newPosition]) newPosition = ladders[newPosition];

      newPlayers[currentPlayerIndex].position = newPosition;
      return newPlayers;
    });
  };

  // Check win condition
  useEffect(() => {
    if (players[currentPlayerIndex].position === 100) {
      setGameStatus('won');
      setWinner(players[currentPlayerIndex].id);
    } else {
      const timer = setTimeout(() => {
        setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [players, currentPlayerIndex]);

  // Reset game
  const resetGame = () => {
    setPlayers([
      { id: 1, position: 0, color: 'red' },
      { id: 2, position: 0, color: 'blue' }
    ]);
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setGameStatus('playing');
    setWinner(null);
  };

  return {
    players,
    currentPlayerIndex,
    diceValue,
    gameStatus,
    winner,
    rollDice,
    resetGame
  };
};

export default useGameLogic;