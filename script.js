let computedFirstResult = false;
let calculator = {
    displayText: "",
    appendDisplayText(value) {
        if (this.displayText.length < 31) {
            this.displayText += value;
            let calculationDisplay = document.getElementById('calculation');
            calculationDisplay.textContent = this.displayText;
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
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
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
    numButtons.forEach(numButton => numButton.addEventListener('click', (e) => populateDisplay(e)));
    operators.forEach(operator => operator.addEventListener('click', (e) => populateDisplay(e)));
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