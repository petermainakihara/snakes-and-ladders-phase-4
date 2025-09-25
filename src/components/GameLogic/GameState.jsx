// Game state logic (3 players + turn rotation)

export const initialGameState = {
  players: [
    { id: 1, name: 'Player 1', position: 1, color: 'red' },
    { id: 2, name: 'Player 2', position: 1, color: 'blue' },
    { id: 3, name: 'Player 3', position: 1, color: 'green' }
  ],
  currentPlayerIndex: 0,
  gameOver: false,
  winner: null
}

export function getCurrentPlayer(state) {
  return state.players[state.currentPlayerIndex]
}

export function updatePlayerPosition(state, newPosition) {
  const players = [...state.players]
  players[state.currentPlayerIndex] = {
    ...players[state.currentPlayerIndex],
    position: newPosition
  }
  return { ...state, players }
}

export function nextPlayerTurn(state) {
  const nextIndex = (state.currentPlayerIndex + 1) % state.players.length
  return { ...state, currentPlayerIndex: nextIndex }
}

export function checkWinCondition(position) {
  return position === 100
}
