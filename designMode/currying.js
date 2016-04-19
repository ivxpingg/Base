//高阶函数  函数柯里化(function currying)

// currying 又称部分求值。一个currying 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，
// 而是继续返另一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传
// 入的所有参数都会被一次性用于求值。

//例子1:
// 假设我们要编写一个计算每月开销的函数。在每天结束之前，我们都要记录今天花掉了多少钱。

var monthlyCost = 0;

var cost = function(money){
	monthlyCost += money;
}

cost(100);
cost(200);
cost(300);

console.log(monthlyCost);


//例子进化

var cost2 = (function(){
	var args = [];

	return function(){
		if(arguments.length === 0){
			var money = 0;
			for(var i = 0, l = args.length; i < l; i++){
				money += args[i];				
			}
			return money;
		}
		else{
			[].push.apply(args, arguments);
		}
	}
})();

cost2(100);
cost2(200);
cost2(300);

console.log(cost2());


//例子进化

var currying = function( fn ){
    var args = [];

    return function(){
    	if(arguments.length === 0){
    		return fn.apply( this, args );
    	}
    	else{
    		[].push.apply( args, arguments );
    		return arguments.callee;
    	}
    };
};

var cost3 = (function(){
    var money = 0;
    return function(){
    	for( var i = 0, l = arguments.length; i < l; i++){
    		money += arguments[i];
    	}
    	return money;
    };
})();

var cost3 = currying( cost3 );  // 转化成currying函数

var d = cost3(100);
cost3(200);
cost3(300);

console.log(cost3());


//看懂这段代码，首先要理解什么是高阶函数，简单的来说高阶函数至少满足下列条件之一：
// 1.函数可以作为参数被传递
// 2.函数可以作为返回值输出
