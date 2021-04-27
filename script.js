function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  switch (operator) {
    case ("add"):
      result = add(a, b);
      break;
    case ("subtract"):
      result = subtract(a, b);
      break;
    case ("multiply"):
      result = multiply(a, b);
      break;
    case ("divide"):
      result = divide(a, b);
      break;
  }
  if (!result) {
    console.log("wrong operator")
  } else {
    return result;
  }
};

output = operate(6,2,"multiply");
console.log(output);
