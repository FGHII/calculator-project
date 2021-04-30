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

//initalizing display and values
const display = document.querySelector(".display");
let currentDisplayNum = "0"; //zero is default display number after first loadup or pressing clear
let calculationArray = [];
//inputting numbers and functions into display
buttons = document.querySelectorAll(".button");
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
    display.innerText = currentDisplayNum; //updating display value variable that the listener is checking
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
      display.innerText = result; //display current running total/output
      //if the array doesn't have 3 values yet and an operator hasn't already been added, add the current displayed value and operator (should just have 2 values now)
    } else if (typeof calculationArray[1] != 'string') {
    calculationArray.push(parseFloat(currentDisplayNum));
    calculationArray.push(event.target.getAttribute("data-type"));
    console.log(calculationArray);
    currentDisplayNum = ''; //clear displayed number while waiting for next number input
    display.innerText = event.target.innerText; //display current operator
   }
    //equals button functionality - push current value to array and send to operator
  } else if (event.target.classList.contains("equals")) {
    //only push displayed number if an operator string is in the 2nd index position
    if (typeof calculationArray[1] == 'string') {
      calculationArray.push(parseFloat(currentDisplayNum));
      console.log(calculationArray);
    }
    if (calculationArray.length == 3 && typeof calculationArray[1] == 'string') {
      //convert equals output to string since it will be displayed
      //keeping displayed variables consistently a string for easier manipulation in display
      //and then converting to numbers when pushed to calculation array
      currentDisplayNum = operate(calculationArray[0], calculationArray[1], calculationArray[2]).toString()
      calculationArray = [];
      display.innerText = currentDisplayNum;
    }
    //clear button functionality - initialize working variables and display default zero
  } else if (event.target.classList.contains("clear")) {
    currentDisplayNum = "0";
    calculationArray = [];
    console.log(calculationArray);
    display.innerText = currentDisplayNum;
  }
});
});
