//snake mappings key = start(head) value = end(tail)
export const snakes = {
  18: 1,
  56: 1,
  8: 4,
  39: 5,
  51: 6,
  26: 10,
  60: 23,
  92: 25,
  75: 28,
  54: 36,
  83: 45,
  90: 48,
  99: 63,
  97: 87,
};

//ladders mappings key = start(bottom) value = end(top)
export const ladders = {
  3: 20,
  6: 14,
  11: 28,
  15: 34,
  17: 74,
  22: 37,
  38: 59,
  49: 67,
  57: 76,
  61: 78,
  73: 86,
  81: 98,
  88: 91,
};

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

// Combine snakes and ladders into one array for rendering
export const snakesAndLadders = [
  ...Object.entries(snakes).map(([start, end]) => ({
    start: Number(start),
    end: end,
    type: 'snake'
  })),
  ...Object.entries(ladders).map(([start, end]) => ({
    start: Number(start),
    end: end,
    type: 'ladder'
  }))
]