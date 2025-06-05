import React from 'react';

function Button({ value, onClick }) {
  return (
    <button onClick={()=>onClick(value)} >{/*on click informs parent which value was pressed*/}
      {value}
    </button>
  );
}

export default Button;