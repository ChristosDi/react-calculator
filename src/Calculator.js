import React, { useState } from 'react';
import CalculatorScreen from './CalculatorScreen';
import Button from './Button';
import {
  tokenise,
  processMulDiv,
  processAddSub,
  evaluateExpression} from './utils/calculatorLogic'
import getButtonClass from './utils/getButtonClass';
import './Calculator.css';
import handleNumberInput from './utils/handleNumberInput.js';


/**
 * Calculator React Functional Component
 * 
 * This component renders a fully functional calculator interface using React hooks. 
 * Users can perform basic arithmetic operations with support for decimals and clear/reset functionality.
 * The component prevents invalid calculator inputs such as multiple leading zeros and consecutive operators.
 * 
 * Features:
 * - Numeric and operator button rendering using dynamic mapping.
 * - Proper screen display management and input sanitization.
 * - No leading zeroes allowed (except after decimal), and no multiple operators in sequence.
 * - Evaluates mathematical expressions safely.
 * - iPhone-like visual styling supported via CSS classes.
 * 
 * @component
 * @returns {JSX.Element} The calculator user interface.
 */
function Calculator() {
  // State for the calculator display value
  const [screenValue, setScreenValue] = useState(""); 
  // State to track if a result was just shown after pressing "="
  const [resultShown,setResultShown]=useState(false);

  // Operator button values (includes dot for decimal and C for clear)
  const operatorValues =['+', '-', '*', '/', 'C', '=', "."];

  // All calculator buttons as objects with {type, value}
  const buttons = [ 
    //Creates an array of numbers[0,1,...,9]
    ...Array.from({length:10} , (_,index)=>({type:'number', value: index})),
    // recreates the array of opperators using 
    ...operatorValues.map(operator=>({type:'operator', value: operator}))
  ];

  

  /**
   * Handles appending operators to the display, 
   * preventing multiple sequential operators or invalid placements.
   * 
   * @param {string} operator - The operator value to append.
   */
  const handleOperator = (operator)=>{
    // Reset resultShown when operator is pressed after evaluation
    if (resultShown) {
      setResultShown(false);
    }
    setScreenValue((existingValue)=>{
      if(existingValue===''){
        // Only allow minus as the first operator (for negative numbers)
        return operator==='-'?'-':'';
      }

      const lastChar = existingValue.slice(-1);
      //prevent double operators or operator after dot
      if('+-*/.'.includes(lastChar)){
        return existingValue;
      }
      // Append operator if valid
      return existingValue+ operator;
    });
  };

  /**
   * Handles operator button clicks, including clear (C) and evaluation (=).
   * 
   * @param {string} operator - The operator or action pressed.
   */
  const handleOperatorClick = (operator)=>{
    if(operator=='C'){
      //clear command, sets screen to 0
      setScreenValue('');
    }else if(operator==='='){
      // evaluates the current screenValue as a math expression
     setScreenValue((existingValue)=>{
      try{
        const result = evaluateExpression(screenValue);
        //shows the result has been shown
        setResultShown(true);
        setScreenValue(result.toString());
      }catch (error){
        setScreenValue("Error");
      }
     });
    }else{
      // appends operator like + - * /
      handleOperator(operator);
    }
  }
  // JSX Render 
  return (
    <div className="calculator-container">
      {/* Calculator Display */}
      <CalculatorScreen className="calculator-screen" value={screenValue} />
      <div className="button-grid">

        {/* Render buttons using mapping */}
        <div className="calculator-buttons">
          {buttons.map((btn, index) => (
            <Button
              key={index}
              value={btn.value}
              className={getButtonClass(btn.value)}
              onClick={
                btn.type === 'number'
                  ? (value) => setScreenValue(existingValue => {
                      // Start new calculation after evaluation
                      if (resultShown) {
                        setResultShown(false);
                        return value.toString();
                      }
                      return handleNumberInput(existingValue, value);
                    })
                  : (value) => handleOperatorClick(value)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;