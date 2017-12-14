const display = document.querySelector(".result");
const number = document.getElementsByClassName("number-button");
const operator = document.getElementsByClassName("operator-button");
const zero = document.querySelector(".zero-button");
const equals = document.querySelector(".equals-button");
const clear = document.querySelector(".all-clear");
const backSpace = document.querySelector(".backspace");
let state = 0;

function reset() {
	display.value = "";
}

for (var i = 0; i < number.length; i++) {
	number[i].addEventListener("click", function () {

		if (state === 0) {
			display.value += parseInt(this.value, 10);
		} else if (state === 1) {
			reset();
			display.value += parseInt(this.value, 10);
			state = 0;
		}

	})
}

for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener("click", function () {
		const prevIndex = display.value.substring(display.value.length- 1);

		if (prevIndex === "*" || prevIndex === "+" || prevIndex === "-" || prevIndex === "/" || prevIndex === ".") {
			display.value = display.value.slice(0, -1);
			display.value += this.value;
		} else if (display.value.length > 0) {
			display.value += this.value;
			state = 0;
		}
	})
}

clear.addEventListener("click", function () {
	reset();
})

backSpace.addEventListener("click", function () {
	display.value = display.value.slice(0, -1);
})

equals.addEventListener("click", function () {
	display.value = eval(display.value);
	state = 1;
})
