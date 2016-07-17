$(document).ready(function() {

	var qnNum = 0;
	var userAnswer;
	var score = 0;
	
	$('#strtQzButton').click(function() {
		startQuiz(qnNum, userAnswer, score);
	});
	 
	$('#retakeButton').click(function() {
		startQuiz(qnNum, userAnswer, score);
	});

});

var Qn = {
	qn: '',
	chc1: '',
	chc2: '',
	chc3: '',
	chc4: '',
	ans: '',
	dscrp: ''
};

var qn1 = Object.create(Qn);
var qn2 = Object.create(Qn);
var qn3 = Object.create(Qn);
var qn4 = Object.create(Qn);
var qn5 = Object.create(Qn);

qn1.qn = 'The following are JavaScript data types except?';
qn1.chc1 = 'Character';
qn1.chc2 = 'String';
qn1.chc3 = 'Number';
qn1.chc4 = 'Function';
qn1.ans = 'chc1';
qn1.dscrp = 'JavaScript does not have a character (char) data type for individual characters. Instead, it uses string data type to store characters and sequences of characters that form a text.';

qn2.qn = 'What is the mode of JavaScript that prevents from unintended creation of global variables?';
qn2.chc1 = 'Safe mode';
qn2.chc2 = 'Strict mode';
qn2.chc3 = 'All of the above';
qn2.chc4 = 'None of the above';
qn2.ans = 'chc2';
qn2.dscrp = 'JavaStript can be used in strict mode, which is a built in mechanism that prevents from unintentionally declaring global variable.';

qn3.qn = 'A function that is a property of an object is called?';
qn3.chc1 = 'Function';
qn3.chc2 = 'Object function';
qn3.chc3 = 'Method';
qn3.chc4 = 'All of the Above';
qn3.ans = 'chc3';
qn3.dscrp = 'A method is essentially a function that is a property of an object. The main difference is that a function can be invoked on its own, while a call to a method needs to reference its object.';

qn4.qn = 'What can be used to create an object that inherits its properties from a parent object?';
qn4.chc1 = 'Object.create()';
qn4.chc2 = 'Factory functions';
qn4.chc3 = 'Constructor functions';
qn4.chc4 = 'All of the above';
qn4.ans = 'chc4';
qn4.dscrp = 'JavaScript allows using all the 3 methods of creating an object that inherits from a parent object.';

qn5.qn = 'Which of the following is the keyword used as a placeholder that points to the current object?';
qn5.chc1 = 'self';
qn5.chc2 = 'current';
qn5.chc3 = 'this';
qn5.chc4 = 'None of the above';
qn5.ans = 'chc3';
qn5.dscrp = '\'this\' is a keyword used in JavaScript to point to the current object. It\'s a powerful tool, but a tricky one to use.';

var qns = new Array(null, qn1, qn2, qn3, qn4, qn5);

function startQuiz(qnNum, userAnswer, score) {
	qnNum = 0;
	userAnswer;
	score = 0;
	$('.score').hide();
	$('.landingPage').hide();
	$('.content').show();
	$('#nextButton').html('Next');
	qnNum = displayNextQuestion(qnNum);
	activateAnswerSelection(qnNum, userAnswer, score);
}

function styleSelected(id, qn) {
	resetAnswerStyle(qn);
	$('#'+id).css('color', 'white');
}

function resetAnswerStyle(qn) {
	$('.ans').css('color', 'black');
	$('.ans').css('background-color', '');
	disableSubmit();
	if(qn == qns.length - 1) {
		$('#nextButton').hide();
	}
}

function styleAnswer(id, qn, right) {
	if (right) {
		$('#'+qns[qn].ans).css('background-color', '#4dff4d');
		$('#stt'+qn).css('background-color', '#4dff4d');
	}
	else {
		$('#'+qns[qn].ans).css('background-color', '#4dff4d');
		$('#'+id).css('background-color', '#ff4d4d');
		$('#stt'+qn).css('background-color', '#ff4d4d');
	}
}

function displayQuestion(qn) {
	$('#question').html(qns[qn].qn);
	$('#chc1').html(qns[qn].chc1);
	$('#chc2').html(qns[qn].chc2);
	$('#chc3').html(qns[qn].chc3);
	$('#chc4').html(qns[qn].chc4);
	$('.state').removeClass('current');
	$('#stt'+qn).addClass('current');

}

function displayNextQuestion(qn) {
	if (qn < (qns.length - 1)) {
		qn++;
		displayQuestion(qn);
		return qn;
	}
	return 0;
}

function displayDescription(qn) {
	$('.dscrpPg').html(qns[qn].dscrp)
}

function displayScore(score) {
	var scr = score;
	$('.content').hide();
	$('.score').show();
	$('#crct').html(scr);
	$('#ttlQn').html(qns.length - 1);
	$('.state').css('background-color', '#e0e0d1');


}
 
function evaluateAnswer(qn, userAnswer) {
	console.log(qn);
	if (qns[qn].ans === userAnswer) {
		return true;
	}
	else {
		return false;
	}
}

function setScore(scr, right) {
	if (right) {
		scr++;
	}
	return scr;
}

function disableSubmit() {
	$('#submitButton').off('click');
}

function disableAnswerSelection() {
	$('.ans').off('click');
}

function disableNextButton() {
	$('#nextButton').off('click');
}

function activateAnswerSelection(qnNum, userAnswer, score) {
	$('.ans').on('click', function(){
		userAnswer = this.id;
		styleSelected(userAnswer, qnNum);
		activateSubmit(qnNum, userAnswer, score);
		return userAnswer;
	});
}

function activateSubmit(qnNum, userAnswer, score) {
	$('#submitButton').on('click', function() {
		console.log(qnNum);
		disableSubmit();
		disableAnswerSelection();
		var correct = evaluateAnswer(qnNum, userAnswer);
		score = setScore(score, correct);
		styleAnswer(userAnswer, qnNum, correct);
		$('.description').show();
		displayDescription(qnNum);
		activateNextButton(qnNum, userAnswer, score);
		if (qnNum == qns.length - 1) {
			$('#nextButton').html('See Score');
			$('#nextButton').show();
		}
	});
}

function activateNextButton(qnNum, userAnswer, score) {
	$('#nextButton').on('click', function(){
		disableNextButton();
		$('.description').hide();
		qnNum = displayNextQuestion(qnNum);
		resetAnswerStyle(qnNum);
		userAnswer = activateAnswerSelection(qnNum, userAnswer, score);
		if (qnNum == 0) {
			displayScore(score);
		}
	})
}