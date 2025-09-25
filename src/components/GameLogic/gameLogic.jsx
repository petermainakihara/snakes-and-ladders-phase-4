import { snakes, ladders } from "../data/snakesAndLadders"

// Returns new position after applying snakes or ladders
export function resolveSnakesAndLadders(pos) {
  if (ladders[pos]) return ladders[pos]
  if (snakes[pos]) return snakes[pos]
  return pos
}

import { check_snake_or_ladder } from '../data/snakesAndLadders'

export function getNextPosition(position) {
  if (position > 100) return position - (position - 100) // bounce back
  return check_snake_or_ladder(position)
}

