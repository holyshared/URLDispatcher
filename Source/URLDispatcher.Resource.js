/*
---
name: URLDispatcher.Resource

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Object
  - Core/Class
  - URLDispatcher/URLDispatcher

provides: [URLDispatcher.Resource]

...
*/

(function(dispatcher){

dispatcher.Resource = new Class({

	_resources: {},

	addResource: function(key, resource){
		this._resources[key] = resource;
	},

	addResources: function(resources){
		var self = this;
		Object.each(resources, function(resource, key){
			self.addResource(key, resource);
		});
	},

	hasResource: function(key){
		return (this._resources[key]) ? true : false;
	},

	getResource: function(key){
		if (!this.hasResource(key)) {
			throw new Error('Resource ' + key + ' was not found. ');
		}
		return this._resources[key];
	},

	getResources: function(){
		return this._resources;
	}

});

}(URLDispatcher));