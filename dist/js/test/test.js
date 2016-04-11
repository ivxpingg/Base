
define(['jquery'],function($){
	$('h1').append('改变世界OMG11');
	var tt = {
		logs: function(){
			$('h1').append('改变世界OMG');
		}
	}
	return tt.logs;
});
