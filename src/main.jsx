import React from 'react';
import ReactDOM from 'react-dom/client';
import GameState from "./GameState"; // If it's directly in src/


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameState />
  </React.StrictMode>
);
