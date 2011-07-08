/*
---
name: URLDispatcher.Context

description: aa.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Array
  - Core/Type
  - Core/Class
  - URLDispatcher/URLDispatcher

provides:
  - URLDispatcher.Context

...
*/

(function(dispatcher){

var members = ['args', 'params', 'resources'];

dispatcher.Context = new Class({

	_args: null,
	_params: null,
	_resources: null,

	initialize: function(props){
		var self = this;
		members.each(function(key, index){
			self['_' + key] = props[key] || {};
		});
	},

	getArg: function(name){
		return this._args[name] || null;
	},

	getArgs: function(){
		var args = Array.from(arguments);
		return args.map(this.getArg, this).associate(args);
	},

	getParam: function(name){
		return this._params[name] || null;
	},

	getParams: function(){
		var args = Array.from(arguments);
		return args.map(this.getParam, this).associate(args);
	},

	hasResource: function(key){
		return (this._resources[key]) ? true : false;
	},

	getResource: function(key){
		if (!this.hasResource(key)){
			throw new Error('There is no resource ' + key + '.');
		}
		return this._resources[key];
	},

	getResources: function(){
		var args = Array.from(arguments);
		return args.map(this.getResource, this).associate(args);
	}

});

new Type('URLDispatcherContext', dispatcher.Context);

}(URLDispatcher));
