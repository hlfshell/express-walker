var express = require('express'),
	walk = require('walk').walk,
	Promise = require('promise'),
	path = require('path');

module.exports = function(){
		
	var ExpressWalker = function(opts){
		if(typeof opts == 'object'){
			this.app = opts.app;
			this.directory = opts.directory;
			this.root = opts.root;	
		}
	};
	
	ExpressWalker.prototype.pass = function(){
		this.args = Array.prototype.slice.call(arguments);
		return this;
	};
	
	ExpressWalker.prototype.app = function(app){
		this.app = app;
		return this;
	};
	
	ExpressWalker.prototype.directory = function(dir){
		this.directory = dir;
		return this;
	};
	
	ExpressWalker.prototype.root = function(root){
		this.root = root;
		return this;
	}
	
	ExpressWalker.prototype.load = function(cb){
		var self = this;
		
		return new Promise(function(resolve, reject){
			
			var walker = walk(self.directory);
			
			walker.on('file', function(root, fileStat, next){
				self.app.use(self.root + fileStat.name.split('.js')[0],
					require(path.resolve(root) + path.sep + fileStat.name).apply(
						null,
						self.args
					)
				)
				next();
			});
			
			walker.on('end', function(){
				if(cb) cb();
				resolve();
			});
		});

	};
	
	return ExpressWalker;
	
};