import createArray from '../components/createArray';

export default function reducer(state, action) {
  switch (action.type) {
    case 'fill_cell':
        console.log(action.i);
        const newCells = [...state.cells];
        newCells[action.i] = state.color;
        return {
            ...state,
            cells: newCells
        };

    case 'player':
     console.log(state.player);
     let newplayer = [...state.player, ...state.color];
      
      if (state.player === 'One') {
        newplayer = 'Two';
        return { ...state,
            player: newplayer,
            color: 'red'};
      } else if (state.player === 'Two') {
        newplayer = 'One';
        return { ...state,
            player: newplayer,
        color: 'green' };
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
