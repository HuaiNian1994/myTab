//*****************************************元素节点*****************************************
var enginesNode = document.getElementsByClassName("engines")[0];
var search_fatherNode = document.getElementById("search_father");
var linksNode = document.getElementById("links");
var links_LiNodes = linksNode.getElementsByTagName("li");
var addLinkNode = document.getElementsByClassName("addLink")[0];
var contentNode = document.getElementsByClassName("content")[0];
var upArrowNode = document.getElementsByClassName("upArrow")[0];
var downArrowNode = document.getElementsByClassName("downArrow")[0];
var pageIndexNode = document.getElementsByClassName("pageIndex")[0];
var totalPageNode = document.getElementsByClassName("totalPage")[0];
//*****************************************常量*****************************************
const defaultHrefs = {
	google: {
		URL: "https://www.google.com/ncr",
		style: "background: url('../images/google.png') 50% 50% / cover;"
	},
	github: {
		URL: "https://github.com/",
		style: "background:url('../images/github.png') 50% 50%/cover;"
	},
	w3school: {
		URL: "http://www.w3school.com.cn/",
		style: "background:url('../images/w3school.png') 50% 50%/cover;"
	},
	MDN: {
		URL: "https://developer.mozilla.org/zh-CN/",
		style: "background:url('../images/MDN.png') 50% 50%/cover;"
	},
	runoob: {
		URL: "http://www.runoob.com/",
		style: "background:url('../images/runoob.png') 50% 50%/cover;"
	},
	wechat_public_platform: {
		URL: "https://mp.weixin.qq.com/",
		style: "background:url('../images/wechat public platform.png') 50% 50%/cover;"
	},
	LeetCode: {
		URL: "https://leetcode-cn.com/",
		style: "background:url('../images/LeetCode.png') 50% 50%/cover;"
	},

	baidu: {
		URL: "https://www.baidu.com",
		style: "background:url('../images/baidu.png') 50% 50%/cover;"
	}
}
const engineList = {
	Bing: "&#xe9ac;",
	Yahoo: "&#xe61a;",
	baidu: "&#xe6b6;",
	github: "&#xe709;",
	google: "&#xe8f0;",
	wikipedia: "&#xe673;",
	sogou: "&#xe8c9;",
	mozilla: "&#xeccf;",
	duckduckgo: "&#xe62e;"
}
const searchLinks = {
	Bing: {
		link: "https://cn.bing.com/search?",
		query: "q"
	},
	Yahoo: {
		link: "https://us.search.yahoo.com/yhs/search?",
		query: "p"
	},
	baidu: {
		link: "https://www.baidu.com/s?",
		query: "wd"
	},
	github: {
		link: "https://github.com/search?",
		query: "q"
	},
	google: {
		link: "https://www.google.com/search?",
		query: "q"
	},
	wikipedia: {
		link: "https://en.wikipedia.org/wiki/Special:Search?",
		query: "search"
	},
	sogou: {
		link: "https://www.sogou.com/web?",
		query: "query"
	},
	mozilla: {
		link: "https://developer.mozilla.org/zh-CN/search?",
		query: "q"
	},
	duckduckgo: {
		link: "https://duckduckgo.com/?",
		query: "q"
	}
}




//*****************************************变量*****************************************
var setLinkTimer = []; //含有每一个书签的设置按钮的
var haveLinkMask = []; //记录书签是否被linkMask覆盖
var lastHoverA = null; //最后一次onblur的书签
var linksTopPosition = []; //记录要达到每一页links所需要的top定值
var INDEX = 0; //links中li的总数
var nowPage = 1;//书签初始页是第一页
var totalPage = 2;//初始有两页书签
//*****************************************封装函数****************************************
var removeNode = aim => { //删除节点
	aim.parentNode.removeChild(aim);
}
var createSettingNode = father => { //创建设置选项
	var setLinkNode = document.createElement("span");
	setLinkNode.className = "setLink"
	setLinkNode.innerHTML = "&#xe645;"
	father.appendChild(setLinkNode);
}
var addLinkMask = node => { //linkMask作谁的兄弟，就传入谁
	var valueString = "",
		URLString = "";
	if (node.tagName == "A") {
		valueString = "value=" + node.getAttribute("siteName");
		URLString = "value=" + node.getAttribute("href");
	}
	var linkMask = document.createElement("div");
	linkMask.className = "linkMask"
	linkMask.innerHTML =
		`<div><label>Name</label><input ${valueString} placeholder="Input site name"></input></div><div><label>URL</label><input ${URLString} placeholder="Begin with https://"></input></div><div><aside class=\"quit\">&#xe6c9;</aside><aside class=\"clear\">&#xe70a;</aside><aside class=\"done\">&#xe7b7;</aside></div>`;
	node.parentNode.appendChild(linkMask);
	haveLinkMask[parseInt(node.getAttribute("index"))] = true;
	setTimeout(() => {
		node.parentNode.getElementsByClassName("linkMask")[0].style.opacity = 1;
	}, 100);
}


//获得一个节点的CSS属性数值，是moveYAnimation的工具函数
function getStyleValue(node, name) {
	return parseInt(getComputedStyle(node)[name].replace("px", ""));
};
//Y方向运动函数，支持三次贝塞尔曲线，params是一个数组，意为两个确定点的坐标[x1,y1,x2,y2]
var moveYAnimation = (node, aimTopValue, duration, stepTime, params) => {
	clearInterval(node.moveYAnimationTimer); //不允许动画重叠
	//默认值
	duration = duration ? duration : 300;
	stepTime = stepTime ? stepTime : 5;
	if (params == "linear") {
		params = [0, 0, 1, 1];
	} else if (params instanceof Array) {
		for (let i = 0; i < 4; i++) {
			if (!(params[i] <= 1)) {
				params = [.06, .7, .27, 1];
				console.log("动画参数错误，将采用默认参数[.06, .7, .27, 1]");
				break;
			}
		}
	} else {
		params = [.06, .7, .27, 1];
	}
	var cubicBezier = BezierEasing(...params)
	var initialTopValue = getStyleValue(node, "top");
	var nowTopValue = initialTopValue;
	var distance = aimTopValue - initialTopValue;
	var aStep = distance / (duration / stepTime);
	var pastDistance = 0; //意为假想为线性运动时的理论距离
	node.moveYAnimationTimer = setInterval(() => { //步进
		pastDistance += aStep;
		nowTopValue = initialTopValue + distance * cubicBezier(pastDistance / distance);
		node.style.top = nowTopValue + "px";
	}, stepTime)
	setTimeout(() => { //终止
		clearInterval(node.moveYAnimationTimer)
		node.style.top = aimTopValue + "px";
		console.log("moveYAnimation:" + duration + "毫秒已到")
	}, duration)
}
var updateLinksTopPosition = () => {
	linksTopPosition = []; //清空
	for (let i = 0; i < links_LiNodes.length; i++) { //计算要达到每一页links所需要的top定值
		linksTopPosition.push(-(links_LiNodes[0].offsetHeight * 2 + 0.048 * contentNode.offsetWidth) * i)
	}
}
var updateTotalPage = () => {
	var lastTotalPage = totalPage;
	totalPage = Math.ceil(links_LiNodes.length / 8);
	totalPageNode.innerText = "Total: " + totalPage;
	return totalPage - lastTotalPage;//返回页数的增量
}
var updateNowPage = (newIndex) => {
	if (newIndex > totalPage) {
		newIndex = totalPage;
	} else if (newIndex <= 0) {
		newIndex = 1;
	}
	pageIndexNode.value = newIndex;
	nowPage = newIndex;
}
var links_LiNodesLengthChanged = turn => {
	var delta = updateTotalPage();
	updateLinksTopPosition();
	updateNowPage(nowPage + delta);
	if (turn) moveYAnimation(linksNode, linksTopPosition[nowPage - 1]);
}


var saveLinksContent = () => {
	//待实现：saveLinksBackground();
	var href = null, siteName = null, style = null, index = null, obj = {}, arr = [];
	for (let i = 0; i < links_LiNodes.length - 1; i++) {
		href = links_LiNodes[i].children[0].getAttribute("href");
		siteName = links_LiNodes[i].children[0].getAttribute("siteName");
		style = links_LiNodes[i].children[0].getAttribute("style");
		index = links_LiNodes[i].children[0].getAttribute("index");
		obj = { href, siteName, style, index }
		arr.push(obj)
	}
	let list = JSON.stringify(arr)
	console.log(list);

	localStorage.setItem("customLinks", list);//localStorage不支持存储对象，待改进：拆分存储
}
var saveLinks = () => {
	// 待实现：saveLinksPosition();
	saveLinksContent();
}
var saveSearchEngine = engineName => {
	localStorage.setItem("selectedEngineName", engineName);
}
var saveCustomSettings = () => {//本函数用来展示需要存储的数据，不调用。
	saveSearchEngine();
	saveLinks();
	// 待实现：savePageground();
	//待实现：saveWeatherComponent();
	//待实现：savePageControler();
}

var initializeNodes = () => {
	//创建书签列表
	if (localStorage.getItem("customLinks")) {
		let list = JSON.parse(localStorage.getItem("customLinks"));
		for (let i = 0; i < list.length; i++) {
			let liNode = document.createElement("li");
			let aNode = document.createElement("a");
			aNode.setAttribute("href", list[i].href);
			aNode.setAttribute("style", list[i].style);
			aNode.setAttribute("index", INDEX++);
			aNode.setAttribute("siteName",list[i].siteName);
			aNode.className = "customLink";
			if(!/url/.test(list[i].style)) aNode.innerHTML=list[i].siteName;
			liNode.appendChild(aNode);
			linksNode.insertBefore(liNode, addLinkNode.parentNode);
			setLinkTimer.push(null);
			haveLinkMask.push(false);
		}
	} else {
		for (key in defaultHrefs) {
			let liNode = document.createElement("li");
			let aNode = document.createElement("a");
			aNode.setAttribute("href", defaultHrefs[key].URL);
			aNode.setAttribute("style", defaultHrefs[key].style);
			aNode.setAttribute("index", INDEX++);
			aNode.setAttribute("siteName", key);
			aNode.className = "customLink";
			liNode.appendChild(aNode);
			linksNode.insertBefore(liNode, addLinkNode.parentNode);
			setLinkTimer.push(null);
			haveLinkMask.push(false);
		}
	}
	addLinkNode.setAttribute("index", INDEX);
	links_LiNodesLengthChanged(false);
	//创建搜索图标列表
	for (key in engineList) {
		var node = document.createElement("li");
		node.setAttribute("engineName", key)
		node.innerHTML = engineList[key]
		node.className = "enginePic"
		enginesNode.appendChild(node);
	}
}
var initializeSearchEngine = () => {//设置历史中最后一次的选择的搜索引擎
	var enginename = null;
	if (enginename = localStorage.getItem("selectedEngineName")) {
		search_fatherNode.action = searchLinks[enginename].link;
		glass.innerHTML = engineList[enginename]
		search_fatherNode.children[2].name = searchLinks[enginename].query;
	}

}

//*****************************************页面初始化*****************************************
window.onload = () => {
	initializeNodes();
	initializeSearchEngine();
	//加载时页面淡入
	document.getElementsByTagName("body")[0].style.opacity = 1;
}








//*****************************************基于事件的业务逻辑*****************************************

//搜索引擎更换功能
enginesNode.onclick = (e) => {
	if (e.target.className == "enginePic") {
		var engineName = e.target.getAttribute("enginename");
		search_fatherNode.action = searchLinks[engineName].link;
		glass.innerHTML = engineList[engineName]
		search_fatherNode.children[2].name = searchLinks[engineName].query;
		saveSearchEngine(engineName);
	}
}
//设定搜索引擎更换动画效果
var glass = search_fatherNode.children[0];
var timer = null;
glass.onmouseover = () => {
	glass.style.color = "white";
}
glass.onclick = () => {
	enginesNode.style.opacity = 1;
	enginesNode.style.transform = "scaleX(1)";
}
glass.onmouseout = () => {
	glass.style.color = "rgb(155, 155, 155)";
	timer = setTimeout(() => {
		enginesNode.style.opacity = 0;
		enginesNode.style.transform = "scaleX(0)";
	}, 500);
}
enginesNode.onmouseover = () => {
	clearTimeout(timer);
	enginesNode.style.opacity = 1;
	enginesNode.style.transform = "scaleX(1)";
	glass.style.color = "white";
}
enginesNode.onmouseout = () => {
	glass.style.color = "rgb(155, 155, 155)";
	timer = setTimeout(() => {
		enginesNode.style.opacity = 0;
		enginesNode.style.transform = "scaleX(0)";
	}, 500);
}





//书签添加功能
addLinkNode.onclick = e => {
	addLinkMask(e.target)
}


//书签设置按钮动画
linksNode.onmouseover = (e) => {
	if (e.target.tagName == "A") {
		if (e.target.children[0] === undefined) {
			createSettingNode(e.target);
		}
		if (e.target == lastHoverA) { //继续显示setLink按钮
			clearInterval(setLinkTimer[parseInt(e.target.getAttribute("index"))]);
		} else {
			lastHoverA = e.target;
		}
		e.target.children[0].style.cssText = "transform:scale(1)";
	}
	if (e.target.className == "setLink") { //继续显示setLink按钮
		var index = parseInt(e.target.parentNode.getAttribute("index"));
		clearInterval(setLinkTimer[index]);
	}
}


linksNode.onmouseout = (e) => {
	if (e.target.tagName == "A") {
		setLinkTimer[parseInt(e.target.getAttribute("index"))] = setTimeout(() => {
			e.target.children[0].style.cssText = "transform:scale(0)"
		}, 200);
	}
	if (e.target.className == "setLink") {
		e.target.style.cssText = "transform:scale(0)"
	}
}

//书签设置功能
linksNode.onclick = (e) => {
	if (e.target.className == "setLink") { //点击设置按钮时
		e.preventDefault();
		if (haveLinkMask[parseInt(e.target.parentNode.getAttribute("index"))] == false) {
			addLinkMask(e.target.parentNode);
		}
	} else if (e.target.tagName == "ASIDE") {
		var thisLinkMask = e.target.parentNode.parentNode;
		var thisLinkMask_Name = thisLinkMask.children[0].children[1];
		var thisLinkMask_URL = thisLinkMask.children[1].children[1];

		if (e.target.className == "clear") { //清空按钮
			thisLinkMask_URL.value = "";
			thisLinkMask_Name.value = "";
		} else if (e.target.className == "done") { //完成按钮
			if (thisLinkMask_URL.value.replace(/\s/gi, "") != "" && thisLinkMask_Name.value.replace(/\s/gi, "") !=
				"") { //如果输入不为空
				if (e.target.parentNode.parentNode.parentNode.children[0].tagName == "A") { //如果是为了更改书签
					thisLinkMask.parentNode.children[0].innerHTML = thisLinkMask_Name.value;
					thisLinkMask.parentNode.children[0].setAttribute("siteName", thisLinkMask_Name.value);
					thisLinkMask.parentNode.children[0].style.cssText = "background-color:rgba(255,255,255,0.8)";
					thisLinkMask.parentNode.children[0].setAttribute("href", thisLinkMask_URL.value);
					haveLinkMask[parseInt(thisLinkMask.parentNode.children[0].getAttribute("index"))] = false;
					removeNode(thisLinkMask);
				} else { //如果是为了添加书签
					var liNode = document.createElement("li");
					var aNode = document.createElement("a");
					aNode.setAttribute("href", thisLinkMask_URL.value);
					aNode.setAttribute("style", "background-color:rgba(255,255,255,0.8)");
					aNode.setAttribute("index", INDEX++);
					aNode.setAttribute("siteName", thisLinkMask_Name.value);
					aNode.className = "customLink";
					aNode.innerHTML = thisLinkMask_Name.value;
					liNode.appendChild(aNode);
					linksNode.insertBefore(liNode, addLinkNode.parentNode);
					links_LiNodesLengthChanged(true);
					setLinkTimer.push(null);
					haveLinkMask.push(false);
					haveLinkMask[parseInt(thisLinkMask.parentNode.children[0].getAttribute("index"))] = false;
					addLinkNode.setAttribute("index", INDEX);
					removeNode(thisLinkMask);
				}
				saveLinksContent();
			}
		} else if (e.target.className == "quit") { //退出按钮
			haveLinkMask[parseInt(thisLinkMask.parentNode.children[0].getAttribute("index"))] = false;
			removeNode(thisLinkMask);
		}

	}
}


//只能点一次，动画结束前不能再点
upArrowNode.onclick = () => {
	updateNowPage(nowPage - 1)
	moveYAnimation(linksNode, linksTopPosition[nowPage - 1])

}
downArrowNode.onclick = () => {
	updateNowPage(nowPage + 1)
	moveYAnimation(linksNode, linksTopPosition[nowPage - 1])
}



//输入数值的页面跳转
pageIndexNode.onkeydown = (e) => {
	if (e.key == "Enter") {
		var input = parseInt(pageIndexNode.value)
		if (input) {
			updateNowPage(input);
			moveYAnimation(linksNode, linksTopPosition[nowPage - 1]);
		}
	}
}