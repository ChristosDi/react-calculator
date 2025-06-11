import React from 'react';

function CalculatorScreen({ value, className }) {
  return (
    <input
      type="text"
      className={className} 
      placeholder="0"
      value={value}
      readOnly
    />
  );
}

export default CalculatorScreen;