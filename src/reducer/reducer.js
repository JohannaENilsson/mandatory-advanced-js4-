import createArray from '../components/createArray';
import { COLUMN, ROW } from '../components/GameSize';

export default function reducer(state, action) {
  switch (action.type) {
    case 'fill_cell':
      // console.log(action.i);

      if (state.cells[action.i] !== 'white') {
        return state;
      }

      const newCells = [...state.cells]; // *****
      let addMove = state.countMove;
      // console.log(addMove);
      addMove++;
      let id = dropDisc(action.i, state.cells);
      newCells[id] = state.player; // *******
      // console.log('Spelare ', state.player);

      console.log(newCells);

      if(state.countMove > 1) {
        let didSomeOneWin = checkColumn(newCells);
        console.log(didSomeOneWin);
      }

      return {
        ...state,
        cells: newCells,
        player: state.player === 'red' ? 'green' : 'red',
        countMove: addMove,
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

function checkColumn(cells){
  for(let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (cells[row * 7 + col] !== "white") {
        if (cells[row * 7 + col] === cells[(row + 1) * 7 + col] && cells[row * 7 + col] === cells[(row + 2) * 7 + col] && cells[row * 7 + col] === cells[(row + 3) * 7 + col]) {
          console.log(cells[row * 7 + col], "WINNER");
        }
      }
    }
  }

  /*for(let x = 0; x < cells.length; x+=7){
    // console.log(cells[x]);
    if(cells[x] === player && cells[x + 7] === player && cells[x + 14 ] === player  && cells[x + 21] === player){
      console.log('Winner is ', player);
    }
  }*/
  


  //console.log(cells[cellIdx] === player);

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
