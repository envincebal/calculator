var display = document.querySelector(".result");
var number = document.getElementsByClassName("number-button");
var clear = document.getElementsByClassName("clear-button");
var math = document.getElementsByClassName("math-button");
var operator = document.getElementsByClassName("operator-button");

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
		display.value += this.value;

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

for (var i = 0; i < math.length; i++) {
	math[i].addEventListener("click", function(){
			display.value = eval(display.value);


	})
}

