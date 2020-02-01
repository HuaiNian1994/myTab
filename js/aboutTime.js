window.onload = function () {
	//设定title
	var nowDate = new Date();
	var hour = nowDate.getHours();
	var str = null;
	if (hour > 7 && hour < 12) {
		str = '早上好，HuaiNian';
	} else if (hour >= 12 && hour < 19) {
		str = '下午好，HuaiNian';
	} else if (hour <= 7) {
		str = '你该在床上的...下来干嘛';
	} else {
		str = '晚上好，HuaiNian';
	}
	$('title').html(str);


	var timeNow = new Date().toString();
	var timeRegExp = /\d{2}:\d{2}:\d{2}/;
	var hms = timeRegExp.exec(timeNow)[0];
	$('#clock').html(hms);
	setInterval(function () {
		timeNow = new Date().toString();
		timeRegExp = /\d{2}:\d{2}:\d{2}/;
		hms = timeRegExp.exec(timeNow)[0];
		$('#clock').html(hms);
		

	}, 1000);
}
$(document).ready(function () {
	$("body").css("display", "none");
	$("body").fadeIn(1000);
});



