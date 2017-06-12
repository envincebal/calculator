var display = document.querySelector(".result");
var number = document.getElementsByClassName("number-button");
var operator = document.getElementsByClassName("operator-button");
var equals = document.querySelector(".equals-button");
var clear = document.querySelector(".all-clear");
var backSpace = document.querySelector(".backspace");
var state = 0;

function reset() {
	display.value = "";
}

for (var i = 0; i < number.length; i++) {
	number[i].addEventListener("click", function(){
		if (state === 0){
			display.value += parseInt(this.value, 10);
		} else if (state === 1){
			reset();
			display.value += parseInt(this.value, 10);
			state = 0;
		}
	})
}

for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener("click", function(){
		if (display.value.substring(display.value.length - 1) === this.value){
			this.value += "";
		} else if (display.value === "" || display.value.slice(this.value) || state === 1){
			display.value += this.value;
			state = 0;
		}
	})
}

clear.addEventListener("click", function(){
	reset();
})	

backSpace.addEventListener("click", function(){
	display.value = display.value.slice(0, -1);
})

equals.addEventListener("click", function(){
	display.value = eval(display.value);
	state = 1;
})


