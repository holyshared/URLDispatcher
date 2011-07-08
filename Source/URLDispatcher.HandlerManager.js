/*
---
name: URLDispatcher.HandlerManager

description: Collection class that manages event handler.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - URLDispatcher/URLDispatcher
  - URLDispatcher/URLDispatcher.Handler

provides: [URLDispatcher.HandlerManager]

...
*/

(function(dispatcher){

dispatcher.HandlerManager = new Class({

	_handlers: {},

	initialize: function(handlers){
		if (!handlers) return;
		this.addHandlers(handlers);
	},

	addHandler: function(key, handler){
		if (!Type.isURLDispatcherHandler(handler)) {
			throw new TypeError('The specified event handler is not URLDispatcherHandler.');
		}
		this._handlers[key] = handler;
		return this;
	},

	addHandlers: function(handlers){
		var self = this;
		Object.each(handlers, function(handler, key){
			self.addHandler(key, handler);
		});
		return this;
	},

	removeHandler: function(key){
		if (!this.hasHandler(key)) {
			throw new Error('There is no specified event handler.');
		}
		delete this._handlers[key];
		return this;
	},

	removeHandlers: function(){
		Array.each(arguments, this.removeHandler, this);
		return this;
	},

	hasHandler: function(key){
		return (this._handlers[key]) ? true : false;
	},

	getHandler: function(key){
		if (!this.hasHandler(key)) {
			throw new Error('There is no specified event handler.');
		}
		return this._handlers[key];
	},

	getHandlers: function(){
		var args = Array.from(arguments);
		return args.map(this.getHandler, this).associate(args);
	},

	getLength: function(){
		return Object.getLength(this._handlers);
	}

});

}(URLDispatcher));
