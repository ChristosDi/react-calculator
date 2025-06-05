import React from 'react';

function CalculatorScreen({ value }) {
  return (
    <input
      type="text"
      placeholder="0"
      value={value}
      readOnly
    />
  );
}

export default CalculatorScreen;