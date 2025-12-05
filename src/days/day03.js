function parse(raw) {
  const lines = raw.split('\n');
  return lines;
}

function maxPairValue(bank) {
  let best = 0;
  const length = bank.length;

  for (let i = 0; i < length - 1; i++) {
    const tens = Number(bank[i]);
    for (let j = i + 1; j < length; j++) {
      const ones = Number(bank[j]);
      const value = tens * 10 + ones;
      if (value > best) best = value;
    }
  }

  return best;
}

export function part1(rawInput) {
  const data = parse(rawInput);
  let joltage = 0;
  
  for (const bank of data) {
    joltage += maxPairValue(bank);
  }
  return joltage;
}

function getBest(bank, bestString = "", startIndex = 0, maxLength = 12) {
  const length = bank.length;

  if (bestString.length === maxLength) {
    return bestString;
  }

  const remainingToPick = maxLength - bestString.length;
  const remainingAfterThis = remainingToPick - 1;

  const maxIndex = length - 1 - remainingAfterThis;

  let bestIndex = startIndex;
  for (let i = startIndex + 1; i <= maxIndex; i++) {
    if (bank[i] > bank[bestIndex]) {
      bestIndex = i;
    }
  }

  const nextBestString = bestString + bank[bestIndex];

  return getBest(bank, nextBestString, bestIndex + 1, maxLength);
}

export function part2(rawInput) {
  const data = parse(rawInput);
  let joltage = 0;
  
  for (const bank of data) {
    joltage += Number(getBest(bank));
  }
  return joltage;
}