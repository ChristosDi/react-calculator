const getButtonClass = value => {
    if (!isNaN(value)) {
        // Special grid class for zero
        return value === 0
            ? 'button-num button-num-0 button-zero'
            : `button-num button-num-${value}`;
    }
    if (value === 'C') return 'button-clear';
    if (value === '=') return 'button-equals';
    if (value === '.') return 'button-dot';
    // Remove special characters for CSS class safety (e.g., '/' -> 'divide')
    if (value === '/') return 'button-operator button-divide';
    if (value === '*') return 'button-operator button-multiply';
    if (value === '+') return 'button-operator button-plus';
    if (value === '-') return 'button-operator button-minus';
    return `button-operator button-operator-${value}`;
};
export default getButtonClass;