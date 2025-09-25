import React from 'react'

const Dice = ({ onRoll }) => {
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1
    onRoll(roll)
  }

  return (
    <button className="dice-button" onClick={rollDice}>
      Roll Dice 🎲
    </button>
  )
}

export default Dice
