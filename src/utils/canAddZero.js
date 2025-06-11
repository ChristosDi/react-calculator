function canAddZero(existingValue) {
  if (existingValue === "") return true; // first zero
  if (existingValue.slice(-1) === ".") return true; // after decimal
  const tokens = existingValue.split(/([+\-*/])/);
  const lastToken = tokens[tokens.length - 1];
  if (lastToken === "0" && tokens.length === 1) return false; // prevent "00" at start
  if (/^[+\-*/]0$/.test(existingValue.slice(-2))) return false; // prevent operator+00
  return true;
}

export default canAddZero;