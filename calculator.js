const display = document.querySelector("#display-screen");
let firstNumber;
let secondNumber;
let operator;
let result = 0;
let justCalculated = false;
let commaCounter = 0;
const commaButton = document.querySelector(".button-comma");

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
  if (Number(secondNumber) === 0) {
    return "Division by zero!";
  }
  return Number(firstNumber) / Number(secondNumber);
}

function operate() {
  if (
    firstNumber === undefined ||
    secondNumber === undefined ||
    operator === undefined
  ) {
    return;
  }

  if (operator === "+") {
    result = add(firstNumber, secondNumber);
  } else if (operator === "-") {
    result = substract(firstNumber, secondNumber);
  } else if (operator === "*") {
    result = multiply(firstNumber, secondNumber);
  } else if (operator === "/") {
    result = divide(firstNumber, secondNumber);
  }

  if (result === "Division by zero!") {
    resetDisplayScreen();
    display.textContent = "Division by zero!";
    justCalculated = true;
    return;
  }

  if (!Number.isInteger(result) && isFinite(result)) {
    result = result.toFixed(2);
  }

  display.textContent = result;
  justCalculated = true;

  console.log(
    `firstNumber: ${firstNumber}, operator: ${operator}, secondNumber: ${secondNumber}, result: ${result}`,
  );
}

function updateDisplayScreen(e) {
  if (justCalculated) {
    firstNumber = result;
    result = 0;
    display.textContent = "";
    justCalculated = false;
  }
  if (display.textContent === "0") {
    display.textContent = "";
  }
  display.textContent += e.target.value;
  secondNumber = display.textContent;
  commaCounter = 0;
  commaButton.disabled = false;
  handleComma(secondNumber);
}

function handleOperator(e) {
  if (justCalculated) {
    firstNumber = result;
    operator = e.target.value;
    secondNumber = undefined;
    return;
  }
  if (secondNumber !== undefined) {
    firstNumber = secondNumber;
    commaCounter = 0;
    commaButton.disabled = false;
    handleComma(firstNumber);
  }
  operator = e.target.value;
  display.textContent = "";
  secondNumber = undefined;
}

function resetDisplayScreen() {
  display.textContent = "0";
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
  justCalculated = false;
  commaCounter = 0;
  commaButton.disabled = false;
  result = 0;
}

function handleComma(displayText) {
  if (displayText.includes(".")) {
    commaCounter++;
  }
  if (commaCounter >= 1) {
    commaButton.disabled = true;
  }
}

const buttons = document.querySelectorAll("button");
console.log(buttons);

buttons.forEach((button) => {
  if (!["+", "-", "*", "/", "c", "="].includes(button.value)) {
    button.addEventListener("click", updateDisplayScreen);
  } else if (button.value === "c") {
    button.addEventListener("click", resetDisplayScreen);
  } else if (button.value === "=") {
    button.addEventListener("click", operate);
  } else {
    button.addEventListener("click", function (e) {
      if (
        operator !== undefined &&
        secondNumber !== undefined &&
        !justCalculated
      ) {
        operate();
        handleOperator(e);
      } else {
        handleOperator(e);
      }
    });
  }
});

document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    const button = [...buttons].find((b) => b.value === e.key);
    if (button) button.click();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    const button = [...buttons].find((b) => b.value === e.key);
    if (button) button.click();
  } else if (e.key === "Enter" || e.key === "=") {
    const button = [...buttons].find((b) => b.value === "=");
    if (button) button.click();
  } else if (e.key === "Escape") {
    const button = [...buttons].find((b) => b.value === "c");
    if (button) button.click();
  }
});
