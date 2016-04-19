// 分时函数

//例子说明
/* QQ好友列表， 一个好友代表用一个节点标表示， 
  当我们要在页面中渲染这个列表的时候，可能要一次性往页面中创建成百上千个节点。
  在短时间内往页面中大量添加DOM节点显然会让浏览器吃不消，我们往往会看到的结果
  就是浏览器的卡顿甚至假死。

*/

/*解决方案
   下面是一个timeChunk函数，timeChunk函数让创建节点的工作分批进行,比如1秒钟创建1000个节点，
   改为每隔200毫秒创建8个节点
*/


/*
* param: arg: 创建节点需要用到的数据
* fn： 封装了创建节点逻辑的函数
* count：每一批创建节点的数量
*/
var timeChunk = function( ary, fn, count ){
    var obj,
        t;    //定时器

    var start = function(){
    	for(var i = 0; i < Math.min(count || 1, ary.length); i++){    
    		var obj = ary.shift();
    		fn(obj);
    	}
    }  

    return function(){
    	t = setInterval(function(){
        if(ary.length === 0){
        	return clearInterval( t );
        }
        start();
        }, 200);
    };
};

var ary = [];

for(var i = 0; i < 1000, i++){
	ary.push(i);
}

var renderFriendList = timeChunk(ary, function(n){
	var div = document.createElement('div');
	div.innerHTML = n;
	docuemnt.body.applyChild(div);
}, 8);

renderFriendList();

//
//Math.min(); 返回参数的最小值， 参数中最小的值。如果没有参数，则返回 Infinity。如果有某个参数为 NaN，或是不能转换成数字的非数字值，则返回 NaN。 
// Math.min() => Infinity  无穷大
// Math.min(NaN) => NaN 
// Math.min(1)  ==> 1
// Math.min(4,2,3) ==> 2
// Math.min(3, 'd') ==> NaN