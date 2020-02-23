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

      // console.log(newCells);

      // if (state.countMove > 1) {
      // let didSomeOneWin = checkColumn(newCells);
      // let didSomeOneWin = checkRowcheckRow(newCells);
      let didSomeOneWin = checkDiagonal(newCells);
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

// function checkRow(cells){
//   let rowNr=0;
//   let colNr=0;
//   for(let row = 0; row < 7; row++){
//     console.log('Row ', rowNr++);
//     for(let col = 0; col < 4; col++){
//       console.log(colNr++);
//       if(cells[row * 7 + col] !== 'white'){
//         console.log('nu');
//       }
//     }
//   }
//   return null;
// }


function checkDiagonal(cells) {
  // console.log('>> checkDiagonal');
  for (let row = 0; row < 3; row++) {
    const rowIdx = row * 7;

    // for (let col = rowIdx; col < (rowIdx + 4); col++) {
    for (let col = 0; col < 4; col++) {
    
      console.log(`Checking for winner on row: ${row}, col: ${col} => ${rowIdx + col}`);
      //only loop to middle
      // const currentCell = cells[col];
      const currentCell = cells[rowIdx + col];
      if (currentCell !== 'white') {
        console.log('checking diagonal winner..');
        
        let fourInARow = true;
        for (let rowAhead = 1; rowAhead < 4; rowAhead++) {
          // rowIdx + col == 17
          // (rowIdx + col) + 7 + 1 = 25 
          // (rowIdx + col) + 7 + 1 = 33
          // (rowIdx + col) + 7 + 1 = 41


          const nextIdx = rowIdx + col + (rowAhead * 8); //(col + rowAhead) * 7 + rowAhead;
          console.log(`Checking (${col} + ${rowAhead}) * 7 + ${rowAhead} =>  ${nextIdx}`);
          // const nextIdx = (col + rowAhead) + rowAhead;
          const nextCell = cells[nextIdx];

          if (nextCell === 'white') {
            fourInARow = false;
          }

          console.log(`Checking for winner on row: ${row}, col: ${col} => ${nextIdx}`);
        }
        console.log('FOUND FOR IN A ROW? => ', fourInARow);

        if(fourInARow) {
          console.log("FOUND A WINNER, starting on: ", currentCell);
          return currentCell;
        }
      }
    }
  }

  return null;

  // for (let row = 0; row < 6; row++) {
  //   for (let col = 0; col < 4; col++) {
  //     console.log(`row: ${row}, col: ${col} => ${row * 7 + col}`);
  //     const currentCellIdx = (row * 7 + col);
  //     const currentCell = cells[row * 7 + col];
  //     if (currentCell !== 'white') {
  //       if (
  //         currentCell === cells[currentCellIdx+1] &&
  //         currentCell === cells[currentCellIdx+2] &&
  //         currentCell === cells[currentCellIdx+3]
  //       ) {
  //         console.log(currentCell, 'WINNER');
  //         return currentCell;
  //       }
  //     }
  //   }
  // }
  // return null;
}

function checkRow(cells) {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      console.log(`row: ${row}, col: ${col} => ${row * 7 + col}`);
      const currentCellIdx = (row * 7 + col);
      const currentCell = cells[row * 7 + col];
      if (currentCell !== 'white') {
        if (
          currentCell === cells[currentCellIdx+1] &&
          currentCell === cells[currentCellIdx+2] &&
          currentCell === cells[currentCellIdx+3]
        ) {
          console.log(currentCell, 'WINNER');
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
      console.log(`row: ${row}, col: ${col} => ${row * 7 + col}`);
      const currentIdx = row * 7 + col;
      if (cells[currentIdx] !== 'white') {
        if (
          cells[currentIdx] === cells[currentIdx + 7] &&
          cells[currentIdx] === cells[currentIdx + 14] &&
          cells[currentIdx] === cells[currentIdx + 21]
          // cells[currentIdx] === cells[(row + 1) * 7 + col] &&
          // cells[currentIdx] === cells[(row + 2) * 7 + col] &&
          // cells[currentIdx] === cells[(row + 3) * 7 + col]
        ) {
          console.log(cells[currentIdx], 'WINNER');
          return cells[row * 7 + col];
        }
      }
    }
  }
  return null;
}


