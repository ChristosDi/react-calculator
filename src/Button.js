import React from 'react';
/**
 * @component
 * @param {*} param0 
 * @returns 
 */
function Button({ value, onClick, className }) {
  return (
    <button className={className} onClick={()=>onClick(value)} >{/*on click informs parent which value was pressed*/}
      {value}
    </button>
  );
}

export default Button;