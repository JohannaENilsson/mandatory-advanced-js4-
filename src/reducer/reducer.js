import { dropDisc, reset } from '../components/Utils';
import { checkIfSomeOneWon } from '../components/checkIfSomeOneWon';

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

      let didSomeOneWin = checkIfSomeOneWon(newCells, state.player);

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