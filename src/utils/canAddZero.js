/**
 * Determines whether a zero ("0") can be appended to the calculator display,
 * enforcing classic calculator rules for leading zeros, including after operators.
 */
function canAddZero(existingValue) {
  if (existingValue === "") return true; // Allow a single leading zero at start
  if (existingValue.slice(-1) === ".") return true; // Allow zero after decimal point

  // Split into tokens by operator
  const tokens = existingValue.split(/([+\-*/])/);
  const lastToken = tokens[tokens.length - 1];
  const secondLastToken = tokens.length > 1 ? tokens[tokens.length - 2] : "";

  // Prevent multiple zeros at start: "00"
  if (lastToken === "0" && tokens.length === 1) return false;

  // Prevent multiple zeros after operator: "+00", "*00", etc
  if (
    /^[+\-*/]0$/.test(existingValue.slice(-2)) || // covers "+0", "*0", etc.
    (secondLastToken && /[+\-*/]/.test(secondLastToken) && lastToken === "0")
  ) {
    return false;
  }

  return true;
}

export default canAddZero;