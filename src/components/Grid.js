import React from 'react';

export default function Grid({ cells, onClickGame }) {
  function onClick(index) {
    onClickGame(index);
  }

  return (
    <>
      {cells.map((cell, i) => {
        return (
          <div key={i} className='Cell' onClick={() => onClick(i)}>
            {cell}
            {i}
          </div>
        );
      })}
    </>
  );
}
