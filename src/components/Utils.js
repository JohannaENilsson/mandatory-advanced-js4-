import { ROW, COLUMN } from './GameSize';

export function createArray() {
  const cells = Array(COLUMN * ROW).fill('white');
  return cells;
}

export function dropDisc(cellIdx, cells) {
  let currentRow = cellIdx;
  let numberOfCellsInCurrentColumn = COLUMN;

  if (cells[cellIdx] === 'white') {
    while (numberOfCellsInCurrentColumn >= 0) {
      currentRow += 7;
      if (cells[currentRow] !== 'white') {
        return currentRow - 7;
      }
    }
  }
}

export function reset({ cells, player, countMove, winner }) {
  cells = createArray();
  player = 'green';
  countMove = 0;
  winner = null;
  return { cells, player, countMove, winner };
}
