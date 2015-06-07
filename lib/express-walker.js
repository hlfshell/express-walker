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
				//Make sure we only act on javascript files
				if(fileStat.name.length > 3 &&
					fileStat.name.substr(fileStat.name.length - 3).toLowerCase() != '.js')
					return next();
					
				var url = root.replace(self.directory, '').replace('\\', '/');
				if(url == ''){
					url = self.root + '/' + fileStat.name.split('.js')[0];
				} else {
					url = self.root + '/' + url + '/' + fileStat.name.split('.js')[0]
				}
				url = url.replace(/\/\/+/g, '/').toLowerCase();
				
				self.app.use(url,
					require(path.resolve(root) + path.sep + fileStat.name).apply(
						null,
						self.args
					)
				);
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