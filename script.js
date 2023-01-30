const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    // Replace current display value if first value is entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0, replace it, else add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number; 
    }
}

// Add Decimal
function addDecimal(){
    // If operator pressed, don't add decimal
    if(awaitingNextValue) return;
    // If no decimal,add one 
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/':(firstNumber,secondNumber) => firstNumber/secondNumber,
    '*':(firstNumber,secondNumber) => firstNumber*secondNumber,
    '+':(firstNumber,secondNumber) => firstNumber+secondNumber,
    '-':(firstNumber,secondNumber) => firstNumber-secondNumber,
    '=':(firstNumber,secondNumber) => secondNumber,
};

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue,currentValue);
        firstValue = calculation;
        calculatorDisplay.textContent = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;


}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset display
function resetAll(){
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

// Event Listener
clearBtn.addEventListener('click',resetAll);