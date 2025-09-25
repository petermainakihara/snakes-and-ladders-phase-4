import React from 'react';
import './GameLogic.css';

const GameControls = ({ 
  currentPlayerIndex, 
  diceValue, 
  gameStatus, 
  winner, 
  onRoll, 
  onReset 
}) => {
  return (
    <div className="game-controls">
      {gameStatus === 'playing' ? (
        <>
          <h3>Player {currentPlayerIndex + 1}'s Turn</h3>
          <button onClick={onRoll} className="roll-button">
            Roll Dice
          </button>
          {diceValue && (
            <p className="dice-result">You rolled: {diceValue}</p>
          )}
        </>
      ) : (
        <>
          <h2 className="winner-message">
            Player {winner} Wins! 🎉
          </h2>
          <button onClick={onReset} className="reset-button">
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

export default GameControls;