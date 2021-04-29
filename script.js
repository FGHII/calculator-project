//calculation functions
function operate(a, operator, b) {
  result = undefined;
  switch (operator) {
    case ("add"):
      result = a + b;
      break;
    case ("subtract"):
      result = a - b;
      break;
    case ("multiply"):
      result = a * b;
      break;
    case ("divide"):
      result = a / b;
      break;
  }
    return result;
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
let currentDisplayNum = "0"; //zero is default display number after first loadup or pressing clear
let calculationArray = [];
//adding event listener to each button
buttons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    //number button functionality
    if (event.target.classList.contains("number")) {
      //if it's a non-zero number, remove the default zero and concatenate it to the current display
      //otherwise if you want to use the default zero as the first value you can
      if (currentDisplayNum == "0") {
        currentDisplayNum = '';
      };
    currentDisplayNum = currentDisplayNum.concat(event.target.innerText);
    displayValue.dv = currentDisplayNum; //updating display value variable that the listener is checking
    //operator button functionality
  } else if (event.target.classList.contains("operator")) {
    //if the calc array already has 3 values, calculate it first then push result and operator to array
    if (calculationArray.length == 3 && typeof calculationArray[1] == 'string') {
      const result = operate(calculationArray[0], calculationArray[1], calculationArray[2])
      calculationArray = [];
      //clear displayed number while waiting for next number input.
      //we're currently displaying the operator so we don't need the default display zero.
      currentDisplayNum = '';
      calculationArray.push(result);
      calculationArray.push(event.target.getAttribute("data-type"));
      console.log(calculationArray);
      displayValue.dv = result; //display current running total/output
      //if the array doesn't have 3 values yet, add just the operator (should just have 2 values now)
    } else {
    calculationArray.push(parseFloat(currentDisplayNum));
    calculationArray.push(event.target.getAttribute("data-type"));
    console.log(calculationArray);
    currentDisplayNum = ''; //clear displayed number while waiting for next number input
    displayValue.dv = event.target.innerText; //display current operator
   }
    //equals button functionality - push current value to array and send to operator
  } else if (event.target.classList.contains("equals")) {
    //only push displayed number if an operator string is in the 2nd index position
    if (typeof calculationArray[1] == 'string') {
      calculationArray.push(parseFloat(currentDisplayNum));
      console.log(calculationArray);
    }
    if (calculationArray.length == 3 && typeof calculationArray[1] == 'string') {
      currentDisplayNum = operate(calculationArray[0], calculationArray[1], calculationArray[2])
      calculationArray = [];
      displayValue.dv = currentDisplayNum;
    }
    //clear button functionality - initialize working variables and display default zero
  } else if (event.target.classList.contains("clear")) {
    currentDisplayNum = "0";
    calculationArray = [];
    console.log(calculationArray);
    displayValue.dv = currentDisplayNum;
  }
});
});

//Issues
//Issue 1:  press two operators in a row (same operator and different operators)
//RESOLVED - Issue 4: calculate 8 x 6 = then press equals a few more times...it repeatedly adds the answer to the array
//Issue 2:  after pressing equals after a calculation, press a number after that - should it be concatenating to the current total?
//calculate 8 / 4 = then press a number - it concatenates it to the current display
//RESOLVED - Issue 3:  8 + 8 = then do + 4......
