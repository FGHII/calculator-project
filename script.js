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

//inputting numbers and functions into display
buttons = document.querySelectorAll(".button");
//initializing values
let currentDisplayNum = "0";
let calculationArray = [];
//adding event listener to each button
buttons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    //number button functionality
    if (event.target.classList.contains("number")) {
      //if it's a number, remove the default zero and concatenate it to the current display
      //otherwise if you want to use the default zero as the first value you can
      if (currentDisplayNum == "0") {
        currentDisplayNum = '';
      };
    currentDisplayNum = currentDisplayNum.concat(event.target.innerText);
    displayValue.dv = currentDisplayNum; //updating display value variable that the listener is checking
    //operator button functionality
  } else if (event.target.classList.contains("operator")) {
    //push current displayed number to calc array
    calculationArray.push(parseFloat(currentDisplayNum));
    console.log(calculationArray);
    //if the calc array already has 3 values, calculate it first then push result and operator to array
    if (calculationArray.length == 3) {
      const result = operate(calculationArray[0], calculationArray[1], calculationArray[2])
      calculationArray = [];
      currentDisplayNum = "0";
      calculationArray.push(result);
      calculationArray.push(event.target.getAttribute("data-type"));
      displayValue.dv = result; //display current running total/output
      //if the array doesn't have 3 values yet, add just the operator (should just have 2 values now)
    } else {
    calculationArray.push(event.target.getAttribute("data-type"));
    currentDisplayNum = "0";
    displayValue.dv = event.target.innerText; //display current operator
   }
    //equals button functionality - push current value to array and send to operator
  } else if (event.target.classList.contains("equals")) {
      calculationArray.push(parseFloat(currentDisplayNum));
      console.log(calculationArray);
    if (calculationArray.length == 3) {
      const result = operate(calculationArray[0], calculationArray[1], calculationArray[2])
      calculationArray = [];
      calculationArray.push(result);
      displayValue.dv = result;
    }
    //clear button functionality - initialize working variables
  } else if (event.target.classList.contains("clear")) {
    currentDisplayNum = "0";
    calculationArray = [];
    console.log(calculationArray);
    displayValue.dv = currentDisplayNum;
  }
});
});

//testing ideas
//press two operators in a row (same operator and different operators)
//after pressing equals after a calculation, press a number after that - should it be concatenating to the current total?
//move calculation functions into switch cases?
//calculate 8 / 4 = then press a number - it concatenates it to the current display
