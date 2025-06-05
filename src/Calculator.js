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

function Calculator() {
  //hook for Calculator's Screen manipulation
  const [screenValue, setScreenValue] = useState(""); 
  //state to track if result was just shown after pressing the evaluation button
  const [resultShown,setResultShown]=useState(false);
  //Array of operator values
  const operatorValues =['+', '-', '*', '/', 'C', '=', "."];

  //Creates an array of all buttons of the calculator
  const buttons = [ 
    //Creates an array of numbers[0,1,...,9]
    ...Array.from({length:10} , (_,index)=>({type:'number', value: index})),
    // recreates the array of opperators using 
    ...operatorValues.map(operator=>({type:'operator', value: operator}))
  ];

  

  // function to handle operator logic
  const handleOperator = (operator)=>{
     // Reset resultShown when operator is pressed after evaluation
    if (resultShown) {
      setResultShown(false);
    }
    setScreenValue((existingValue)=>{
      if(existingValue===''){
        //if screen is empty allow only minus at the start
        return operator==='-'?'-':'';
      }

      const lastChar = existingValue.slice(-1);

      //prevent double operators
      if('+-*/'.includes(lastChar)){
        return existingValue;
      }
      //otherwise safe to append the operator
      return existingValue+ operator;
    });
  };

  //excecutes operation according to what the operator is
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

  return (
    <div className="calculator-container">
      <CalculatorScreen className="calculator-screen" value={screenValue} />
      <div className="button-grid">

        {/*Creates Buttons using map function*/} 
        {buttons.map((btn,index)=>(
          <Button 
          key={index} 
          value={btn.value} 
          className={getButtonClass(btn)}
          onClick={ 
            btn.type === 'number'
            ? (value) => setScreenValue(existingValue=>{
              if (resultShown) {
                setResultShown(false)//reset 
                return value.toString();//start new calculation
              }
              return existingValue + value.toString();
            })
            : (value) => handleOperatorClick(value)
          } 
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;