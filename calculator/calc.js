// Get all the keys from document
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '/'];
var decimal = false;
var evalPressed = false; // was "=" the last button pressed

// onclick event on all keys
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// logic:
		// add btnValue to input
		// on eval key, evaluate equation with javascript's eval fn
		// on clear, erase everything 
		// on backspace, erase last btn

		// current input and last button value
		var input = document.querySelector('.display');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;

		// clear
		if(btnVal == 'CE') {
			input.innerHTML = '';
			decimal = false;
		}

		// backspace
		else if(btnVal == 'Oops...Backspace') {
			input.innerHTML = inputVal.substring(0, inputVal.length - 1);
			btnVal = "";
		}

		// evaluate
		else if(btnVal == '=') {
			evalPressed = true;
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// replace all instances of x with * for js eval fn 
			equation = equation.replace(/x/g, '*');
			
			try {
				if(equation) {
					// Taking care of division by 0
					if (!isFinite(eval(equation))) 
						input.innerHTML = "Not a number";
					else
						input.innerHTML = eval(equation); // is this okay?
				}
			} 
			catch(e) {
				alert(equation + ": Is that a valid math equation? Please clear by clicking on the CE key and try again");
			}

			decimal = false;
		} // end evaluation
		
		// appending: operator, if input is empty or it's a minus for negation. 
		else if(operators.indexOf(btnVal) > -1) {
			// operator
			var lastChar = inputVal[inputVal.length - 1];
			evalPressed = false;
			
			// negation
			if(inputVal != '' || inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			decimalAdded =false;
		}
		
		// appending: decimal if one hasn't yet been added. ignored otherwise.
		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// appending: if = was last pressed, this key (number) starts a new equation.
		// else, just append to current input
		else {
			if(evalPressed) {
				input.innerHTML = btnVal;
				evalPressed = false;
			}
			else 
				input.innerHTML += btnVal;
		}
		
		// prevent page jumps
		e.preventDefault();
	} 
}