//calculation functions
function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};

function operate(a, operator, b) {
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

//initalizing display and setting up listener to update
//display each time the display value gets changed
//play with the top 2 answers (getters/setters and proxies) here:
//https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript
const display = document.querySelector(".display");
displayValue = {
  dvInternal: 0,
  dvListener: function(val) {},
  set dv(val) {
    this.dvInternal = val;
    this.dvListener(val);
  },
  get dv() {
    return this.dvInternal;
  },
  registerListener: function(listener) {
    this.dvListener = listener;
  }
}
displayValue.registerListener(function(val) {
  display.innerText = displayValue.dvInternal;
});

//inputting numbers into display
buttons = document.querySelectorAll(".button");
let currentDisplayNum = "0";
let calculationArray = [];
buttons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    if (event.target.classList.contains("number")) {
      if (currentDisplayNum == "0") {
        currentDisplayNum = '';
      };
    currentDisplayNum = currentDisplayNum.concat(event.target.innerText);
    displayValue.dv = currentDisplayNum; //updating display value variable that the listener is checking
  } else if (event.target.classList.contains("operator")) {
    calculationArray.push(parseFloat(currentDisplayNum));
    calculationArray.push(event.target.getAttribute("data-type"));
    currentDisplayNum = '';
    displayValue.dv = event.target.innerText;
  } else if (event.target.classList.contains("equals")) {
      if (currentDisplayNum !== '') {
        calculationArray.push(parseFloat(currentDisplayNum));
      }
      console.log(calculationArray);
    const result = operate(calculationArray[0], calculationArray[1], calculationArray[2])
    calculationArray = [];
    displayValue.dv = result;
  } else if (event.target.classList.contains("clear")) {
    currentDisplayNum = "0";
    calcluationArray = [];
    displayValue.dv = currentDisplayNum;
  }
  })
})
