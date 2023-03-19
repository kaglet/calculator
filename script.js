let computedFirstResult = false;
let calculator = {
    calculationText: "0",
    operatorCount: 0,
    calculateResult() {

        let firstNum = null;
        let operator = null;
        let secondNum = null;

        for (let i = 0; i <= this.calculationText.length - 1; i++) {
            if (isNaN(this.calculationText[i]) && !(this.calculationText[i] === '.')) {
                operator = this.calculationText[i];
                operatorIndex = i;
                break;
            }
        }

        firstNum = this.calculationText.substring(0, operatorIndex);
        secondNum = this.calculationText.substring(operatorIndex+1);

        if (firstNum && operator && secondNum) {
            let numResult = operate(operator, firstNum, secondNum);
            return numResult;
        }
        if (firstNum && operator) {
            return "keepUnchanged";
        }
        if (operator && secondNum) {
            if (operator === '-') {
                return -secondNum;
            }
            return secondNum;
        }
        // if there is only an input without an operator
        if (this.calculationText) {
            return this.calculationText;
        }

        // anything else is an error, like use of dot where inappropriate, we'll read dots indiscriminately and they will terminate a number's end, only the operator does
        return "Error";

    },
    appendDisplayText(value) {
        // if the value is strictly a number add it to entry display
        let isValANum = !isNaN(value);
        if (isValANum || value === '.') {
            let isLastCharAnOperator = isNaN(this.calculationText[this.calculationText.length - 1]) && this.calculationText[this.calculationText.length - 1] !== '.'; 
            let resultDisplay = document.getElementById('result');   
            if ((resultDisplay.textContent === '0' || isLastCharAnOperator) && value !== '.') {
                // overwrite div text contents with new entries
                resultDisplay.textContent = value; 
            }
            else {
                // append div text contents with value
                resultDisplay.textContent += value; 
            }       
        }

        if (!isValANum && value !== '.') {
            this.operatorCount++;
        }
        // regardless of the value add it to the calculation display
        // perform length check and number of operations check before appending (if both pass then run)
        if (this.calculationText.length < 31 && this.operatorCount <= 1) {
            if (this.calculationText[0] === "0" && this.calculationText.length === 1 && this.operatorCount === 0 && value !== '.') {
                this.calculationText = value;
            }
            else {
                this.calculationText += value;
            }
            let includesOperator = this.calculationText.includes('+') || this.calculationText.includes('x') || this.calculationText.includes('÷') || this.calculationText.includes('-');
            if (includesOperator) {
                let calculationDisplay = document.getElementById('calculation');
                calculationDisplay.textContent = this.calculationText;
            }
        }
    }, 
};

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function operate(operator, num1, num2) {
    let result = undefined;
    num1 = +num1;
    num2 = +num2;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "÷":
            result = divide(num1, num2);
            break;
        default:
            break;
    }

    return result;
}

function populateDisplay(e) {
    calculator.appendDisplayText(e.target.id);
}

function setupPage() {
    const numButtons = document.querySelectorAll('.digit');
    const operators = document.querySelectorAll('.operator');
    const equals = document.getElementById('equals');
    const point = document.getElementById('.');
    numButtons.forEach(numButton => numButton.addEventListener('click', (e) => populateDisplay(e)));
    operators.forEach(operator => operator.addEventListener('click', (e) => {
        point.disabled = false;
        populateDisplay(e)
    }));
    equals.addEventListener('click', () => {
        point.disabled = false;
        let resultDisplay = document.getElementById('result');  
        let result = calculator.calculateResult();
        if (result !== "keepUnchanged") {
            resultDisplay.textContent = result;
            let calculationDisplay = document.getElementById('calculation');
            calculationDisplay.textContent = result;
            calculator.calculationText = result.toString();
            calculator.operatorCount = 0;
        }
    });
    point.addEventListener('click', (e) => {
        point.disabled = true;
        populateDisplay(e);
    });
}

// function populateDispla(value){
//     const calculationDisplay = document.getElementById('#calculation');
//     const resultDisplay = document.getElementById('#result');

//     // if the html node has been populated enough stop populating further i.e. appending the display.
//     // create a fullyPopulated boolean flag to mark this.
//     // after pressing equals then populate the calculation result there.
//     // use the result as the next value depending on if the operate button is pressed, or a new number if a number value is pressed.
//     // this logic will be slightly difficult but honestly not that bad.
//     // perhaps rather use your knowledge on objects to create a calculator object, to update values continuously.
//     // making an object literal will be easy but creating a class will be too.
//     // search how to make a calculator after implementing it my way.
// }

window.addEventListener('load', setupPage);

// All I need to do is split by the space and I will have a number in the first index, an operator, then another number.

// Make first value inputted to make other buttons active. With each operation turn it false. So that we can't end in an operator. Or can't
// press equals if there 
// Start with default value as 0, so it works even if someone enters operator first
// It's very possible to keep splicing the string, operating on it, then returning it.