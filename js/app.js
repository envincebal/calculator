(function () {
  const display = document.querySelector(".result");
  const history = document.querySelector(".history");
  const number = document.getElementsByClassName("number-button");
  const operator = document.getElementsByClassName("operator-button");
  const zero = document.querySelector(".zero-button");
  const equals = document.querySelector(".equals-button");
  const clear = document.querySelector(".clear-button");
  const decimal = document.querySelector(".decimal-button");
  let decimalState = true;
  let zeroState = false;
  let evaluation = false;

  init();

  function init() {
    display.textContent = "0";
    history.textContent = "0";
    decimalState = true;
    zeroState = false;
    evaluation = false;
  }

  function digitLimit() {
    // Sets digit limit on display to 10 characters. Function discounts decimal from
    // number limit
    if (display.textContent.includes(".")) {
      if (display.textContent.length > 13) {
        display.textContent = "Digit Limit Met";
        history.textContent = "";
      }
    } else {
      if (display.textContent.length > 12) {
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
      if (evaluation || display.textContent === "0") {
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
      evaluation = false;
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
      evaluation = false;
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
    // if decimal button is pressed, then it is disabled unless decimal in current integer is deleted
    if (decimalState && isNaN(lastDigit)) {
      display.textContent = "0" + this.value;
      history.textContent += "0" + this.value;
      decimalState = false;
      zeroState = true;
    } else if (decimalState && !evaluation) {
      display.textContent += this.value;
      history.textContent += this.value;
      decimalState = false;
      zeroState = true;
    } else if (evaluation && decimalState) {
      display.textContent = "0" + this.value;
      history.textContent = "0" + this.value;
      decimalState = false;
    } else {
      display.textContent += "";
    }
    evaluation = false;
    digitLimit();
  });

  zero.addEventListener("click", function () {
    const prevItem = display.textContent.slice(-1);
    // Prevents first number between operators from being zero
    if (!zeroState && prevItem === "0") {
      display.textContent += "";
      decimalState = true
    } else if (evaluation) {
      display.textContent = this.value;
      history.textContent = display.textContent;
    } else {
      display.textContent += this.value;
      history.textContent += this.value;
    }
    digitLimit();
  })

  // Evaluates history.textContent on display
  equals.addEventListener("click", function () {
    const lastIndex = display.textContent.slice(-1);

    // If last digit is not a number then "Bad Syntax!" will display otherwise it will evaluate history.textContent
    if (isNaN(lastIndex)) {
      display.textContent = "Bad Syntax!";
    } else {
      display.textContent = parseFloat(eval(history.textContent));
      history.textContent = parseFloat(eval(history.textContent));

    }
    decimalState = true;
    evaluation = true;
    digitLimit();
  });
})()