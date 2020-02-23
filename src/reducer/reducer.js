import { dropDisc, reset } from '../components/Utils';

export default function reducer(state, action) {
  switch (action.type) {
    case 'fill_cell':
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

      // if (state.countMove > 1) {

      let didSomeOneWin = checkIfSomeOneWon(newCells, state.player);

      // console.log(didSomeOneWin);
      // // }
      if (didSomeOneWin === -1) {
        console.log('it´s a tie');
      }

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

function checkIfSomeOneWon(cells, player) {
  if (
    checkColumn(cells) ||
    checkRow(cells) ||
    checkDiagonalLeft(cells) ||
    checkDiagonalRight(cells)
  ) {
    return player;
  } else if (cells.filter(item => item === 'white').length > 0) {
    return null;
  }

  return 'It´s a tie'; // its a tie
}

function checkDiagonalLeft(cells) {
  for (let row = 0; row < 3; row++) {
    const rowIdx = row * 7;

    for (let col = 6; col > 2; col--) {
      const currentIdx = rowIdx + col;
      const currentCell = cells[currentIdx];
      console.log('row', row);

      if (currentCell !== 'white') {
        let fourInARow = true;

        for (let rowAhead = 1; rowAhead < 4; rowAhead++) {
          // kollar de kommande tre raderna.

          const nextIdx = currentIdx + rowAhead * 6; // nuvarande rad + framtida raden * 6 (vi vill gå ett steg tillbaka)
          const nextCell = cells[nextIdx];

          console.log(`row ${row} col ${col} => ${nextIdx}`);

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
      const currentIdx = rowIdx + col;
      const currentCell = cells[currentIdx];
      if (currentCell !== 'white') {
        let fourInARow = true;
        for (let rowAhead = 1; rowAhead < 4; rowAhead++) {
          const nextIdx = currentIdx + rowAhead * 8; //(col + rowAhead) * 7 + rowAhead;

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
