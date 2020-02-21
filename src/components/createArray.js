import { ROW, COLUMN } from './GameSize';

export default function createArray() {
    const cells = Array(COLUMN * ROW).fill('white');
    return cells;
  }