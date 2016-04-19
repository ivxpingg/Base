//惰性加载函数

var addEvent = function( elem, type, handler ){
	if(window.addEventLister){
		addEvent = function( elem, type, handler ){
              elem.addEventLister( type, handler, false);
		};
	}
	else if(window.attachEvent){
		addEvent = function( elem, type, handler ){
			elem.attachEvent( 'on' + type, handler );
		}
	}

	addEvent( elem, type, handler );
};