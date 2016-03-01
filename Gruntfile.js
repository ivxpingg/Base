
module.exports = function(grunt){
    'use strict';
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '',
        
        watch: {
	      // If any .less file changes in directory "build/less/" run the "less"-task.
	      // files: ["build/less/*.less", "build/less/skins/*.less", "dist/js/app.js"],
	      files: ["build/scss/*.scss", "build/scss/skins/*.scss", "dist/js/app.js"],
	      tasks: ["sass", "uglify"]
	    },

        // SASS compiler
	    sass: {
	      development: {
	        options: {
	          style: 'expanded'
	        },
	        files: {
	          'bootstrap/css/bootstrap.css': 'bootstrap/scss/bootstrap.scss'
	        }
	      },
	      production: {
	        options: {
	          style: 'compressed'
	        },
	        files: {
	          'bootstrap/css/bootstrap.min.css': 'bootstrap/scss/bootstrap.scss'
	        }
	      }
	    },

	    //校验js
	    jshint: {
	    	options: {
	    		jshintrc: '.jshintrc'
	    	},

	    	files: {
	    		src: ''
	    	}
	    },


	    //合并文件
	    concat: {},

	    //压缩文件
	    uglify: {
	    	options: {}
	    },

	    autoprefixer: {
	    	dist: {
	    		files: {
	    			'test/css/auto.css': 'test/css/autoprefixer.css'
	    		}
	    	}
	    }

	});

    grunt.loadNpmTasks('grunt-contrib-watch');    //监测
    grunt.loadNpmTasks('grunt-contrib-sass');     //css编译
    grunt.loadNpmTasks('grunt-contrib-uglify');   //压缩
    grunt.loadNpmTasks('grunt-contrib-clean');    //清除
    grunt.loadNpmTasks('grunt-contrib-concat');   //合并
    grunt.loadNpmTasks('grunt-contrib-jshint');   //检验js
    grunt.loadNpmTasks('grunt-autoprefixer');     //css自动添加浏览器前缀(后处理程序)

    //
    grunt.registerTask('default',['autoprefixer']);    
};