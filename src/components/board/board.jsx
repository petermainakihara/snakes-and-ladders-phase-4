import React from 'react'
import Cell from './cell'
import { snakesAndLadders } from '../data/snakesAndLadders'

const getCellCenter = (cellNum) => {
  const row = Math.floor((cellNum - 1) / 10)
  const colInRow = (cellNum - 1) % 10
  const isRightToLeft = row % 2 !== 0
  const col = isRightToLeft ? 9 - colInRow : colInRow

  return {
    x: col * 40 + 20,
    y: (9 - row) * 40 + 20
  }
}

const Board = ({ players }) => {
  const playerMap = {}
  players.forEach(player => {
    if (!playerMap[player.position]) playerMap[player.position] = []
    playerMap[player.position].push(player)
  })

  const cells = []
  for (let row = 9; row >= 0; row--) {
    const base = row * 10
    for (let col = 0; col < 10; col++) {
      const index = row % 2 === 0 ? base + col + 1 : base + (9 - col) + 1
      const isPink = index % 2 === 0
      const occupyingPlayers = playerMap[index] || []
      cells.push(
        <Cell key={index} number={index} isPink={isPink} playersHere={occupyingPlayers} />
      )
    }
  }

  return (
    <div className="board-container">
      <div className="board">{cells}</div>
      <svg className="overlay">
        {snakesAndLadders.map(({ start, end, type }, i) => {
          const startPos = getCellCenter(start)
          const endPos = getCellCenter(end)
          const dx = endPos.x - startPos.x
          const dy = endPos.y - startPos.y
          const ctrlX = startPos.x + dx / 2 + (type === 'snake' ? 30 : -10)
          const ctrlY = startPos.y + dy / 2 + (type === 'snake' ? 10 : 0)

          return (
            <path
              key={`${start}-${end}-${i}`}
              d={`M${startPos.x},${startPos.y} Q${ctrlX},${ctrlY} ${endPos.x},${endPos.y}`}
              stroke={type === 'snake' ? getRandomColor() : 'brown'}
              strokeWidth="4"
              fill="none"
              strokeDasharray={type === 'ladder' ? '6,4' : '0'}
              markerEnd="url(#arrow)"
            />
          )
        })}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 Z" fill="black" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

function getRandomColor() {
  const colors = ['#e91e63', '#3f51b5', '#009688', '#ff5722', '#9c27b0']
  return colors[Math.floor(Math.random() * colors.length)]
}

export default Board
