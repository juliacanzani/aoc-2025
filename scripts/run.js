import path from 'node:path';
import { readInput } from '../src/utils/readInput.js';

const args = process.argv.slice(2);

// Usage: npm run day -- 1 1 [example]
// arg0 = day, arg1 = part
const day = Number(args[0] || 1);
const part = Number(args[1] || 1);

async function main() {
  const dayStr = String(day).padStart(2, '0');
  const modulePath = path.join('../src/days', `day${dayStr}.js`);

  const { part1, part2 } = await import(modulePath);
  const raw = readInput(day);

  const fn = part === 1 ? part1 : part2;
  if (typeof fn !== 'function') {
    console.error(`Part ${part} not implemented for day ${dayStr}`);
    process.exit(1);
  }

  console.time(`⏱️ Runtime day${dayStr}-part${part}`);
  const result = fn(raw);
  console.timeEnd(`⏱️ Runtime day${dayStr}-part${part}`);

  console.log(`✨Returned value:      ${String(result)}`);
}

main();