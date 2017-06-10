var display = document.querySelector(".result");
var number = document.getElementsByClassName("number-button");
var clear = document.getElementsByClassName("clear-button");
var operator = document.getElementsByClassName("operator-button");
var equals = document.querySelector(".equals-button");
var state = 0;

function reset(){
	display.value = "";
}

function backSpace(){
	display.value = display.value.slice(0, -1);
}

for (var i = 0; i < number.length; i++) {
	number[i].addEventListener("click", function(){
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
	operator[i].addEventListener("click", function(){
		if (display.value.substring(display.value.length - 1) === this.value) {
			this.value += "";
		} else if (display.value === "" || display.value.slice(this.value) || state === 1){
			display.value += this.value;
			state = 0;
		}
	})
}

for (var i = 0; i < clear.length; i++) {
	clear[i].addEventListener("click", function(){
		if (this.value === "AC") {
			reset();
		}; 
		if (this.value === "CE") {
			backSpace();
		};
	})
}

equals.addEventListener("click", function(){
	display.value = eval(display.value);
	state = 1;
})


