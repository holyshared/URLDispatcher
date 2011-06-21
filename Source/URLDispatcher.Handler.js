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

dispatcher.Handler = new Class({

	initialize: function(eventHandler){
		setupEventHandler.call(this, eventHandler);
	},

	preDispatch: function(context){},

	execute: function(context){},

	postDispatch: function(context){}

});

function setupEventHandler(eventHandler){
	var handler = null;
	switch(typeOf(eventHandler)){
		case 'object' && Type.isFunction(eventHandler.execute):
			handler = eventHandler;
			break;
		case 'function':
			handler = { execute: handler };
			break;
		default:
			throw new TypeError('Please specify the function or the object for the event handler.');
	}
	Object.merge(this, handler);
};

new Type('URLDispatcherHandler', dispatcher.Handler);

}(URLDispatcher));
