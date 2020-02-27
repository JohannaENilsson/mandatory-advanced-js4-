import React from 'react';

export default function Grid({ cells, onClickGame }) {
  function onClick(index) {
    onClickGame(index);
  }

  const renderCells = cells.map((cell, i) => {
    return (
      <div
        key={i}
        className='Cell'
        onClick={() => onClick(i)}
        style={{ backgroundColor: cell }}
      ></div>
    );
  });

  return <>{renderCells}</>;
}