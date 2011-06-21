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
		handler = { execute: handler };
	} else {
		throw new TypeError('Please specify the function or the object for the event handler.');
	}
	return Object.merge(this, handler);
};

dispatcher.Handler = new Class({

	initialize: function(eventHandler){
		return setupEventHandler.apply(this, [eventHandler]);
	},

	preDispatch: function(context){},

	execute: function(context){},

	postDispatch: function(context){}

});

new Type('URLDispatcherHandler', dispatcher.Handler);

}(URLDispatcher));
