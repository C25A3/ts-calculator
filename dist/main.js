const operationArea = document.querySelector('.operation');
const numbersBtns = document.querySelectorAll('.number');
const operatorsBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal-btn');
const backBtn = document.querySelector('.back-btn');
const clearBtn = document.querySelector('.clear-btn');
const result = document.querySelector('.result');
const comma = document.querySelector('.comma');
let font = 3;
let operation = [];
const typeNumber = (e) => {
    const number = e.target.innerText;
    if (operationArea.textContent == '0') {
        operationArea.textContent = number;
    }
    else {
        operationArea.textContent = operationArea.textContent + number;
    }
    if (operationArea.textContent.match(/(\d+)/)[0].length >= 11) {
        if (font <= 2.36) {
            return;
        }
        font -= 0.08;
        operationArea.style.fontSize = font + 'rem';
    }
    updateResult();
    checkComma();
};
const typeOperator = (e) => {
    const operator = e.target.textContent;
    if (operationArea.textContent === '') {
        return;
    }
    operation.push(operationArea.textContent);
    operation.push(operator);
    updateResult();
    operationArea.textContent = '';
};
const typeComma = () => {
    // if (operationArea.textContent.includes(',')) {
    // 	return
    // } else {
    // 	operationArea.textContent + '.'
    // }
    operationArea.textContent += ',';
};
const equal = () => {
    operation.push(operationArea.textContent);
    console.log(operation);
    operationArea.textContent = eval(operation.join(' '));
    updateResult();
};
const clear = () => {
    operationArea.textContent = '0';
    operation = [];
    result.textContent = '';
};
const backspace = () => {
    operationArea.textContent = operationArea.textContent.slice(0, -1);
    operation.slice(0, -1);
    if (operationArea.textContent === '') {
        operationArea.textContent = '0';
    }
    updateResult();
    if (operationArea.textContent.match(/(\d+)/)[0].length >= 11) {
        if (font === 3) {
            return;
        }
        font += 0.08;
        operationArea.style.fontSize = font + 'rem';
    }
};
const updateResult = () => {
    result.textContent = operationArea.textContent;
    //operation.push(operationArea.textContent)
    //operationArea.textContent = eval(operation.join(' '))
};
backBtn.addEventListener('click', backspace);
clearBtn.addEventListener('click', clear);
operatorsBtns.forEach(operator => operator.addEventListener('click', typeOperator));
numbersBtns.forEach(number => number.addEventListener('click', typeNumber));
equalBtn.addEventListener('click', equal);
comma.addEventListener('click', typeComma);
