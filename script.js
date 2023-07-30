function updateDisplayValueDisplay(newResult, hangingOperator = '') {
    let displayValueDisplay = document.getElementById('display-value');
    displayValueDisplay.textContent = newResult + hangingOperator;
}

function updateOngoingCalculationDisplay(operand1, operand2, operator) {
    let ongoingCalculationDisplay = document.getElementById('ongoing-calculation');
    ongoingCalculationDisplay.textContent = operand1 + ' ' + operator + ' ' + operand2;
}

function calculateResult(operand1, operand2, operator) {
    switch (operator) {
        case '+':
            return +operand1 + +operand2;
        case 'x':
            return +operand1 * +operand2;
        case '-':
            return +operand1 - +operand2;
        case '÷':
            return +operand1 / +operand2;
    }
}

function deleteLast(operand1, operand2, operator) {
    // return last truthy value i.e. last filled value
    let calculationString = operand1.toString() + operator + operand2.toString();
    trimmedString = calculationString.substring(0, calculationString.length-1);
    
    if (trimmedString.indexOf(operator)>0){
        let calculationArray = trimmedString.split(operator);
        return {
            operand1 : calculationArray[0],
            operand2 : calculationArray[1],
            operator : operator,
        }
    }

    return {
        operand1 : trimmedString,
        operand2 : null,
        operator : null,        
    };
}

let del = document.getElementById('delete');
let digits = document.querySelectorAll('.digit');
let operators = document.querySelectorAll('.operator');
let clear = document.getElementById('clear');
let equals = document.getElementById('equals');
let decimalPoint = document.getElementById('point');

let operand1 = '0', operand2 = '';
let operator = '';

let displayValueDisplay = document.getElementById('display-value');
displayValueDisplay.textContent = operand1;

// for delete, put it together as a string, delete last value, split by operator symbol to split up the parts if there are parts

del.addEventListener('click', (e) => {
    let args = deleteLast(operand1, operand2, operator);
    // check condition is truthy, if it is then value is defined so assign operand to it else give value of empty
    // otherwise it comes back as undefined
    operand1 = (args.operand1) ? args.operand1 : '0';
    operand2 = (args.operand2) ? args.operand2 : '';
    operator = (args.operator) ? args.operator : '';
    updateOngoingCalculationDisplay(operand1, operand2, operator);
});

clear.addEventListener('click', (e) => {
    operand1 = '0';
    operand2 = '';
    operator = '';
    updateDisplayValueDisplay('0');
    updateOngoingCalculationDisplay('', operand2, operator);
});

digits.forEach(digit => digit.addEventListener('click', () => {
    // if operand1 is still 0, and operator is empty, overwrite 0 and continue to append
    let isOperand1Overwriteable = (operand1 === '0' && operator === '');
    let isOperand1Appendable = (operand1 && operator === '');
    if (isOperand1Overwriteable) {
        operand1 = digit.textContent;
        updateOngoingCalculationDisplay(operand1, operand2, operator);
        return;
    } else if (isOperand1Appendable) {
        operand1 += digit.textContent;
        updateOngoingCalculationDisplay(operand1, operand2, operator);
        return;
    }

    // if operand 1 is not writeable or appendable because the operator is filled then write to operand 2

    operand2 += digit.textContent;
    updateOngoingCalculationDisplay(operand1, operand2, operator);

    return;
}));

operators.forEach(operatorBtn => operatorBtn.addEventListener('click', () => {
    // check if operator is empty
    let isOperatorWriteable = operator === '';
    // all these must evaluate to true to be overwriteable
    // operand1 can be 0 which is falsy, so include it, unlike operator evaluation
    let isOperatorOverWriteable = operand2 === '' && (operand1 !== '' && operator != '');
    if (isOperatorWriteable || isOperatorOverWriteable) {
        operator = operatorBtn.textContent;
        updateOngoingCalculationDisplay(operand1, operand2, operator);
        return;
    }

    // for second operator click
    // if all spots are full calculate new result and add hanging operator, then update display

    let areAllSpotsFull = operand1 && operand2 && operator;
    if (areAllSpotsFull){
        let newResult = calculateResult(operand1, operand2, operator);
        
        operand1 = (newResult.toString().indexOf('.') < 0) ? newResult.toString() : newResult.toFixed(2).toString();
        operand2 = '';
        operator = operatorBtn.textContent;
        
        updateDisplayValueDisplay(operand1);
        updateOngoingCalculationDisplay(operand1, operand2, operatorBtn.textContent);
        return;
    }
    return;
}));

equals.addEventListener('click', (e) => {
    // only takes effect if all arguments are present
    if (operand1 && operand2 && operator) {
        let newResult = calculateResult(operand1, operand2, operator);
        
        // for division by 0 result
        if (isNaN(newResult) || newResult === Infinity || newResult === -Infinity){
            // reset values to start over during next display
            operand1 = '0';
            operand2 = '';
            operator = '';
            
            updateDisplayValueDisplay('');
            updateOngoingCalculationDisplay('You can\'t divide by 0!', '', '');
            return;
        }

        operand1 = (newResult.toString().indexOf('.') < 0) ? newResult.toString() : newResult.toFixed(2).toString();
        operand2 = '';
        operator = '';

        updateDisplayValueDisplay(operand1);
        updateOngoingCalculationDisplay(operand1, '', '');
    }
});

// for decimal point
// if first operator is filled check if it has a dot, if second operator is filled and operator beforehand check if it has a dot before appending dot, otherwise do not append

decimalPoint.addEventListener('click', (e) => {
    let isOperand1Appendable = (operand1 && operator === '');
    if (isOperand1Appendable && operand1.indexOf('.') < 0) {
        operand1 += '.';
        updateOngoingCalculationDisplay(operand1, operand2, operator);
        return;
    }
    let isOperand2Appendable = (operand2 && operator);
    if (isOperand2Appendable && operand2.indexOf('.') < 0) {
        operand2 += '.';
        updateOngoingCalculationDisplay(operand1, operand2, operator);
        return;
    }
});
