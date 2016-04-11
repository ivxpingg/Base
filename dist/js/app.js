
requirejs.config({
	baseUrl: 'node_modules/',

	paths: {
		jquery: '../node_modules/jquery/dist/jquery',
		test: '../dist/js/test/test'//,
		//bootstrap: 'bootstrap/dist/js/bootstrap'

	}
});

// requirejs(['jquery','bootstrap'], function($,b){
	
// });


requirejs(['jquery','test'], function($,b){
	b();
});

require(['jquery','test'], function($,b){
	b();
});