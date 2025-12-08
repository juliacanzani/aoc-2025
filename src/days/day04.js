function parse(raw) {
  const lines = raw.split('\n');
  return lines;
}

/*
* In this puzzle I need rolling data from 3 rows `r` of input at once and rolling data from i + 1 and i - 1 as well
* `accessibleRollCount` gets updated when the value of i is '@' and fewer than 4 '@' appear in the following slots: 
* r-1[i-1], r-1[i], r-1[i+1]
*   r[i-1],           r[i+1]
* r+1[i-1], r+1[i], r+1[i+1]
* 3 of these values will be empty in the following circumstances
* r === 0 (first row of data)
* r === data.length - 1 (last row of data)
* i === 0 (first column)
* i === row.length - 1 (last column)
*/

function hasRoll(char) {
  return char === '@';
}

export function part1(rawInput) {
  const ROLL_SLOTS = 8;
  const data = parse(rawInput);
  let accessibleRollCount = 0;

  for (let r = 0; r < data.length; r++) {
    const prev = r > 0 ? data[r - 1] : null;
    const curr = data[r];
    const next = r < data.length - 1 ? data[r + 1] : null;

    const noPrevRow = prev ? false : true;
    const noNextRow = next ? false : true;

    for (let i = 0; i < data[r].length; i++) {
      let adjacentRollCount = ROLL_SLOTS;

      if (hasRoll(curr[i])) {
        if (noPrevRow) {
          adjacentRollCount -= 3;
        } else {
          adjacentRollCount = hasRoll(prev[i - 1]) ? adjacentRollCount : adjacentRollCount - 1;
          adjacentRollCount = hasRoll(prev[i]) ? adjacentRollCount : adjacentRollCount - 1;
          adjacentRollCount = hasRoll(prev[i + 1]) ? adjacentRollCount : adjacentRollCount - 1;
        }

        adjacentRollCount = hasRoll(curr[i - 1]) ? adjacentRollCount : adjacentRollCount - 1;
        adjacentRollCount = hasRoll(curr[i + 1]) ? adjacentRollCount : adjacentRollCount - 1;

        if (noNextRow) {
          adjacentRollCount -= 3;
        } else {
          adjacentRollCount = hasRoll(next[i - 1]) ? adjacentRollCount : adjacentRollCount - 1;
          adjacentRollCount = hasRoll(next[i]) ? adjacentRollCount : adjacentRollCount - 1;
          adjacentRollCount = hasRoll(next[i + 1]) ? adjacentRollCount : adjacentRollCount - 1;
        }

        if (adjacentRollCount < 4) {
          accessibleRollCount++;
        }
      }
    }
  }
  
  return accessibleRollCount;
}

/* Just learned about Moore neighborhood, probably should use that in part 2 if still relevant pattern */

export function part2(rawInput) {
  const data = parse(rawInput);

  return;
}