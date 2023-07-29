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

let digits = document.querySelectorAll('.digit');
let operators = document.querySelectorAll('.operator');
let clear = document.getElementById('clear');
let equals = document.getElementById('equals');

// for delete, put it together as a string, delete last value, split by operator symbol to split up the parts if there are parts

let operand1 = '0', operand2 = '';
let operator = '';

let displayValueDisplay = document.getElementById('display-value');
displayValueDisplay.textContent = operand1;

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

    return;
}));

// for second operator click
// if all spots are full calculate new result and add hanging operator, then update display

equals.addEventListener('click', (e) => {
    // only takes effect if all arguments are present
    if (operand1 && operand2 && operator) {
        let newResult = calculateResult(operand1, operand2, operator);
        updateDisplayValueDisplay(newResult);
        updateOngoingCalculationDisplay(newResult.toString(), '', '');
        operand1 = newResult.toString();
        operand2 = '';
        operator = '';
    }
});

// for division by 0:
// display a separate error message but set all values to default so that on next operator press user simply continues


// function Calculator() {

// }

// const calculator = new Calculator();


// let calculator = {
//     result: 0,
//     calculationText: "0",
//     operatorCount: 0,
//     calculateResult() {

//         let firstNum = null;
//         let operator = null;
//         let secondNum = null;

//         for (let i = 0; i <= this.calculationText.length - 1; i++) {
//             if (isNaN(this.calculationText[i]) && !(this.calculationText[i] === '.')) {
//                 operator = this.calculationText[i];
//                 operatorIndex = i;
//                 break;
//             }
//         }

//         firstNum = this.calculationText.substring(0, operatorIndex);
//         secondNum = this.calculationText.substring(operatorIndex + 1);

//         if (firstNum && operator && secondNum) {
//             let numResult = operate(operator, firstNum, secondNum);
//             return numResult;
//         }
//         if (firstNum && operator) {
//             return "keepUnchanged";
//         }
//         if (operator && secondNum) {
//             if (operator === '-') {
//                 return -secondNum;
//             }
//             return secondNum;
//         }
//         // if there is only an input without an operator
//         if (this.calculationText) {
//             return this.calculationText;
//         }

//         // anything else is an error, like use of dot where inappropriate, we'll read dots indiscriminately and they will terminate a number's end, only the operator does
//         return "Error";

//     },
//     appendDisplayText(value) {
//         // if the value is strictly a number add it to entry display
//         let isValANum = !isNaN(value);
//         if (isValANum || value === '.') {
//             let isLastCharAnOperator = isNaN(this.calculationText[this.calculationText.length - 1]) && this.calculationText[this.calculationText.length - 1] !== '.';
//             let resultDisplay = document.getElementById('result');
//             if ((resultDisplay.textContent === '0' || isLastCharAnOperator) && value !== '.') {
//                 // overwrite div text contents with new entries
//                 resultDisplay.textContent = value;
//             }
//             else {
//                 // append div text contents with value
//                 resultDisplay.textContent += value;
//             }
//         }

//         if (!isValANum && value !== '.') {
//             this.operatorCount++;
//         }
//         // regardless of the value add it to the calculation display
//         // perform length check and number of operations check before appending (if both pass then run)
//         if (this.calculationText.length < 31 && this.operatorCount <= 1) {
//             if (this.calculationText[0] === "0" && this.calculationText.length === 1 && this.operatorCount === 0 && value !== '.') {
//                 this.calculationText = value;
//             }
//             else {
//                 this.calculationText += value;
//             }
//             let includesOperator = this.calculationText.includes('+') || this.calculationText.includes('x') || this.calculationText.includes('÷') || this.calculationText.includes('-');
//             if (includesOperator) {
//                 let calculationDisplay = document.getElementById('calculation');
//                 calculationDisplay.textContent = this.calculationText;
//             }
//         }
//     },
// };

// function add(num1, num2) {
//     return num1 + num2;
// }

// function subtract(num1, num2) {
//     return num1 - num2;
// }

// function divide(num1, num2) {
//     return num1 / num2;
// }

// function multiply(num1, num2) {
//     return num1 * num2;
// }

// function operate(operator, num1, num2) {
//     let result = undefined;
//     num1 = +num1;
//     num2 = +num2;
//     switch (operator) {
//         case "+":
//             result = add(num1, num2);
//             break;
//         case "-":
//             result = subtract(num1, num2);
//             break;
//         case "x":
//             result = multiply(num1, num2);
//             break;
//         case "÷":
//             result = divide(num1, num2);
//             break;
//         default:
//             break;
//     }

//     return result;
// }

// function trimDigit(point) {
//     if (calculator.calculationText.length >= 1) {
//         let trimmedText = calculator.calculationText.substring(0, calculator.calculationText.length - 1);
//         let lastChar = calculator.calculationText.substring(calculator.calculationText.length - 1);
//         calculator.calculationText = trimmedText;
//         let resultDisplay = document.getElementById('result');
//         if (!isNaN(+calculator.calculationText) || !isNaN(parseFloat(calculator.calculationText).toFixed(2))) {
//             resultDisplay.textContent = result;
//         }
//         else {
//             resultDisplay.textContent = calculator.calculationText;
//             result = +calculator.calculationText;
//         }
//         resultDisplay.textContent = calculator.result;
//         if (lastChar === '.') {
//             point.disabled = false;
//         }
//     }
// }

// function clearAll(point) {
//     calculator.calculationText = "";


//     // reset .
//     point.disabled = false;
//     // reset count
//     calculator.operatorCount = 0;

//     let resultDisplay = document.getElementById('result');
//     resultDisplay.textContent = "";
//     calculator.result = 0;

//     let calculationDisplay = document.getElementById('calculation');
//     calculationDisplay.textContent = calculator.calculationText;
// }

// function populateDisplay(e) {
//     calculator.appendDisplayText(e.target.id);
// }

// function setupPage() {
//     const numButtons = document.querySelectorAll('.digit');
//     const operators = document.querySelectorAll('.operator');
//     const equals = document.getElementById('equals');
//     const point = document.getElementById('.');
//     const clear = document.getElementById('clear');
//     const del = document.getElementById('delete');
//     numButtons.forEach(numButton => numButton.addEventListener('click', (e) => populateDisplay(e)));
//     operators.forEach(operator => operator.addEventListener('click', (e) => {
//         point.disabled = false;
//         populateDisplay(e);
//     }));
//     equals.addEventListener('click', () => {
//         let resultDisplay = document.getElementById('result');
//         let result = calculator.calculateResult();
//         if (result.toString().includes('.')) {
//             point.disabled = true;
//         }
//         if (result !== "keepUnchanged") {
//             resultDisplay.textContent = result;
//             calculator.result = result;
//             let calculationDisplay = document.getElementById('calculation');
//             calculationDisplay.textContent = result;
//             calculator.calculationText = result.toString();
//             calculator.operatorCount = 0;
//         }
//     });
//     point.addEventListener('click', (e) => {
//         point.disabled = true;
//         populateDisplay(e);
//     });

//     clear.addEventListener('click', () => clearAll(point));
//     del.addEventListener('click', () => trimDigit(point));
// }

// window.addEventListener('load', setupPage);