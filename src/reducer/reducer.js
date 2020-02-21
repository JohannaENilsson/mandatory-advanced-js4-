import createArray from '../components/createArray';
import { COLUMN } from '../components/GameSize';

export default function reducer(state, action) {
  switch (action.type) {
    case 'fill_cell':
      console.log(action.i);

      if (state.cells[action.i] !== 'white') {
        return state;
      }

      const newCells = [...state.cells]; // *****
      let id = dropDisc(action.i, state.cells);
      newCells[id] = state.player; // *******
      console.log('Spelare ', state.player);

      return {
        ...state,
        cells: newCells,
        player: state.player === 'red' ? 'green' : 'red'
      };

    case 'reset_game':
      return {
        ...state,
        cells: createArray()
      };

    default:
      return state;
  }
}

function dropDisc(cellIdx, cells) {
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
