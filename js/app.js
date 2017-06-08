var display = document.querySelector(".result");
var number = document.getElementsByClassName("number-button");
var clear = document.getElementsByClassName("clear-button");
var operator = document.getElementsByClassName("operator-button");
var equals = document.querySelector(".equals-button");

reset();	

function reset(){
	display.value = "";
}

function backSpace(){
	display.value = display.value.slice(0, -1);
}

console.log(display.value);
for (var i = 0; i < number.length; i++) {
	number[i].addEventListener("click", function(){
		display.value += this.value;
	})
}

for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener("click", function(){
		if (display.value.substring(display.value.length - 1) === this.value) {
			this.value += "";
		}else if (display.value === "" || display.value.slice(this.value)){
			display.value += this.value;
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
})


