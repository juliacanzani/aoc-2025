import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readInput(day) {
  const dayStr = String(day).padStart(2, '0');
  const filename = `day${dayStr}.txt`;
  const filePath = path.resolve(__dirname, '../../inputs', filename);

  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n').trimEnd();
}