import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Board from './components/board/board'
import { setup_board, check_snake_or_ladder } from './components/data/snakesAndLadders'

function App() {
  const { snakes, ladders } = setup_board();

  return (
    console.log("hi")
  )
}

export default App
