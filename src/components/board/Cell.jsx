import React from "react";

const Cell = ({ number, playersHere }) => {
  return (
    <div className="cell">
      <div className="cell-number">{number}</div>
      <div className="player-tokens">
        {playersHere.map((player) => (
          <div
            key={player.id}
            className={`token token-${player.id}`}
            title={player.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Cell;
