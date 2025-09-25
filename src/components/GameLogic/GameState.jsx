//game state logic(3 players + turn rotation)

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
  //make a copy of the players array
  const players = state.players.map((player, index) => {
    if (index === state.currentPlayerIndex) {
      //copy all fields and update position
      return {
        id: player.id,
        name: player.name,
        color: player.color,
        position: newPosition
      }
    }
    return player// other player stay the same
  })
  //return a new state object, copying everything manually
  return {
    players: players,
    currentPlayerIndex: state.currentPlayerIndex,
    gameOver: state.gameOver,
    winner: state.winner
  }
}


export function nextPlayerTurn(state) {
  let nextIndex = state.currentPlayerIndex + 1
  //if we've reached the last player, go back to the first
  if (nextIndex >= state.players.length) {
    nextIndex = 0
  }
  //return a new game state with updated currentPlayerIndex
  return {
    players: state.players,
    currentPlayerIndex: nextIndex,
    gameOver: state.gameOver,
    winner: state.winner
  }
}


export function checkWinCondition(position) {
  return position === 100
}
