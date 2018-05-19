(function () {
	const display = document.querySelector(".result");
	const number = document.getElementsByClassName("number-button");
	const operator = document.getElementsByClassName("operator-button");
	const zero = document.querySelector(".zero-button");
	const equals = document.querySelector(".equals-button");
	const clear = document.querySelector(".all-clear");
	const backSpace = document.querySelector(".backspace");
	const decimal = document.querySelector(".decimal-button");
	let newNumber = false;
	let decimalState = true;
	let zeroState = false;

	function reset() {
		display.value = "";
		newNumber = false;
		decimalState = true;
		zeroState = false;
	}

	// Sets digit limit on display to 10 numbers. Function discounts decimal from number limit
	function digitLimit() {
		if (display.value.includes(".")) {
			if (display.value.length > 11) {
				display.value = "Digit Limit Met";
				newNumber = true;
			}
		} else {
			if (display.value.length > 10) {
				display.value = "Digit Limit Met";
				newNumber = true;
			}
		}
	}

	// Iterates through number elements and sets event listeners
	for (var i = 0; i < number.length; i++) {
		number[i].addEventListener("click", function () {
			let number = parseInt(display.value);
			if (newNumber === false) {
				display.value += parseInt(this.value, 10);
			} else if (newNumber === true) {
				reset();
				display.value += parseInt(this.value, 10);
				newNumber = false;
			}
			zeroState = true;
			digitLimit();
		});
	}

	// Iterates through operator elements and sets event listeners
	for (var i = 0; i < operator.length; i++) {
		operator[i].addEventListener("click", function () {
			const prevIndex = display.value.slice(-1);

			// if previous value is an operator, a new clicked operator will replace it
			if (prevIndex === "*" || prevIndex === "+" || prevIndex === "-" || prevIndex === "/") {
				display.value = display.value.slice(0, -1);
				display.value += this.value;
			} else if (display.value.length > 0) {
				display.value += this.value;
				newNumber = false;
			}
			decimalState = true;
			zeroState = false;
			digitLimit();
		});
	}

	// clears display value
	clear.addEventListener("click", function () {
		reset();
	});

	// deletes previous value on display
	backSpace.addEventListener("click", function () {
		if (display.value.slice(-1) === ".") {
			decimalState = true;
		}
		display.value = display.value.slice(0, -1);
	});

	// adds decimal to display
	decimal.addEventListener("click", function () {
		// if decimal button is pressed, then it is disabled unless decimal in current integer is deleted
		if (decimalState) {
			display.value += this.value;
			decimalState = false;
			zeroState = true;
		} else {
			display.value += "";
		}
		digitLimit();
	});

	zero.addEventListener("click", function () {
		// Prevents first number between operators from being zero
		if (!zeroState) {
			display.value += "";
		} else {
			display.value += this.value;
		}
		digitLimit();
	})

	// Evaluates expression on display and rounds to the nearest hundredths if a decimal
	equals.addEventListener("click", function () {
		const lastDigit = display.value.slice(-1);
		// If last digit is not a number then "Bad Syntax!" will display otherwise it will evaluate expression
		if (isNaN(lastDigit)) {
			display.value = "Bad Syntax!";
			newNumber = true;
		} else {
			// Rounds any decimal total to nearest hundredth
			display.value = parseFloat(eval(display.value).toFixed(2));
			decimalState = true;
		}
	});
})()