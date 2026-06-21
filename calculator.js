const display = document.querySelector("#display-screen");
let firstNumber;
let secondNumber;
let operator;

function add(firstNumber, secondNumber) {
  return Number(firstNumber) + Number(secondNumber);
}

function substract(firstNumber, secondNumber) {
  return Number(firstNumber) - Number(secondNumber);
}

function multiply(firstNumber, secondNumber) {
  return Number(firstNumber) * Number(secondNumber);
}

function divide(firstNumber, secondNumber) {
  return Number(firstNumber) / Number(secondNumber);
}

function operate() {
  let result = 0;
  if (operator === "+") {
    result = add(firstNumber, secondNumber);
  } else if (operator === "-") {
    result = substract(firstNumber, secondNumber);
  } else if (operator === "*") {
    result = multiply(firstNumber, secondNumber);
  } else if (operator === "/") {
    result = divide(firstNumber, secondNumber);
  }
  display.textContent = result;
}

function updateDisplayScreen(e) {
  if (display.textContent === "0") {
    display.textContent = "";
  }
  display.textContent += e.target.value;
  secondNumber = display.textContent;
  console.log(`second num: ${secondNumber}`);
}

function handleOperator(e) {
  firstNumber = display.textContent;
  operator = e.target.value;
  display.textContent = "";
  console.log(`first num: ${firstNumber}`);
  console.log(operator);
}

function resetDisplayScreen() {
  display.textContent = "0";
}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  if (
    button.value !== "+" &&
    button.value !== "-" &&
    button.value !== "*" &&
    button.value !== "/" &&
    button.value !== "c" &&
    button.value !== "="
  ) {
    button.addEventListener("click", updateDisplayScreen);
  } else if (button.value === "c") {
    button.addEventListener("click", resetDisplayScreen);
  } else if (button.value === "=") {
    button.addEventListener("click", operate);
  } else {
    button.addEventListener("click", handleOperator);
  }
});
