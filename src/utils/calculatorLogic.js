 //parse expression before evaluating
 const tokenise = expression => {
  const result = [];
  let current = '';
  
  for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      
      if ('+-*/'.includes(char)) {
          if (current) {
              result.push(current);
              current = '';
          }
          result.push(char);
      } else {
          current += char;
      }
  }
  
  if (current) {
      result.push(current);
  }
  
  console.log(`Tokenizing "${expression}" ->`, result);
  return result;
}

  //Division or Mulrtiplication method used in evaluateExpression
  const processMulDiv= expressionParts =>{
    const result= [];
    let i=0;

    while(i< expressionParts.length){
      const expressionPart = expressionParts[i];

      if (expressionPart === '*' || expressionPart === '/'){
        const prev=parseFloat(result.pop())
        const next=parseFloat(expressionParts[++i]);
        const value = expressionPart === '*'? prev * next : prev / next;
        result.push(value.toString());
      }else{
        result.push(expressionPart)
      }
      i++;
    }
    return result;
  };

  //Addition and subtraction method used in evaluateExpression
  const processAddSub = highPrecedenceProcessed => {
    return highPrecedenceProcessed.reduce((runninTotal, currentItem, index) => {
      if (currentItem ==='+'){
        return runninTotal + Number(highPrecedenceProcessed[index+1]);
      }else if (currentItem ==='-'){
        return runninTotal - Number(highPrecedenceProcessed[index+1]);
      }else if(index ===0){
        return Number(currentItem);//first number
      }else{
        return runninTotal;
      }  
    },0);
  }
  
  //safe evaluation of the screens exprassion
  const evaluateExpression = expression =>{
    const expressionParts = tokenise(expression);
    //handle * and / first
    const highPrecedenceProcessed = processMulDiv(expressionParts)
    //handle + and - 
    const result = processAddSub(highPrecedenceProcessed);
    //return final result as a number 
    return result;
  };

  export { tokenise, processMulDiv, processAddSub, evaluateExpression };