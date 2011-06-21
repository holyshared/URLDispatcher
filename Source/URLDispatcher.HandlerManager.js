/*
---
name: URLDispatcher.HandlerManager

description: 

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
	},

	addHandlers: function(handlers){
		var self = this;
		Object.each(handlers, function(handler, key){
			self.addHandler(key, handler);
		});
	},

	removeHandler: function(key){
		if (!this.hasHandler(key)) {
			throw new Error('There is no specified event handler.');
		}
		delete this._handlers[key];
	},

	removeHandlers: function(handlers){
		var self = this;
		Object.each(handlers, function(handler, key){
			self.removeHandler(key);
		});
	},

	hasHandler: function(key){
		return (this._handlers[key]) ? true : false;
	}

});

}(URLDispatcher));
