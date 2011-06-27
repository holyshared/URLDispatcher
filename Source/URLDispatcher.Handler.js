/*
---
name: URLDispatcher.Handler

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Object
  - Core/Class
  - URLDispatcher/URLDispatcher

provides: [URLDispatcher.Handler]

...
*/

(function(dispatcher){

function setupEventHandler(eventHandler){
	var handler = null;
	var name = typeOf(eventHandler);

	if (name == 'object' && Type.isFunction(eventHandler.execute)) {
		handler = eventHandler;
	} else if (name == 'function') {
		handler = { execute: eventHandler };
	} else {
		throw new TypeError('Please specify the function or the object for the event handler.');
	}
	return Object.merge(this, handler);
};

dispatcher.Handler = new Class({

	_context: null,
	_dispatcher: null,

	initialize: function(eventHandler){
		return setupEventHandler.apply(this, [eventHandler]);
	},

	setContext: function(context){
		if (!Type.isObject(context)) {
			throw new TypeError('The specified value is not object.');
		}
		this._context = context;
		return this;
	},

	getContext: function(){
		return this._context;
	},

	getArg: function(name){
		var context = this.getContext();
		return context.args[name] || null;
	},

	getArgs: function(){
		var args = Array.from(arguments);
		return args.map(this.getArg, this).associate(args);
	},

	getParam: function(name){
		var context = this.getContext();
		return context.params[name] || null;
	},

	getParams: function(){
		var args = Array.from(arguments);
		return args.map(this.getParam, this).associate(args);
	},

	execute: function(){}

});

new Type('URLDispatcherHandler', dispatcher.Handler);

}(URLDispatcher));
