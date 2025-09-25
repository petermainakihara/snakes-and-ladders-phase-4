import React from 'react'

const Cell = ({ number, isPink, playersHere }) => {
  const style = {
    backgroundColor: isPink ? '#ffc0cb' : '#ffff88',
    color: 'black'
  }

  return (
    <div className="cell" style={style}>
      <span>{number}</span>
      <div className="players">
        {playersHere.map(player => (
          <span
            key={player.id}
            className="player-dot"
            style={{ backgroundColor: player.color }}
            title={player.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Cell
