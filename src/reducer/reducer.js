import {dropDisc, reset} from '../components/Utils';
import { COLUMN, ROW } from '../components/GameSize';

export default function reducer(state, action) {
  switch (action.type) {
    case 'fill_cell':
      // console.log(action.i);

      if (state.cells[action.i] !== 'white') {
        return state;
      }

      if (state.winner !== null) {
        return state;
      }

      const newCells = [...state.cells];
      let addMove = state.countMove;
      addMove++;
      let id = dropDisc(action.i, state.cells);
      newCells[id] = state.player;

      console.log(newCells);

      // if (state.countMove > 1) {
      let didSomeOneWin = checkColumn(newCells);
      // let didSomeOneWin = checkColumn(newCells);
      // console.log(didSomeOneWin);
      // // }

      return {
        ...state,
        cells: newCells,
        player: state.player === 'red' ? 'green' : 'red',
        countMove: addMove,
        color: state.color === 'white' ? state.player : 'white',
        winner: didSomeOneWin
      };

    case 'reset_game':
      let resetGame = reset(state);
      return {
        ...state,
        cells: resetGame.cells,
        player: resetGame.player,
        countMove: resetGame.countMove,
        winner: resetGame.winner
      };

    default:
      return state;
  }
}



function checkColumn(cells) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (cells[row * 7 + col] !== 'white') {
        if (
          cells[row * 7 + col] === cells[(row + 1) * 7 + col] &&
          cells[row * 7 + col] === cells[(row + 2) * 7 + col] &&
          cells[row * 7 + col] === cells[(row + 3) * 7 + col]
        ) {
          console.log(cells[row * 7 + col], 'WINNER');
          return cells[row * 7 + col];
        }
      }
    }
  }
  return null;
}


