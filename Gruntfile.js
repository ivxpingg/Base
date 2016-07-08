//大盒子
module.exports = function(grunt){
    'use strict';
	
	grunt.initConfig({
		//pkg: grunt.file.readJSON('package.json'),
		//banner: '',
        
        watch: {
	      // If any .less file changes in directory "build/less/" run the "less"-task.
	      // files: ["build/less/*.less", "build/less/skins/*.less", "dist/js/app.js"],
	      files: [	          
	          "build/scss/**/*.scss"
	         ],
	      tasks: ["sass:development","autoprefixer"]
	    },

        // SASS compiler
	    sass: {
	      // bootstrap: {
	      // 	options: {
	      //     style: 'expanded' //'compressed'
	      //   },
	      //   files: {
	      //     'bootstrap/css/bootstrap.css': 'bootstrap/scss/bootstrap.scss'
	      //   }
	      // },
	      development: {
	        options: {
	          style: 'expanded' //'compressed'
	        },
	        files: { 
	        	'dist/css/home.css': 'build/scss/pages/home.scss',
                'dist/css/adv/adv.css': 'build/scss/pages/adv/adv.scss'
	        }
	      },
	      production: {
	        options: {
	          style: 'compressed'
	        },
	        files: {
	        	'dist/css/home.css': 'build/scss/pages/home.scss',
	        	'dist/css/adv/adv.css': 'build/scss/pages/adv/adv.scss'
	        }
	      }
	    },

	    //
	    autoprefixer: {
	    	dist: {
	    		files: {
	    			'dist/css/home.css': 'dist/css/home.css',
	    			'dist/css/adv/adv.css': 'dist/css/adv/adv.css'
	    		}
	    	}
	    }

	});

    grunt.loadNpmTasks('grunt-contrib-watch');    //监测
    grunt.loadNpmTasks('grunt-contrib-sass');     //css编译
    // grunt.loadNpmTasks('grunt-contrib-uglify');   //压缩
    // grunt.loadNpmTasks('grunt-contrib-clean');    //清除
    // grunt.loadNpmTasks('grunt-contrib-concat');   //合并
    // grunt.loadNpmTasks('grunt-contrib-jshint');   //检验js
    grunt.loadNpmTasks('grunt-autoprefixer');     //css自动添加浏览器前缀(后处理程序)

    //
    grunt.registerTask('default',['watch']);    
};