//Option A (Concatenation):
//1) Create array of all possible hex digits.
//2) Use for loop to create string of length 8 with each char in string being a number from 0 - 15.
//3) Replace each digit in string with value at index of the digit in the digit array.

//Option B:
//1) Find largest result value possible
//2) Randomly generate number between 0 and the largest value.
//3.a (toString conversion) Convert number to value via built in toString method.
//3.b (Manual conversion) Convert number to value algorithmically without built in method.

let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
let largest_hex = 4294967295;
let max_combinations = 2562890625;
let duplicates = [];
let illegal = [];
let dict = {}

// Retrieve the dictionary of words that we will use to compare our hex codes against.
fetch("parsed_dict.json")
	.then(response => {
		return response.json();
	})
	.then(jsondata => dict = jsondata);

// Simple helper function to easily generate random numbers.
random = (max) => {
	return Math.floor(Math.random() * max);
}

// Helper function to check if a hex code is valid or if it contains illegal words or patterns.
validate = (hex_code) => {
	let valid = false;
	// Check to see if the hex code has already been encountered and deemed as illegal.
	if (illegal.indexOf(hex_code) !== -1) {
		console.log('Code ' + hex_code + ' was generated, but it contains an illegal expression. A new code will be created:')
		return valid;
	}

	let repeating = true;
	let stepping_up = true;
	let stepping_down = true;
	// Check to see if the hex code repeats until the end of the code.
	for (let i = 2; i < hex_code.length - 1; i++) {
		if (hex_code[i] !== hex_code[i + 1]) {
			repeating = false;
		}
	}
	// Check to see if the hex code steps upward until the end of the code.
	for (let i = 2; i < hex_code.length - 1; i++) {
		if (Number(hex_code[i]) + 1 != Number(hex_code[i + 1])) {
			stepping_up = false;
		}
	}
	// Check to see if the hex code steps downward until the end of the code.
	for (let i = 2; i < hex_code.length - 1; i++) {
		if (Number(hex_code[i]) - 1 != Number(hex_code[i + 1])) {
			stepping_down = false;
		}
	}
	// If the hex code is not stepping up, stepping down, or repeating, then temporarily declare it valid.
	if (!stepping_up && !stepping_down && !repeating) {
		valid = true;
	}
	// The final validity check. 
	// If the hex code contains a word in the dictionary, declare the code invalid.
	for (let word in dict) {
		if (hex_code.includes(word)) {
			valid = false;
		}
	}
	// If the hex code is not valid, add the code to the illegal array, decrement the max number of combinations, and notify the user.
	if (valid === false) {
		illegal.push(hex_code);
		max_combinations -= 1;
		console.log('Code ' + hex_code + ' was generated, but it contains an illegal expression. A new code will be created:')
	}
	return valid;
}

concatenate_hex = () => {
	// Check to see if we have created every possible code. 
	// If we have, clear the duplicates array to allow duplicates to be made.
	if (duplicates.length === max_combinations) {
		duplicates = [];
	}
	let result = '0x';
	let hex = '';
	// Generate 8 numbers that correspond to the index of one of the hex digits in the digits array.
	// Retrieves the corresponding digit from the array and adds it to the hex code.
	for (let i = 0; i < 8; i++) {
		hex += digits[random(16)];
	}
	result += hex;
	// Checks to see if the generated code is either a duplicate or illegal. 
	// If it is not, displays the code and adds it to the duplicate array. Also updates the colors of the site.
	// If it is, runs the function again to generate a new code.
	if (duplicates.indexOf(result) === -1 && validate(result)) {
		duplicates.push(result);
		console.log('Your generated code is: ' + result);
		document.getElementById('display').innerText = result;
		document.body.style.backgroundColor = '#' + hex;
		document.getElementById('concatenate').style.backgroundColor = '#' + hex;
	} else {
		return concatenate_hex();
	}
	// Logs the duplicate and illegal code array for tracking.
	console.log('List of accumulated codes: ' + duplicates);
	console.log('List of accumulated illegal codes: ' + illegal);
	console.log('--');
}

convert_with_toString = () => {
	// Check to see if we have created every possible code. If we have, clear the duplicates array to allow duplicates to be made.
	if (duplicates.length === max_combinations) {
		duplicates = [];
	}
	let num = random(largest_hex);
	let result = '0x';
	// Converts the randomly generated number to base 16 hexadecimal code.
	let hex = num.toString(16).toUpperCase();
	// Pads the hex code so that it is 8 digits long.
	while (hex.length < 8) {
		hex = '0' + hex;
	}
	result += hex;
	// Checks to see if the generated code is either a duplicate or illegal. 
	// If it is not, displays the code and adds it to the duplicate array. Also updates the colors of the site.
	// If it is, runs the function again to generate a new code.
	if (duplicates.indexOf(result) === -1 && validate(result)) {
		duplicates.push(result);
		console.log('Your generated code is: ' + result);
		document.getElementById('display').innerText = result;
		document.body.style.backgroundColor = '#' + hex;
		document.getElementById('tostring').style.backgroundColor = '#' + hex;
	} else {
		return convert_with_toString();
	}
	// Logs the duplicate and illegal code array for tracking.
	console.log('List of accumulated codes: ' + duplicates);
	console.log('List of accumulated illegal codes: ' + illegal);
	console.log('--');
}

convert_manually = () => {
	if (duplicates.length === max_combinations) {
		duplicates = [];
	}
	let num = random(largest_hex);
	let result = '0x';
	let hex = '';
	let raw_hex = [];
	// Loops until the randomly generated number is 0, creating each base 10 digit of the hex code by modding the number by 16.
	while (num > 0) {
		raw_hex.unshift(num % 16);
		num = Math.floor(num / 16);
	}
	// Retrieves the corresponding base 16 digit from the digits array and adds it to the hex code.
	for (let i = 0; i < raw_hex.length; i++) {
		hex += digits[raw_hex[i]];
	}
	// Pads the hex code so that it is 8 digits long.
	while (hex.length < 8) {
		hex = '0' + hex;
	}
	result += hex;
	// Checks to see if the generated code is either a duplicate or illegal. 
	// If it is not, displays the code and adds it to the duplicate array. Also updates the colors of the site.
	// If it is, runs the function again to generate a new code.
	if (duplicates.indexOf(result) === -1 && validate(result)) {
		duplicates.push(result);
		console.log('Your generated code is: ' + result);
		document.getElementById('display').innerText = result;
		document.body.style.backgroundColor = '#' + hex;
		document.getElementById('manual').style.backgroundColor = '#' + hex;
	} else {
		return convert_manually();
	}
	// Logs the duplicate and illegal code array for tracking.
	console.log('List of accumulated codes: ' + duplicates);
	console.log('List of accumulated illegal codes: ' + illegal);
	console.log('--');
}