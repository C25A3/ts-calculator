const operationArea: HTMLParagraphElement = document.querySelector('.operation')
const numbersBtns = document.querySelectorAll('.number')
const operatorsBtns = document.querySelectorAll('.operator')
const equalBtn: HTMLButtonElement = document.querySelector('.equal-btn')
const backBtn: HTMLButtonElement = document.querySelector('.back-btn')
const clearBtn: HTMLButtonElement = document.querySelector('.clear-btn')
const result: HTMLParagraphElement = document.querySelector('.result')
const comma: HTMLButtonElement = document.querySelector('.comma')

let font: number = 3
let operation: string[] = []

const typeNumber = (e: any) => {
	const number: string = e.target.innerText

	if (operationArea.textContent == '0') {
		operationArea.textContent = number
	} else {
		operationArea.textContent = operationArea.textContent + number
	}

	if (operationArea.textContent.match(/(\d+)/)[0].length >= 11) {
		if (font <= 2.36) {
			return
		}
		font -= 0.08
		operationArea.style.fontSize = font + 'rem'
	}

	updateResult()
}

const typeOperator = (e: any) => {
	const operator: string = e.target.textContent

	if (operationArea.textContent === '') {
		return
	}

	operation.push(operationArea.textContent)
	operation.push(operator)
	updateResult()
	operationArea.textContent = ''
}

const typeComma = () => {
	// if (operationArea.textContent.includes(',')) {
	// 	return
	// } else {
	// 	operationArea.textContent + '.'
	// }

	operationArea.textContent += ','
}

const equal = () => {
	operation.push(operationArea.textContent)
	
	console.log(operation);
	operationArea.textContent = eval(operation.join(' '))
	updateResult()
}

const clear = () => {
	operationArea.textContent = '0'
	operation = []
	result.textContent = ''
}

const backspace = () => {
	operationArea.textContent = operationArea.textContent.slice(0, -1)
	operation.slice(0, -1)
	if (operationArea.textContent === '') {
		operationArea.textContent = '0'
	}

	updateResult()

	if (operationArea.textContent.match(/(\d+)/)[0].length >= 11) {
		if (font === 3) {
			return
		}
		font += 0.08
		operationArea.style.fontSize = font + 'rem'
	}
}



const updateResult = () => {
	result.textContent = operationArea.textContent
	//operation.push(operationArea.textContent)
	//operationArea.textContent = eval(operation.join(' '))
}

backBtn.addEventListener('click', backspace)
clearBtn.addEventListener('click', clear)
operatorsBtns.forEach(operator => operator.addEventListener('click', typeOperator))
numbersBtns.forEach(number => number.addEventListener('click', typeNumber))
equalBtn.addEventListener('click', equal)
comma.addEventListener('click', typeComma)
