import React from 'react';
import Cell from './cell';

const Board = ({ players }) => {
  const playerMap = {};
  players.forEach((player) => {
    if (!playerMap[player.position]) playerMap[player.position] = [];
    playerMap[player.position].push(player);
  });

  const cells = [];
  for (let row = 9; row >= 0; row--) {
    const base = row * 10;
    for (let col = 0; col < 10; col++) {
      const index = row % 2 === 0 ? base + col + 1 : base + (9 - col) + 1;
      const occupyingPlayers = playerMap[index] || [];
      cells.push(
        <Cell key={index} number={index} playersHere={occupyingPlayers} />
      );
    }
  }

  return (
    <div className="board-background">
      <div className="board">{cells}</div>
    </div>
  );
};

export default Board;
