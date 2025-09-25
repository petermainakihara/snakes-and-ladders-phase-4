import React, { useState } from 'react'
import Board from './components/Board'
import Dice from './components/Dice'
import { resolveSnakesAndLadders } from './logic/gameLogic'
import {
  initialGameState,
  getCurrentPlayer,
  updatePlayerPosition,
  nextPlayerTurn,
  checkWinCondition
} from './logic/gameState'

const App = () => {
  const [gameState, setGameState] = useState(initialGameState)

  const currentPlayer = getCurrentPlayer(gameState)

  const handleRoll = (roll) => {
    if (gameState.gameOver) return

    let tentative = currentPlayer.position + roll
    if (tentative > 100) tentative = currentPlayer.position

    let finalPosition = resolveSnakesAndLadders(tentative)
    const hasWon = checkWinCondition(finalPosition)

    let updated = updatePlayerPosition(gameState, finalPosition)

    if (hasWon) {
      setGameState({
        ...updated,
        gameOver: true,
        winner: currentPlayer
      })
    } else {
      const rotated = nextPlayerTurn(updated)
      setGameState(rotated)
    }
  }

  return (
    <div className="app">
      <h1>🎲 Snakes and Ladders</h1>
      <Board players={gameState.players} />
      {!gameState.gameOver ? (
        <>
          <p>Turn: <strong>{currentPlayer.name}</strong></p>
          <Dice onRoll={handleRoll} />
        </>
      ) : (
        <h2>🏆 {gameState.winner.name} Wins!</h2>
      )}
    </div>
  )
}

export default App
