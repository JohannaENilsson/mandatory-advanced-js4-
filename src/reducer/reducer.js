import { dropDisc, reset } from '../components/Utils';
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

      // console.log(newCells);

      // if (state.countMove > 1) {
      // let didSomeOneWin = checkColumn(newCells);
      // let didSomeOneWin = checkRowcheckRow(newCells);
      // let didSomeOneWin = checkDiagonalRight(newCells);
      let didSomeOneWin = checkDiagonalLeft(newCells);
      // console.log(didSomeOneWin);
      // // }

      return {
        ...state,
        cells: newCells,
        player: state.player === 'red' ? 'green' : 'red',
        countMove: addMove,
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

function checkDiagonalLeft(cells) {
  for (let row = 0; row < 3; row++) {
    const rowIdx = row * 7;

    for (let col = 6; col > 2; col--) {
      const currentCell = cells[rowIdx + col];
      if (currentCell !== 'white') {
        let fourInARow = true;
        for (let rowAhead = 1; rowAhead < 4; rowAhead++) {
          // kollar de kommande tre raderna.
          const nextIdx = currentCell + rowAhead * 6; // nuvarande rad + framtida raden * 6 (vi vill gå ett steg tillbaka)
          const nextCell = cells[nextIdx];

          if (nextCell === 'white' || currentCell !== nextCell) {
            fourInARow = false;
            break; // avbryter denna loopen och börjar kolla nästa.
          }
        }

        if (fourInARow) {
          return currentCell;
        }
      }
    }
  }

  return null;
}

function checkDiagonalRight(cells) {
  for (let row = 0; row < 3; row++) {
    const rowIdx = row * 7;

    for (let col = 0; col < 4; col++) {
      const currentCell = cells[rowIdx + col];
      if (currentCell !== 'white') {
        let fourInARow = true;
        for (let rowAhead = 1; rowAhead < 4; rowAhead++) {
          const nextIdx = currentCell + rowAhead * 8; //(col + rowAhead) * 7 + rowAhead;

          const nextCell = cells[nextIdx];

          if (nextCell === 'white' || currentCell !== nextCell) {
            fourInARow = false;
            break;
          }
        }

        if (fourInARow) {
          return currentCell;
        }
      }
    }
  }

  return null;
}

function checkRow(cells) {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      const currentCellIdx = row * 7 + col;
      const currentCell = cells[row * 7 + col];
      if (currentCell !== 'white') {
        if (
          currentCell === cells[currentCellIdx + 1] &&
          currentCell === cells[currentCellIdx + 2] &&
          currentCell === cells[currentCellIdx + 3]
        ) {
          return currentCell;
        }
      }
    }
  }
  return null;
}

function checkColumn(cells) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      const currentIdx = row * 7 + col;
      if (cells[currentIdx] !== 'white') {
        if (
          cells[currentIdx] === cells[currentIdx + 7] &&
          cells[currentIdx] === cells[currentIdx + 14] &&
          cells[currentIdx] === cells[currentIdx + 21]
        ) {
          return cells[row * 7 + col];
        }
      }
    }
  }
  return null;
}
