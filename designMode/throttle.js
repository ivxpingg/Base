// 函数节流

var throttle = function( fn, interval ){
	var _self = fn,         //保存方法
	    timer,             //定时器
	    firstTime = true;  //是否是第一次调用

	    return function(){
            var args = arguments,
                _me = this;

	    	if( firstTime ){
                _self.apply(_me, args);
                return firstTime = false;
	    	}

	    	if( timer ){
	    		return false;
	    	}

	    	timer = setTimeout(function(){
                clearTimeout(timer);
                timer = null;
                _self.apply(_me, args);
	    	}, interval || 500);
	    };
};

var t = 0;

var fn = throttle(function(){console.log('a');}, 3000);

setInterval(fn, 1000);
setInterval(function(){console.log(t++);}, 1000);
