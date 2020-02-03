//设定title
var nowDate = new Date();
var hour = nowDate.getHours();
var str = null;
var titleNode = document.getElementsByTagName("title")[0];
var clockNode = document.getElementById("clock");
if (hour > 7 && hour < 12) {
	str = '早上好，HuaiNian';
} else if (hour >= 12 && hour < 19) {
	str = '下午好，HuaiNian';
} else if (hour <= 7) {
	str = '你该在床上的...下来干嘛';
} else {
	str = '晚上好，HuaiNian';
}
titleNode.innerText = str;

function setTime() {
	timeNow = new Date().toString();
	timeRegExp = /\d{2}:\d{2}:\d{2}/;
	hms = timeRegExp.exec(timeNow)[0];
	clockNode.innerText = hms;
}
setTime(); 
setInterval(function () {
	setTime();
}, 500);





