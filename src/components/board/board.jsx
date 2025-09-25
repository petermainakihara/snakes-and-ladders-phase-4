import React from 'react'
import Cell from './Cell'

const Board = ({ players }) => {
  const cells = []

  const playerMap = {}
  players.forEach(player => {
    playerMap[player.position] = playerMap[player.position] || []
    playerMap[player.position].push(player)
  })

  for (let i = 100; i > 0; i--) {
    const isPink = i % 2 === 0
    const occupyingPlayers = playerMap[i] || []
    cells.push(
      <Cell
        key={i}
        number={i}
        isPink={isPink}
        playersHere={occupyingPlayers}
      />
    )
  }

  return <div className="board">{cells}</div>
}

export default Board
