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
		decimalState = true;
	}

	// Iterates through number elements and sets event listeners
	for (var i = 0; i < number.length; i++) {
		number[i].addEventListener("click", function () {
			if (newNumber === false) {
				display.value += parseInt(this.value, 10);
			} else if (newNumber === true) {
				reset();
				display.value += parseInt(this.value, 10);
				newNumber = false;
			}
			zeroState = true;
		});
	}

	// Iterates through operator elements and sets event listeners
	for (var i = 0; i < operator.length; i++) {
		operator[i].addEventListener("click", function () {
			const prevIndex = display.value.substring(display.value.length - 1);

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
	});

	zero.addEventListener("click", function(){
		if(!zeroState){
			display.value += "";
		}else{
			display.value += this.value;
		}
	})

	// Evaluates expression on display
	equals.addEventListener("click", function () {
		display.value = eval(display.value);
		newNumber = true;
		decimalState = true;
	});
})()