var express = require('express'),
	walk = require('walk'),
	promise = require('promise');

module.exports = function(){
	
	return (function(){
		
		this.app;
		this.directory;
		this.root;
		this.args;
		
		function RequireWalker(){
			var args = Array.prototype.slice.call(arguments);
			
			var opts = args.shift();
			this.app = args.shift();
			this.directory = args.shift();
			this.root = args.shift();
			this.args = args;
		};
		
		RequireWalker.prototype.pass = function(){
			this.args = Array.prototype.slice.call(arguments);
			return this;
		};
		
		RequireWalker.prototype.app = function(app){
			this.app = app;
			return this;
		};
		
		RequireWalker.prototype.directory = function(dir){
			this.directory = dir;
			return this;
		};
		
		RequireWalker.prototype.root = function(root){
			this.root = root;
			return this;
		}
		
		RequireWalker.prototype.load = function(cb){
			var self = this;
			
			return new Promise(function(resolve, reject){
				var walker = walk(self.directory);
			
				walker.on('file', function(root, fileStat, next){
					self.app.use(self.root, require.apply(null, this.args));
					next();
				});
				
				walker.on('end', function(){
					if(cb) cb();
					resolve();
				});
			});

		};
		
	})();
	
}