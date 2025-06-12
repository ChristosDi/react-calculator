import canAddZero from './canAddZero';

/**
 * Determines what the new value should be when a number is pressed,
 * taking into account leading zeros, operator-zero patterns, and calculator rules.
 *
 * @param {string} existingValue - The current display value.
 * @param {number} value - The number pressed.
 * @returns {string} The new display value.
 */
function handleNumberInput(existingValue, value) {
    // Case 1: No leading zero at start
    if (existingValue === "0" && !isNaN(value) && value !== 0) {
      return value.toString();
    }
    // Case 2: No leading zero after operator
    const lastOperatorIndex = Math.max(
      existingValue.lastIndexOf("+"),
      existingValue.lastIndexOf("-"),
      existingValue.lastIndexOf("*"),
      existingValue.lastIndexOf("/")
    );
    if (
      lastOperatorIndex !== -1 &&
      existingValue.length > lastOperatorIndex + 1 &&
      existingValue.slice(lastOperatorIndex + 1) === "0" &&
      !isNaN(value) && value !== 0
    ) {
      return existingValue.slice(0, lastOperatorIndex + 1) + value.toString();
    }
    // Other zero validation
    if (!canAddZero(existingValue) && value === 0) {
      return existingValue;
    }
    // Default case: append
    return existingValue + value.toString();
  }
  
  export default handleNumberInput;