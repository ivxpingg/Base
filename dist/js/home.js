
//登录

//手机号码验证
function loginValidate(){
    var constraints = {
        telephone: {
            presence: true,
            telephone: {
                message: "^请输入正确电话号码"
            }
        }
    };
    var attribute = document.querySelector("#forms");
    var errors = validate(attribute, constraints);
    
    for (var attr in errors) {
        alert(errors[attr]);
        return false;
    }
    return true;
};

//验证验证码
function codeValidate(){
    var constraints = {
        txtCode: {
            presence: true
        }
    };
    var attribute = document.querySelector("#forms");
    var errors = validate(attribute, constraints);
    
    for (var attr in errors) {
        alert(errors[attr]);
        return false;
    }
    return true;
};

//验证码倒计时
function timing (seconds){

    var dom = document.getElementById("gcode");
    var slass = dom.className;
    
    if(dom.className.indexOf('active') > 0) return;

    dom.className = slass + " active";

    dom.innerHTML = seconds + '秒后重新获取';
    var t = setInterval(function(){       
        if(seconds > 0){
       	    --seconds;
             dom.innerHTML = seconds + '秒后重新获取';            
        }
        else {       	    
       	    dom.innerHTML = '获取验证码';
       	    dom.className = dom.className.replace('active', '');
       	    clearInterval(t);
       	}
   }, 1000);
};

//获取验证码
function getCode(){
 	
    if(loginValidate()){
        console.log('获取验证码');
        timing(60);
    }

};

//登录
function login(){
	if(loginValidate() && codeValidate()){
        console.log('登录');
    }
};



//下载
function download(){
    var ua = navigator.userAgent.toLowerCase();	
	if (/iphone|ipad|ipod/.test(ua)) {
		console.log('IOS系统');	
	} else if (/android/.test(ua)) {
		console.log('安卓系统');
	}
	else{
		console.log('无法识别');
	}
};


