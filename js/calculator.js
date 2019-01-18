	// JavaScript Document

	var _string = new Array();
	var _type;

	function typetoinput(num) {
		input = document.getElementById("input-box");
		if (input.name == "type") {
			input.value = " ";
			input.name = " ";
		}
		if (num != "." && input.value[0] == 0 && input.value[1] != ".") {
			input.value = num; //Reset input num
		} else if (num == "." && input.value.indexOf(".") > -1) {
			input.value = input.value; //Only one point allow input
		} else if (input.value == "Infinity" || input.value == "NaN") {
			input.value = "";
			input.value += num; //Splicing string
		} else {
			input.value += num;
		}
	}

	function operator(type) {
		switch (type) {
			case "clear":
				input.value = "0";
				_string.length = 0;
				/*document.getElementById("ccc").innerHTML="";
				for(i=0;i<_string.length;i++)
				{
					document.getElementById("ccc").innerHTML+=_string[i]+" "		
				}*/
				break;
			case "backspace":
				if (checknum(input.value) != 0) {
					input.value = input.value.replace(/.$/, '');
					if (input.value == "") {
						input.value = "0";
					}
				}
				break;
			case "opposite":
				if (checknum(input.value) != 0) {
					input.value = -input.value;
				}
				break;
			case "percent":
				if (checknum(input.value) != 0) {
					input.value = input.value / 100;
				}
				break;
			case "pow":
				if (checknum(input.value) != 0) {
					input.value = Math.pow(input.value, 2);
				}
				break;
			case "sqrt":
				if (checknum(input.value) != 0) {
					input.value = Math.sqrt(input.value);
				}
				break;
			case "plus":
				if (checknum(input.value) != 0) {
					_string.push(input.value);
					_type = "plus"
					input.value = "+";
					input.name = "type";
				}
				break;
			case "minus":
				if (checknum(input.value) != 0) {
					_string.push(input.value);
					_type = "minus"
					input.value = "-";
					input.name = "type";
				}
				break;
			case "multiply":
				if (checknum(input.value) != 0) {
					_string.push(input.value);
					_type = "multiply"
					input.value = "×";
					input.name = "type";
				}
				break;
			case "divide":
				if (checknum(input.value) != 0) {
					_string.push(input.value);
					_type = "divide"
					input.value = "÷";
					input.name = "type";
				}
				break;
			case "result":
				if (checknum(input.value) != 0) {
					_string.push(input.value);
					if (parseInt(_string.length) % 2 != 0) {
						_string.push(_string[_string.length - 2])
					}
					if (_type == "plus") {
						input.value = parseFloat(result(_string)[0]) + parseFloat(result(_string)[1]);
						input.name = "type"
					} else if (_type == "minus") {
						input.value = parseFloat(result(_string)[0]) - parseFloat(result(_string)[1]);
						input.name = "type"
					} else if (_type == "multiply") {
						input.value = parseFloat(result(_string)[0]) * parseFloat(result(_string)[1]);
						input.name = "type"
					} else if (_type == "divide") {
						input.value = parseFloat(result(_string)[0]) / parseFloat(result(_string)[1]);
						input.name = "type"
					}
					break;
				}

		}
	}

	function result(value) {
		var result = new Array;
		if (value.length % 2 == 0) {
			result.push((value[value.length - 2]));
			result.push((value[value.length - 1]));
			return (result);
		} else {
			result.push((value[value.length - 1]))
			result.push((value[value.length - 2]))

			return (result);
		}
	}

	function checknum(inputvalue) {
		if (inputvalue == "+" || inputvalue == "-" || inputvalue == "×" || inputvalue == "÷" || input.value == "0") {
			return 0;
		}
	}


	window.document.onkeydown = disableRefresh;

	function disableRefresh(evt) {
		evt = (evt) ? evt : window.event
		if (evt.keyCode) {
			if (evt.keyCode == 13) {
				operator('result')
			} else if (evt.keyCode == 8) {
				input.focus();
				window.event.returnValue = false;
				operator('backspace')
			} else if (evt.keyCode == 27) {
				operator('clear')
			} else if (evt.keyCode == 48) {
				typetoinput('0')
			} else if (evt.keyCode == 49) {
				typetoinput('1')
			} else if (evt.keyCode == 50) {
				typetoinput('2')
			} else if (evt.keyCode == 51) {
				typetoinput('3')
			} else if (evt.keyCode == 52) {
				typetoinput('4')
			} else if (evt.keyCode == 53) {
				typetoinput('5')
			} else if (evt.keyCode == 54) {
				typetoinput('6')
			} else if (evt.keyCode == 55) {
				typetoinput('7')
			} else if (evt.keyCode == 56) {
				typetoinput('8')
			} else if (evt.keyCode == 57) {
				typetoinput('9')
			} else if (evt.keyCode == 96) {
				typetoinput('0')
			} else if (evt.keyCode == 97) {
				typetoinput('1')
			} else if (evt.keyCode == 98) {
				typetoinput('2')
			} else if (evt.keyCode == 99) {
				typetoinput('3')
			} else if (evt.keyCode == 100) {
				typetoinput('4')
			} else if (evt.keyCode == 101) {
				typetoinput('5')
			} else if (evt.keyCode == 102) {
				typetoinput('6')
			} else if (evt.keyCode == 103) {
				typetoinput('7')
			} else if (evt.keyCode == 104) {
				typetoinput('8')
			} else if (evt.keyCode == 105) {
				typetoinput('9')
			} else if (evt.keyCode == 110) {
				typetoinput('.')
			} else if (evt.keyCode == 106) {
				operator('multiply')
			} else if (evt.keyCode == 107) {
				operator('plus')
			} else if (evt.keyCode == 111) {
				operator('divide')
			} else if (evt.keyCode == 109) {
				operator('minus')
			}
		}
	}
	
var len = $('#btn-list').children().length;


for (i = 0; i < len; i++) {
	switch (i) {
		case 0:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('clear');
			});
			break;

		case 1:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('opposite');
			});
			break;

		case 2:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('percent');
			});
			break;

		case 3:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('backspace');
			});
			break;

		case 4:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('7');
			});
			break;

		case 5:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('8');
			});
			break;

		case 6:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('9');
			});
			break;

		case 7:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('plus');
			});
			break;

		case 8:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('minus');
			});
			break;

		case 9:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('4');
			});
			break;

		case 10:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('5');
			});
			break;

		case 11:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('6');
			});
			break;

		case 12:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('multiply');
			});
			break;

		case 13:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('divide');
			});
			break;

		case 14:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('1');
			});
			break;

		case 15:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('2');
			});
			break;

		case 16:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('3');
			});
			break;

		case 17:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('pow');
			});
			break;

		case 18:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('sqrt');
			});
			break;

		case 19:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('0');
			});
			break;

		case 20:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				typetoinput('.');
			});
			break;

		case 21:
			$('#btn-list').children(':eq(' + i + ')').on('click', function () {
				operator('result');
			});
			break;



	}
}
	    