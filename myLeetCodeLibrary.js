//将一个单向链表的某个属性值导出为数组
function listToArray(rootNode,attr){//给出根节点以及要导出的属性名称
	var arr=[];
	function searchNode(rootNode){
		arr.push(rootNode[attr]);
		if(rootNode.next==null){
			return;
		}
		searchNode(rootNode.next);
	}
	searchNode(rootNode);
	return arr;
}


//根据某个属性的数组和单个节点的构造函数创建单向链表
function createList(arr,constructor,attr){//要给出属性值的数组、节点的构造函数和属性的名称
	var rootNode=new constructor();
	var i=0;
	function createNode(fatherNode){	
		fatherNode[attr]=arr[i];
		i++;
		if(i>=arr.length){
			return;
		}else{
			fatherNode.next=new constructor();
			createNode(fatherNode.next);	
		}						
	}
	createNode(rootNode);
	return rootNode;
}

//给出一个或两个数组中所有不同字符组成的数组
function difChars(arr,arr2){
	function notSame(dif,thisChar){
		for(var i=0;i<dif.length;i++){
			if(thisChar==dif[i]) return false;
		}	
		return true;
	}
	var dif=[];
	for(var i=0;i<arr.length;i++){
		if(notSame(dif,arr[i])){
			dif.push(arr[i]);
		}
	}
	if(arr2){
		for(var i=0;i<arr2.length;i++){
			if(notSame(dif,arr2[i])) dif.push(arr2[i]);
		}
	}
	return dif;
}



//字符串转数组，每个字符占一个索引位
function stringToArray(s){
		var arr=[];
		for(var i=0;i<s.length;i++){
			arr.push(s.charAt(i));
		}
		return arr;
}


function isHuiWen(arr,beginning,end){
	var i=(beginning==undefined)?0:beginning;
	var j=(beginning==undefined)?arr.length-i-1:end;
	while(i<=j) {
		if(arr[i]!=arr[j]) return false;
		i++;
		j--;
	}
	return true;	
}


//查找中位数（输入的数组必须有序，输入一个或两个都可）
function medianOfArrays(arr1,arr2){
	var medianNum=null;
	if(!arr2){
		if(arr1.length%2==0){
			medianNum=(arr1[arr1.length/2-1]+arr1[arr1.length/2])/2;
		}else{
			medianNum=arr1[Math.floor(arr1.length/2)]
		}
	}else{
		var length=arr1.length+arr2.length;
		var halfOflength=Math.floor(length/2);
		if(length%2==0){
			if(halfOflength-1>arr1.length){//第一个值在arr2取时
				var value1=arr2[halfOflength-1-arr1.length];
				var value2=arr2[halfOflength-arr1.length];
				medianNum=(value1+value2)/2;
			}else if(halfOflength=arr1.length){//从arr1、arr2各取一个
				medianNum=(arr1[arr1.length]+arr2[0])/2;
			}else{//都在arr1取时
				var value1=arr1[halfOflength-1];
				var value2=arr1[halfOflength];
				medianNum=(value1+value2)/2;
			}
		}else{
			if(halfOflength>arr1.length){
				medianNum=arr2[halfOflength-arr1.length]
			}else{
				medianNum=arr1[halfOflength]
			}
		}
	}
	return medianNum;
}







//建立自己的hashMap
function myMap(){
	this.length=0;
	this.key=new Object();	
}
myMap.prototype.push=function(s){
	// if(s instanceof Array){
	// 	for(var i=0;i<s.length;i++){
	// 		if(this.key[s[i]]){
	// 			this.key[s[i]]++;
	// 		} 
	// 		else{
	// 			this.key[s[i]]=1;
	// 			this.length++;
	// 		}
	// 	}
	// }else if(typeof(s)=="number"||s instanceof String){
		if(this.key[s]){
			 this.key[s]++;
		}
		else{	
			this.key[s]=1;
			this.length++;
		}
	// }
}

myMap.prototype.keysToArray=function(){
	var arr=[];
	for(key in this.key){
		if(this.key.hasOwnProperty(key)){
			arr.push(key);
		}
	}
	return arr;
};
myMap.prototype.duplicatesToArray=function(){
	var arr=[];
	for(key in this.key){
		if(this.key.hasOwnProperty(key)&&this.key[key]>1){
			arr.push(key);
		}
	}
	return arr;
};






function change_each_other(arr,l,r){
    // 交换两个变量的值
    var temp = arr[l]
    arr[l] = arr[r]
    arr[r] = temp
}

function quick_sort_partition(arr,left,right){
    var left_cur = left - 1
    var right_cur = right + 1
    var cur = left
    var item = getRandomInteger(left,right)
    while (cur <right_cur){
        if (arr[cur] < item){
            left_cur +=1               
            change_each_other(arr,cur,left_cur)            
            cur +=1             
        }else if(arr[cur] > item){                
            right_cur -=1
            change_each_other(arr,right_cur,cur)
        }else if(arr[cur] == item){
            cur +=1
        }
    }
    var result = [left_cur,right_cur]                                               
    return result
}
// 快速排序的非递归实现
function quick_sort(userArr){
	for(var i=0,arr=[];i<userArr.length;i++){
		arr.push(userArr[i])
	}	
    var queue = [] //先进先出的一个栈
    queue.unshift(0)
    queue.unshift(arr.length-1)
    while (queue.length > 0){
        var left = queue.pop()
        var right = queue.pop()
        result = quick_sort_partition(arr,left,right)
        if(left < result[0]){       
            queue.unshift(left)
            queue.unshift(result[0])
        }
        if(right > result[1]){           
            queue.unshift(result[1])
            queue.unshift(right)
        }
    }
    return arr
}



function __quickSort(num) {
    _quickSort(num, 0, num.length - 1); // 将整个num数组快速排序，left和right分别指向数组左右两端。
}
/**
 * 快速排序(非递归)
 */
 
	function _quickSort(num, left, right) {
    		var list = [[left, right]]; // 将[left,right]存入数组中，类似于递归入栈
    		while (list.length > 0) { // 若list不为空，循环弹出list最后一个数组进行快排
    		    var now = list.pop(); // 弹出list末尾。(也可用list.shift()		取出list第一个数组，但在数据量较大时，这种方式效率较低)
    		    if (now[0] >= now[1]) { // 若左右指针相遇，待排序数组长度小宇1，则无需进行快排(		注意不能写成now[0]==now[1]，这里now[0]是有可能大于now[1]的
    		        continue;
    		    }
    		    var i = now[0], j = now[1], flag = now[0]; // 以下与递归方法相同，请参考上面的递归详解
    		    while (i < j) {
    		        while (num[j] >= num[flag] && j > flag) j--;
    		        if (i >= j) {
    		            break;
    		        }
    		        while (num[i] <= num[flag] && i < j) i++;
    		        let temp = num[flag];
    		        num[flag] = num[j];
    		        num[j] = num[i];
    		        num[i] = temp;
    		        flag = i;
    		    }
    		    list.push([now[0], flag - 1]); // 		将flag左边数组作为待排序数组，只需将左右指针放入list即可。
    		    list.push([flag + 1, now[1]]); // 		将flag右边数组作为待排序数组，只需将左右指针放入list即可。
    }
}

function __quickSort(userArr) {
	for(var i=0,num=[];i<userArr.length;i++){
		num.push(userArr[i]);
	}
    _quickSort(num, 0, num.length - 1); 
    return num; // 将整个num数组快速排序，left和right分别指向数组左右两端。
  
}