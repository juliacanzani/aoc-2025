function parse(raw) {
  const lines = raw.split(',');
  return lines;
}

function* idsInRange(start, end) {
  const s = Number(start);
  const e = Number(end);
  for (let n = s; n <= e; n++) yield n;
}

function isDoubleBlock(n) {
  const s = String(n);
  const len = s.length;
  if (len % 2 !== 0) return false;
  const half = len / 2;
  return s.slice(0, half) === s.slice(half);
}

function isRepeatedBlock(n, m = 1) {
  const s = String(n);
  const len = s.length;

  if (m > len / 2) return false;

  if (len % m === 0) {
    const block = s.slice(0, m);
    const k = len / m;
    if (k >= 2 && block.repeat(k) === s) {
      return true;
    }
  }

  return isRepeatedBlock(s, m + 1);
}

export function part1(rawInput) {
  const ranges = parse(rawInput);
  let sum = 0;

  for (const r of ranges) {
    const [a, b] = r.split('-');
    for (const id of idsInRange(a, b)) {
      if (isDoubleBlock(id)) sum += id;
    }
  }

  return sum;
}

export function part2(rawInput) {
  const ranges = parse(rawInput);
  let sum = 0;

  for (const r of ranges) {
    const [a, b] = r.split('-');
    for (const id of idsInRange(a, b)) {
      if (isRepeatedBlock(id)) sum += id;
    }
  }

  return sum;
}