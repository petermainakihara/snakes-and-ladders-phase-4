import React from 'react';
import Cell from './Cell'; // Import individual cell component

// Board displays 100 cells with players on it
const Board = ({ players }) => {
  const cells = [];

  // Fill cells from 100 down to 1 for top-down rendering
  for (let i = 100; i >= 1; i--) {
    // Find all players currently on this cell
    const cellPlayers = players.filter(p => p.position === i);

    cells.push(
      <Cell key={i} number={i} players={cellPlayers} />
    );
  }

  // Render 10x10 board using CSS Grid
  return <div className="grid grid-cols-10">{cells}</div>;
};

export default Board;
