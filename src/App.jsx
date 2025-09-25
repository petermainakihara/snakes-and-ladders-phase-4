import React, { useState } from 'react'
//shows the board and the dice on the screen
import Board from './components/board/board'
import Dice from './components/dice'
//handles the snakes and ladder
import { resolveSnakesAndLadders } from './components/GameLogic/gameLogic'
//helper function 
import {
  initialGameState,
  getCurrentPlayer,
  updatePlayerPosition,
  nextPlayerTurn,
  checkWinCondition
} from './components/GameLogic/GameState'

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
    players: updated.players,
    currentPlayerIndex: updated.currentPlayerIndex,
    gameOver: true,
    winner: currentPlayer
  })
} else {
  const rotated = nextPlayerTurn(updated)
  setGameState({
    players: rotated.players,
    currentPlayerIndex: rotated.currentPlayerIndex,
    gameOver: rotated.gameOver,
    winner: rotated.winner
  })
}

  }

  //RESET GAME BUTTON HANDLER
  const handleReset = () => {
    setGameState(initialGameState)
  }

  return (
    <div className="app">
      <h1>🎲 Snakes and Ladders</h1>
      <Board players={gameState.players} />

     {gameState.gameOver && (
  <h2>{gameState.winner.name} Wins!</h2>
)}

    {!gameState.gameOver && (
     <div>
    <p>Turn: <strong>{currentPlayer.name}</strong></p>
    <Dice onRoll={handleRoll} />
  </div>
)}

       {/*RESET GAME BUTTON */}
      <button onClick={handleReset} className="reset-btn">
        Reset Game
      </button>
    </div>
    
  )
}

export default App
