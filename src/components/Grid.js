import React from 'react';

export default function Grid({ cells, onClickGame, onClickPlayer }) {
  function onClick(index) {
    onClickGame(index);
    onClickPlayer(index);
  }

  return (
    <>
      {cells.map((cell, i) => {
        return (
          <div
            key={i}
            className='Cell'
            onClick={() => onClick(i)}
            style={{ backgroundColor: cell }}
          ></div>
        );
      })}
    </>
  );
}
