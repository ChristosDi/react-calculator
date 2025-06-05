const getButtonClass = value =>{
    if (!isNaN(value)) {
        return `button-num button-num-${value}`; // e.g. button-num button-num-7
        }
        if (value === 'C') return 'button-clear';
        if (value === '=') return 'button-equals';
        if (value === '.') return 'button-dot';
        return `button-operator button-operator-${value}`; // e.g. button-operator button-operator-divide
}


export default getButtonClass;