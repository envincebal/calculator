(function () {
  const display = document.querySelector(".result");
  const history = document.querySelector(".history");
  const number = document.getElementsByClassName("number-button");
  const operator = document.getElementsByClassName("operator-button");
  const zero = document.querySelector(".zero-button");
  const equals = document.querySelector(".equals-button");
  const clear = document.querySelector(".clear-button");
  const decimal = document.querySelector(".decimal-button");
  let newNumber = false;
  let decimalState = true;
  let zeroState = false;

  init();

  function init() {
    display.textContent = "0";
    history.textContent = "0";
    newNumber = false;
    decimalState = true;
    zeroState = false;
  }

  function digitLimit() {
    // Sets digit limit on display to 10 characters. Function discounts decimal from
    // number limit
    if (display.textContent.includes(".")) {
      if (display.textContent.length > 11) {
        display.textContent = "Digit Limit Met";
        history.textContent = "";
      }
    } else {
      if (display.textContent.length > 10) {
        display.textContent = "Digit Limit Met";
        history.textContent = "";
      }
    }
    // Sets digit limit on history to 32 characters.
    if (history.textContent.length > 32) {
      display.textContent = "Digit Limit Met";
      history.textContent = "";
    }
  }

  // Iterates through number elements and sets event listeners
  for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function () {
      const prevDigit = display.textContent.slice(-1);
      if (display.textContent.length === 1 && display.textContent === "0") {
        display.textContent = this.value;
        history.textContent = this.value;
      } else if (isNaN(prevDigit) && prevDigit !== ".") {
        display.textContent = this.value;
        history.textContent += this.value;
      } else {
        display.textContent += this.value;
        history.textContent += this.value;
      }
      zeroState = true;
      digitLimit();
    });
  }

  // Iterates through operator elements and sets event listeners
  for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function () {
      const prevIndex = display.textContent.slice(-1);
      // if previous value is an operator, a new clicked operator will replace it
      if (prevIndex === "*" || prevIndex === "+" || prevIndex === "-" || prevIndex === "/") {
        display.textContent = display.textContent.slice(0, -1);
        history.textContent = history.textContent.slice(0, -1);
        display.textContent += this.value;
        history.textContent += this.value;
      } else if (history.textContent.length > 0) {
        display.textContent = this.value;
        history.textContent += this.value;
      }
      decimalState = true;
      zeroState = false;
      digitLimit();
    });
  }

  // clears display value
  clear.addEventListener("click", function () {
    init();
  });

  // adds decimal to display
  decimal.addEventListener("click", function () {
    const lastDigit = display.textContent.slice(-1);
    // if decimal button is pressed, then it is disabled unless decimal in current
    // integer is deleted
    if (decimalState && isNaN(lastDigit)) {
      display.textContent = "0" + this.value;
      history.textContent += "0" + this.value;
      decimalState = false;
      zeroState = true;
    } else if (decimalState) {
      display.textContent += this.value;
      history.textContent += this.value;
      decimalState = false;
      zeroState = true;
    } else {
      display.textContent += "";
    }
    digitLimit();
  });

  zero.addEventListener("click", function () {
    // Prevents first number between operators from being zero
    if (!zeroState) {
      display.textContent += "";
    } else {
      display.textContent += this.value;
      history.textContent += this.value;
    }
    digitLimit();
  })

  // Evaluates history.textContent on display and rounds to the nearest hundredths
  // if a decimal
  equals.addEventListener("click", function () {
    const lastIndex = display.textContent.slice(-1);
    // If last digit is not a number then "Bad Syntax!" will display otherwise it
    // will evaluate history.textContent
    if (isNaN(lastIndex)) {
      display.textContent = "Bad Syntax!";
    } else {
      // Rounds any decimal total to nearest hundredth
      display.textContent = parseFloat(eval(history.textContent).toFixed(2));
      history.textContent = parseFloat(eval(history.textContent).toFixed(2));

      decimalState = true;
    }
  });
})()