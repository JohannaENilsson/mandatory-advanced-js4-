import React, { useReducer } from 'react';
import Grid from './components/Grid';
import styled from 'styled-components';
import reducer from './reducer/reducer';
import {createArray} from './components/Utils';

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    cells: createArray(),
    player: 'green',
    countMove: 0,
    winner: null
  });
  return (
    <Styles>
      <h1>Connect Four</h1>
      {state.winner && <h2>Winner is {state.winner}</h2>}
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
    </Styles>
  );
}

const Styles = styled.div`
  width: 100vw;
  background-color: pink;
  text-align: center;

  .App {
    display: flex;
    justify-content: center;
  }

  h1 {
    padding: 30px;
    margin-block-end: 0px;
    margin-block-start: 0;
  }

  .Board {
    background-color: blue;
    width: 550px;
    height: 480px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
  }

  .Cell {
    box-sizing: border-box;
    border-radius: 100%;
    height: 70px;
    width: 70px;
    text-align: center;
    line-height: 70px;
    cursor: pointer;
  }
`;
