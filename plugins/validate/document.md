#使用文档

## 目录

> ####[说明](#0)

- 

> ####[约束](#1)

- 

> ####[验证方法](#2)

- [异步验证](#2.1)
- [单个值验证](#2.2)
- [嵌套验证](#2.3)
- [默认参数](#2.4)

> ####[写自己的验证](#3)

- [写一个异步验证](#3.1)

> ####[验证](#4)

- [Date](#4.1)
- [Datetime](#4.2)
- [Email](#4.3)
- [Equality](#4.4)
- [Exclusion](#4.5)
- [Format](#4.6)
- [Inclusion](#4.7)
- [Length](#4.8)
- [Numericality](#4.9)
- [Presencd](#4.10)
- [URL](#4.11)

> ####[组件](5)

- [captitalize](#5.1)
- [cleanAttributes](#5.2)
- [collectFormValues](#5.3)
- [contains](#5.4)
- [extend](#5.5)
- [format](#5.6)
- [getDeepObjectValue](#5.7)
- [isArray](#5.8)
- [isDate](#5.9)
- [isDefined](#5.10)
- [isDomElement](#5.11)
- [isEmpty](#5.12)
- [isFunction](#5.13)
- [isInteger](#5.14)
- [isNumber](#5.15)
- [isObject](#5.16)
- [isPromise](#5.17)
- [isString](#5.18)
- [prettify](#5.19)
- [result](#5.20)

----

#### <span id="0"> 0.说明</span>

表单验证插件，该插件不依赖于任何组件，可单独使用。

-----

#### <span id="1">1.约束</span>

constraints 有以下格式

	{
		<attribute>: {
	        <validator name>: <validator options> 
	    }	
	}

如果验证不通过，会自动返回默认错误信息，你也可以通过指定message选项来设置返回的错误信息。

message属性也可以是一个函数在检索message的时候会被调用，会被当成一个正常的message使用(属性名作为前缀等)

如果message属性不是一个函数也不是一个字符串,只是一个简单返回is。

有时候验证的字段是依赖于input本身，validate.js允许在constraints参数中validators对象和validator参数可以是一个函数。

	var constraints = {
	    creditCardNumber: {
	        presence: true,
	        format: {
	            pattern: /^(34|37|4|5[1-5]).*$/,
	            message: function(value, attribute, validatorOptions, attributes, globalOptions){
	                return  validate.format("^%{num} is not a valid credit card number", {num: value});
	            }
	        },
	        length: function(value, attributes, attributeName, options, constraints){
	            if(value){
	                //Amex
	                if((/^(34|37).*$/).test(value)) return {is: 15};
	                // Visa, Mastercard
	                if((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
	            }
	            // 未知银行卡, 不在进行length验证
	            return false;
	        }
	    },
	    creditCardZip: function(value, attributes, attributeName, option, constraints){
	        if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null;
	        return {
	            presence: {message: "当只用AMEX卡的时候必填"},
	            length: {is: 5}
	       };
	    }
	};

	validate({creditCardNumber: "4"}, constraints);
	// => {"creditCardNumber": ["信用卡卡号长度错误(长度是16字符)"]}

	validate({creditCardNumber: "9999999999999999"}, constraints);
	// => {"creditCardNumber": ["9999999999999999 不是一个有效信用卡号码"]}

	validate({creditCardNumber: "340000000000000"}, constraints);
	// => {"creditCardZip": ["使用AMEX时,需要zipCredit卡是必须的"]}

如果你不想给validator任何参数，可以使用tru代替一个空对象，如果validator为false将不执行。



#### <span id="2">2.验证方法</span>
	validate(attributes, constraints, [options])
attributes : 要接受constraints约束验证的属性对象集合，attributes必须是一个简单的对象或者一个表单元素，不支持其它像主模块等等。
constraints:  constraints具体格式请查看[constrains 选项](#1)

如果attributes对象是一个HTML/DOM/jQuery元素，在验证之前会先调用collectFormValues。

如果没有错误返回，否则会返回这个格式对象：

	{<attribute>: [<error>, <error>, ...]}

如果你需要错误信息不包含前缀，可以通过属性前添加^,
如果你需要一个引导^字符并且也想要前缀，只要写\^

如果你到错误信息包含%{value}, %{value} 会被替换成真实值。值可以使用validate.stringifyValue进行转化(默认只是调用validate.prettify),也可以通过自定义格式进行重写。

如果你想要自定义来美化参数，你也可以根据你的喜好进行重写validate.prettify函数。

这里有个参数格式可以接收以下值:

* “grouped” (默认)-根据属性返回错误信息组
* “flat” -返回一个错误标识
* “detailed” - 返回一个包含更多错误信息的错误对象列表(看例子)。每个对象都将包含一个简单信息

```
var constraints = {
		username: {
			presene: true,
			exclusion: {
				within: ["nicklas"],
				message: "'%{value}' is not allowed"
			}
		},
		password:{
			presence: true,
			length: {
				minimum: 6,
				message: "必须至少6个字符"
			}
		}
	};
	validate({password: "bad"}, constraints);
	// =>{
	//    "username": ["用户名不能为空"],
	//    "password": ["密码 必须至少6个字符"]	
	// } 

	validate({username:"nick", password: "better"}, constraints);
	// => undefined

	validate({password: "better"}, constraints, {fullMessages: false});
	// => {"username": ["不能为空"]}

	valitate({}, constraints, {format: "flat"});
	// => ["用户名 不能为空", "密码 不能为空"]

	validate({username:"nick", password: "better"}, constraints, {format: "detailed"});
	// => [
	//   {
	//     "attribute": "username",
	//     "value": "nicklas",
	//     "validator": "exclusion",
	//     "globalOptions": {
	//       "format": "detailed"
	//     },
	//     "attributes": {
	//       "username": "nicklas",
	//       "password": "bad"
	//     },
	//     "options": {
	//       "within": [
	//         "nicklas"
	//       ],
	//       "message": "'%{value}' is not allowed"
	//     },
	//     "error": "Username 'nicklas' is not allowed"
	//   },
	//   {
	//     "attribute": "password",
	//     "value": "bad",
	//     "validator": "length",
	//     "globalOptions": {
	//       "format": "detailed"
	//     },
	//     "attributes": {
	//       "username": "nicklas",
	//       "password": "bad"
	//     },
	//     "options": {
	//       "minimum": 6,
	//       "message": "must be at least 6 characters"
	//     },
	//     "error": "Password must be at least 6 characters"
	//   }
	// ]

	validate({}, {username: {presence: {message: "^You must pick a username"}}});
	// => {"username": ["You must pick a username"]}
```

##### <span id="2.1"> 2.1.异步验证</span>

validate.async ``` validate.async(attributes, constraints, [options]) ```



##### <span id="2.2"> 2.2.单个值验证</span>
##### <span id="2.3"> 2.3.嵌套验证</span>
##### <span id="2.4"> 2.4.默认参数</span>


##### <span id='3'>3.写自己的验证</span>

##### <span id='3.1'>3.1.写一个异步验证</span>

#### <span id='4'>4.验证</span>

##### <span id='4.1'>4.1.Date</span>
##### <span id='4.2'>4.2.Datetime</span>
##### <span id='4.3'>4.3.Email</span>
##### <span id='4.4'>4.4.Equality</span>
##### <span id='4.5'>4.5.Exclusion</span>
##### <span id='4.6'>4.6.Format</span>
##### <span id='4.7'>4.7.Inclusion</span>
##### <span id='4.8'>4.8.Length</span>
##### <span id='4.9'>4.9.Numericality</span>
##### <span id='4.10'>4.10.Presence</span>
##### <span id='4.11'>4.11.URL</span>

#### <span id='5'>5.组件</span>

##### <span id='5.1'>5.1.capitalize</span>
##### <span id='5.2'>5.2.cleanAttributes</span>
##### <span id='5.3'>5.3.collectFormValues</span>
##### <span id='5.4'>5.4.contains</span>
##### <span id='5.5'>5.5.extend</span>
##### <span id='5.6'>5.6.format</span>
##### <span id='5.7'>5.7.getDeepObjectValue</span>
##### <span id='5.8'>5.8.isArray</span>
##### <span id='5.9'>5.9.isDate</span>
##### <span id='5.10'>5.10.isDefined</span>
##### <span id='5.11'>5.11.isDomElement</span>
##### <span id='5.12'>5.12.isEmpty</span>
##### <span id='5.13'>5.13.isFunction</span>isInteger
##### <span id='5.14'>5.14.isInteger</span>
##### <span id='5.15'>5.15.isNumber</span>
##### <span id='5.16'>5.16.isObject</span>
##### <span id='5.17'>5.17.isPromise</span>
##### <span id='5.18'>5.18.isString</span>
##### <span id='5.19'>5.19.prettify</span>
##### <span id='5.20'>5.20.result</span>



