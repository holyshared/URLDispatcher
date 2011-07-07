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

	options: {
/*
		resources: null,
		routes: null
*/
	},

	initialize: function(options){
		this._router = new dispatcher.Router();
		this._handlers = new dispatcher.HandlerManager();
		this.setOptions(this._prepere(options));
	},

	_prepere: function(options){
		var props = Object.subset(options || {}, ['routes', 'resources']);
		for (var key in props){
			var setter = 'add' + key.capitalize();
			this[setter](props[key]);
			delete options[key];
		}
		return options;
	}.protect(),

	addRoute: function(paturn, handler, conditions){
		var stackHandler = (!Type.isURLDispatcherHandler(handler)) ? new dispatcher.Handler(handler) : handler;
		stackHandler.setDispatcher(this);
		this._router.addRoute(paturn, conditions);
		this._handlers.addHandler(paturn, stackHandler);
		return this;
	},

	addRoutes: function(routes){
		var self = this;
		routes.each(function(route, key){
			self.addRoute(route.paturn, route.handler, route.conditions);
		});
		return this;
	},

	removeRoute: function(paturn){
		this._router.removeRoute(paturn);
		this._handlers.removeHandler(paturn);
		return this;
	},

	removeRoutes: function(){
		Array.each(arguments, this.removeRoute, this);
		return this;
	},

	hasRoute: function(paturn) {
		return this._router.hasRoute(paturn);
	},

	getLength: function() {
		return this._router.getLength();
	},

	dispatch: function(url, args){

		this.fireEvent('startup');

		this.fireEvent('routingStart', [url, args]);

		var result = this._router.match(url);
		if (!result) {
			return false;
		}

		this.fireEvent('routingEnd', [result]);

		var key = result.paturn;
		var handler = this._handlers.getHandler(key);

		var context = Object.merge(result, { args : args || {} }); 

		handler.setContext(context);

		//Execute beforeDispatch
		if (Type.isFunction(handler.beforeDispatch)) {
			try {
				handler.beforeDispatch();
			} catch(exception) {
				throw exception;
			}
		}

		//Execute event
		if (Type.isFunction(handler.execute)) {
			try {
				handler.execute();
			} catch(exception) {
				throw exception;
			}
		}

		//Execute afterDispatch event
		if (Type.isFunction(handler.afterDispatch)) {
			try {
				handler.afterDispatch();
			} catch(exception) {
				throw exception;
			}
		}

		this.fireEvent('shutdown');

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
		var resources = Array.from(arguments);
		return this.getDispatcher().getResources.apply(this, resources);
	}

});

dispatcher.implement(new dispatcher.URLEventDispatcher());


}(URLDispatcher));
