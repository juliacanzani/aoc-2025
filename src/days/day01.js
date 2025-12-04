function parse(raw) {
  const lines = raw.split('\n');
  return lines;
}

const DIAL_SIZE = 100;
const DIAL_START = 50;

// position: current dial value (0–99)
// dir: 'L' or 'R'
// steps: integer >= 0
function move(position, dir, steps) {
  const normalized = steps % DIAL_SIZE;

  if (dir === 'R') {
    return (position + normalized) % DIAL_SIZE;
  } else if (dir === 'L') {
    return (position - normalized + DIAL_SIZE) % DIAL_SIZE;
  } else {
    throw new Error(`Unknown direction: ${dir}`);
  }
}

export function part1(rawInput) {
  const data = parse(rawInput);
  
  let currentValue = DIAL_START;
  let zeroCount = currentValue === 0 ? 1 : 0;
  
  for (const instruction of data) {
    const dir = instruction[0];
    const stepCount = Number(instruction.slice(1));

    currentValue = move(currentValue, dir, stepCount);
    
    if(currentValue === 0) {
      zeroCount++;
    }
  }

  return zeroCount;
}

export function part2(rawInput) {
  const data = parse(rawInput);
  
  let currentValue = DIAL_START;
  let zeroCount = 0;
  
  for (const instruction of data) {
    const dir = instruction[0];
    const stepCount = Number(instruction.slice(1));

    const base =
      dir === "L"
        ? (DIAL_SIZE - currentValue) % DIAL_SIZE
        : currentValue;

    zeroCount += Math.floor((base + stepCount) / DIAL_SIZE);
    currentValue = move(currentValue, dir, stepCount);
  }

  return zeroCount;
}