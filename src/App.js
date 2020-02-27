import React, { useReducer } from 'react';
import Grid from './components/Grid';
import reducer from './reducer/reducer';
import { createArray } from './components/Utils';
import './App.css';

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    cells: createArray(),
    player: 'green',
    countMove: 0,
    winner: null
  });
  return (
    <>
      {state.winner ? <h1 style={{ color: state.winner}}>Winner is {state.winner}</h1> : <h1>Connect Four</h1>}

      <div className='App'>
        <div className='Board'>
          <Grid
            cells={state.cells}
            onClickGame={i => dispatch({ type: 'fill_cell', i })}
          />
        </div>
      </div>
      {state.winner && (
        <button
          onClick={e => {
            e.preventDefault();
            dispatch({ type: 'reset_game' });
          }}
        >
          Reset
        </button>
      )}
    </>
  );
}
