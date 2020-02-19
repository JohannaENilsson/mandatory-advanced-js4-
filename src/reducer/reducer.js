import createArray from '../components/createArray';

export default function reducer(state, action) {
  switch (action.type) {
    case 'fill_cell':
      // console.log(action.i);
      const newCells = [...state.cells];
      let id = dropingDisc(action.i, state.cells);
      newCells[id] = state.color;
      return {
        ...state,
        cells: newCells
      };

    case 'player':
      //  console.log(state.player);
      let newplayer = [...state.player, ...state.color];

      if (state.player === 'One') {
        newplayer = 'Two';
        return { ...state, player: newplayer, color: 'red' };
      } else if (state.player === 'Two') {
        newplayer = 'One';
        return { ...state, player: newplayer, color: 'green' };
      }

    case 'reset_game':
      return {
        ...state,
        cells: createArray()
      };

    default:
      return state;
  }
}

function dropingDisc(i, cell) {
  let currentRow = i;
  let row = 6;
  console.log(currentRow);

  while (row >= 0) {
    currentRow += 7;
    console.log('index is white ', cell[currentRow] !== 'white');
    if (cell[currentRow] !== 'white') {
      return currentRow - 7;
    }
    row--;
  }
}
