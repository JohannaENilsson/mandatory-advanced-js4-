export default function reducer(state, action) {
  switch (action.type) {
    case 'create_board':

    case 'player':
     console.log(state.player);
     let newplayer = [...state.player];
      
      if (state.player === 'One') {
        newplayer = 'Two';
        return { ...state,
            player: newplayer};
      } else if (state.player === 'Two') {
        newplayer = 'One';
        return { ...state,
            player: newplayer };
      }


    case 'reset_game':

    default:
      return state;
  }
}
