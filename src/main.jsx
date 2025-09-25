import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GameState from './GameState';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GameState/>
  </StrictMode>,
)
