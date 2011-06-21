/*
---
name: URLDispatcher.Handler

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - URLDispatcher/URLDispatcher

provides: [URLDispatcher.Handler]

...
*/

(function(dispatcher){

dispatcher.Handler = new Class({

	initialize: function(eventHandler){
		this._setEventHandler(eventHandler);
	},

	_setEventHandler: function(eventHandler){
		var handler = null;
		switch(typeOf(eventHandler)){
			case 'object' && Type.isFunction(eventHandler.execute):
				handler = eventHandler;
				break;
			case 'function':
				handler = { execute: handler };
				break;
			default:
				throw new TypeError('aaaaaa');
		}
		Object.merge(this, handler);
	},

	preDispatch: function(context){},

	execute: function(context){},

	postDispatch: function(context){}

});

new Type('URLDispatcherHandler', dispatcher.Handler);

}(URLDispatcher));
