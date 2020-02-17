import React from 'react';

export default function Grid({ cells }) {

  return (
    <>
      {cells.map((cell, i) => {
        return <div key={i} className='Cell'>{cell}{i}</div>;
      })}
</>
  );
}


