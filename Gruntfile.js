module.exports = function ( grunt ) {

   /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */

   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-ejs');

	var userConfig = {
		buildDir: "build",
		srcDir: "www"
	}

	var taskConfig = {

		copy: {
			assets: {
				files: [
					{ 
			            src: [ '**' ],
			            dest: '<%= buildDir %>/img/',
			            cwd: '<%= srcDir %>/img/',
			            expand: true
					},
					{ 
			            src: [ '**' ],
			            dest: '<%= buildDir %>/fonts/',
			            cwd: '<%= srcDir %>/fonts/',
			            expand: true
					},
					{ 
			            src: [ '**' ],
			            dest: '<%= buildDir %>/js/',
			            cwd: '<%= srcDir %>/js/',
			            expand: true
					}
		       ]
			}
		},

		ejs: {
			all: {
				src: ['**/*.ejs', '!partials/**/*'],
				dest: '<%= buildDir %>/',
				expand: true,
				cwd: '<%= srcDir %>/',
				ext: '.html',
			},
		},

		less: {
			compile: {
				files: {
					'<%= buildDir %>/css/main.css': '<%= srcDir %>/less/main.less'
				}
			}
		},

		

		delta: {

	      options: {
	        livereload: true
	      },

	      /**
	       * When the LESS files change, we need to compile and copy to build dir
	       */
	      less: {
	        files: [ '<%= srcDir %>/**/*.less' ],
	        tasks: [ 'less:compile'],
	      },

	      /**
	       * When .ejs file changes, we need to compile ejs into HTML.
	       */
	      html: {
	        files: [ '<%= srcDir %>/**/*.ejs' ],
	        tasks: [ 'ejs:all'],
	      },

	      assets: {
	        files: [ 
	          '<%= srcDir %>/img/**/*',
	          '<%= srcDir %>/fonts/**/*',
	          '<%= srcDir %>/js/**/*',
	        ],
	        tasks: [ 'copy:assets' ]
	      }

	    }
	}

	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );
	// grunt.config.init(taskConfig);

	grunt.renameTask( 'watch', 'delta' );
  	grunt.registerTask( 'watch', [ 
  		'less:compile', 
  		'ejs:all', 
  		'copy:assets',  
  		'delta' 
  	]);

	grunt.registerTask('build', [
		'less:compile',
		'ejs:all',
		'copy:assets'
	]);

	grunt.registerTask('default', ['less:compile']);

}
