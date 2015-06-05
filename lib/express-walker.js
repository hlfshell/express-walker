var express = require('express'),
	walk = require('walk').walk,
	promise = require('promise');

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
//		console.log(__dirname);
//		console.log(require(self.directory + '/' + 'test1.js')());
		console.log(process.cwd());
		var fs = require('fs');
		fs.stat(self.directory, function(err, stats){
			console.log(err, stats);
		});
		console.log(require(process.cwd() + '/' + self.directory)());
		
//		return new Promise(function(resolve, reject){
			
//			var walker = walk(self.directory);
//			
//			walker.on('file', function(root, fileStat, next){
//				console.log("file", fileStat);
//				self.app.use(self.root + fileStat.name.split('.js')[0],
//					require(self.directory + '/' + fileStat.name).apply(
//						null,
//						this.args
//					)
//				);
//				next();
//			});
//			
//			walker.on('end', function(){
//				console.log("end");
//				if(cb) cb();
//				resolve();
//			});
//		});

	};
	
	return ExpressWalker;
	
};