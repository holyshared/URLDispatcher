/*
---
name: URLDispatcher.URLEventDispatcher

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Events
  - Core/Options
  - URLDispatcher/URLDispatcher
  - URLDispatcher/URLDispatcher.Resource
  - URLDispatcher/URLDispatcher.Router
  - URLDispatcher/URLDispatcher.Handler
  - URLDispatcher/URLDispatcher.HandlerManager

provides: [URLDispatcher.URLEventDispatcher]

...
*/
(function(dispatcher){

//Result Status
Object.append(dispatcher, {
	SUCCESS: 0,
	FAILURE: 1
});

dispatcher.URLEventDispatcher = new Class({

	Implements: [Events, Options, dispatcher.Resource],

	initialize: function(){
		this._router = new dispatcher.Router();
		this._handlers = new dispatcher.HandlerManager();
	},

	addRoute: function(paturn, handler, conditions){
		var stackHandler = (!Type.isURLDispatcherHandler(handler)) ? new dispatcher.Handler(handler) : handler;
		stackHandler.setDispatcher(this);
		this._router.addRoute(paturn, conditions);
		this._handlers.addHandler(paturn, stackHandler);
		return this;
	},

	removeRoute: function(paturn){
		this._router.removeRoute(paturn);
		this._handlers.removeHandler(paturn);
		return this;
	},

	hasRoute: function(paturn) {
		return this._router.hasRoute(paturn);
	},

	getLength: function() {
		return this._router.getLength();
	},

	dispatch: function(url, args){
		var result = this._router.match(url);
		if (!result) {
			return false;
		}
		var key = result.paturn;
		var handler = this._handlers.getHandler(key);

		var context = Object.merge(result, { args : args || {} }); 

		handler.setContext(context);

		if (Type.isFunction(handler.preDispatch)) {
			var result = handler.preDispatch() || dispatcher.SUCCESS;
			if (dispatcher.FAILURE == result) {
				return new Error('The preDispatch event processing failed. [' + url + ']');
			}
		}

		var result = handler.execute() || dispatcher.SUCCESS;
		if (dispatcher.FAILURE == result) {
			return new Error('The execute event processing failed. [' + url + ']');
		}

		if (Type.isFunction(handler.postDispatch)) {
			var result = handler.postDispatch() || dispatcher.SUCCESS;
			if (dispatcher.FAILURE == result) {
				return new Error('The postDispatch event processing failed. [' + url + ']');
			}
		}

		return dispatcher.SUCCESS;
	}

});

new Type('URLEventDispatcher', dispatcher.URLEventDispatcher);

dispatcher.Handler.implement({

	getDispatcher: function(){
		return this._dispatcher;
	},

	setDispatcher: function(dispatcher){
		if (!Type.isURLEventDispatcher(dispatcher)) {
			throw new TypeError('The specified value is not URLEventDispatcher.');
		}
		this._dispatcher = dispatcher;
	},

	redirect: function(url, args){
		this._dispatcher.dispatch(url, args);
	}

});

dispatcher.Handler.implement({

	hasResource: function(key){
		return this.getDispatcher().hasResource(key);
	},

	getResource: function(key){
		return this.getDispatcher().getResource(key);
	},

	getResources: function(){
		return this.getDispatcher().getResources();
	}

});

dispatcher.implement(new dispatcher.URLEventDispatcher());


}(URLDispatcher));
