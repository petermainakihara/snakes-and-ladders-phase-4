import { snakes, ladders } from '../data/boardData'

// Returns new position after applying snakes or ladders
export function resolveSnakesAndLadders(pos) {
  if (ladders[pos]) return ladders[pos]
  if (snakes[pos]) return snakes[pos]
  return pos
}
