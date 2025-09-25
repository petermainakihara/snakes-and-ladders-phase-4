//snake mappings key = start(head) value = end(tail)
const snakes = {
  16: 6,
  48: 26,
  49: 11,
  62: 19,
  87: 24,
  93: 73,
  98: 78,
};

//ladders mappings key = start(bottom) value = end(top)
const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  71: 91,
  80: 100,
};

export function setup_board() {
  return { snakes, ladders };
}

// check_snake_or_ladder: takes a position and returns the new position
export const check_snake_or_ladder = (position, snakes, ladders) => {
  if (snakes[position]) {
    console.log(`🐍 Bitten! Go down from ${position} to ${snakes[position]}`);
    return snakes[position];
  }
  if (ladders[position]) {
    console.log(`🪜 Climbed! Go up from ${position} to ${ladders[position]}`);
    return ladders[position];
  }
  return position; // No snake or ladder
};
