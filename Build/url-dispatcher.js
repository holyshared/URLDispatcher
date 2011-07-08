/*
---
name: URLDispatcher

description: Core source of urldispatcher.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Function
  - Core/Object

provides: [URLDispatcher]

...
*/

(function(){

var URLDispatcher = this.URLDispatcher = function(){
	this.initialize.apply(this, arguments);
};

Object.append(URLDispatcher, {
	version: '2.1'
});

}());

/*
---
name: URLDispatcher.Context

description: Context object handed over to event object.

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


/*
---
name: URLDispatcher.Resource

description: Mixin class of resource management function.

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

	removeResource: function(key){
		if (!this.hasResource(key)) {
			throw new Error('Resource ' + key + ' was not found.');
		}
		delete this._resources[key];
		return this;
	},

	removeResources: function(){
		Array.each(arguments, this.removeResource, this);
		return this;
	},

	hasResource: function(key){
		return (this._resources[key]) ? true : false;
	},

	getResource: function(key){
		if (!this.hasResource(key)) {
			throw new Error('Resource ' + key + ' was not found.');
		}
		return this._resources[key];
	},

	getResources: function(){
		var args = Array.from(arguments);
		return args.map(this.getResource, this).associate(args);
	},

	getResourceContainer: function(){
		return this._resources;
	}

});

}(URLDispatcher));

/*
---
name: URLDispatcher.Route

description: Route class of url base.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/String
  - Core/Class
  - URLDispatcher/URLDispatcher

provides: [URLDispatcher.Route]

...
*/

(function(dispatcher){

dispatcher.Route = new Class({

	_paturn: null,
	_conditions: [],

	initialize: function(options){
		if (!options.paturn){
			throw new Error('The URL pattern is indispensable.');
		}
		for (var key in options){
			var value = options[key];
			var setter = 'set' + key.capitalize();
			this[setter](value);
		}
	},

	match: function(url){
		var re = this._compile();
		if (!re.test(url)) {
			return false;
		}

		var values = url.match(re);
		var route = (Type.isArray(values)) ? values.shift() : url;

		var params = values.associate(this._toKeys());

		var result = {
			url: route,
			paturn: this.getPaturn(),
			conditions: this.getConditions(),
			params: params
		};
		return result;
	},

	_compile: function(){
		var paturn = this.getPaturn();
		var map = this._toMap();
		Object.each(map, function(value, key){
			paturn = paturn.replace(key, '(' + value + ')');
		});
		return new RegExp(paturn); 
	},

	_toMap: function(){ 
		var conditions = this.getConditions();
		var elements = this._getElements();
		return (elements && conditions) ? conditions.associate(elements) : {};
	},

	_toKeys: function(){
		var elements = this._getElements();
		return (elements) ? elements.invoke('replace', ':', '') : [];
	},

	_getElements: function(){
		var paturn = this.getPaturn();
		var re = new RegExp('(:\\w+)', 'g');
		var placeHolders = paturn.match(re);
		return placeHolders;
	},

	isValid: function() {
		var elements = this._getElements();
		var map = this._toMap();
		return (Object.getLength(map) == elements.length);
	},

	getPaturn: function(){
		return this._paturn;
	},

	setPaturn: function(paturn){
		if (!Type.isString(paturn)){
			throw new TypeError('Paturn should be a character string.');
		}
		this._paturn = paturn;
	},

	getConditions: function(){
		return this._conditions;
	},

	setConditions: function(conditions){
		if (!Type.isArray(conditions)){
			throw new TypeError('Conditions should be an array.');
		}
		this._conditions = conditions;
	},

	assemble: function(values){
		if (!this.isValid()){
			throw new Error('Placeholder is not corresponding to the condition. ');
		}

		var paturn = this.getPaturn();
		var conditions = this.getConditions();
		
		var re = new RegExp('(:\\w+)', 'g');
		    
		var placeHolders = paturn.match(re);
		var map = conditions.associate(placeHolders);
		Object.each(map, function(value, key){
		    var assginValue = values[key.replace(':', '')];
		    if (assginValue.match(new RegExp(value))){
				paturn = paturn.replace(key, assginValue);
		    } else {
				throw new Error(key + ' is not found from the URL pattern.');
		    }
		});
		if (paturn.charAt(0) == '^') {
			paturn = paturn.replace('^', '')
		}
		return paturn;
	}

});

new Type('URLDispatcherRoute', dispatcher.Route);

}(URLDispatcher));


/*
---
name: URLDispatcher.Router

description: Routing class that judges route.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - URLDispatcher/URLDispatcher
  - URLDispatcher/URLDispatcher.Route

provides: [URLDispatcher.Router]

...
*/

(function(dispatcher){

dispatcher.Router = new Class({

	_routes: {},

	initialize: function(routes){
		if (!routes) return;
		this.addRoutes(routes);
	},

	match: function(url){
		var result = false;
		Object.each(this._routes, function(route){
			var params = route.match(url);
			if (params){
				result = params;
			}
		});
		return result;
	},

	hasRoute: function(paturn){
		return (this._routes[paturn]) ? true : false;
	},

	addRoute: function(paturn, conditions){
		var options = {
			paturn: paturn,
			conditions: conditions || []
		};
		var route = new URLDispatcher.Route(options);
		this._routes[paturn] = route;
		return this;
	},

	addRoutes: function(routes){
		if (!Type.isArray(routes)) {
			throw new TypeError('Please specify the route by the array.');
		}
		var self = this;
		routes.each(function(route, key){
			self.addRoute(route.paturn, route.conditions);
		});
		return this;
	},

	removeRoute: function(paturn){
		if (!this.hasRoute(paturn)) {
			return false;
		}
		delete this._routes[paturn];
		return this;
	},

	removeRoutes: function(paturns){
		Array.each(arguments, this.removeRoute, this);
		return this;
	},

	getRoute: function(paturn){
		if (!this.hasRoute(paturn)) {
			return false;
		}
		return this._routes[paturn];
	},

	getRoutes: function(){
		var args = Array.from(arguments);
		return args.map(this.getRoute, this).associate(args);
	},

	getLength: function(){
		return Object.getLength(this._routes);
	}

});

}(URLDispatcher));


/*
---
name: URLDispatcher.Handler

description: Event handler class.

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

	initialize: function(eventHandler){
		return setupEventHandler.apply(this, [eventHandler]);
	},

	execute: function(context){}

});

new Type('URLDispatcherHandler', dispatcher.Handler);

}(URLDispatcher));


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


/*
---
name: URLDispatcher.URLEventDispatcher

description: Event dispatcher of URL base.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Events
  - Core/Options
  - URLDispatcher/URLDispatcher
  - URLDispatcher/URLDispatcher.Context
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

		var options = Object.merge(result, {
			args: args || {},
			resources: this.getResourceContainer() || {}
		}); 

		var context = new dispatcher.Context(options);

		//Execute beforeDispatch
		if (Type.isFunction(handler.beforeDispatch)) {
			try {
				handler.beforeDispatch(context);
			} catch(exception) {
				throw exception;
			}
		}

		//Execute event
		if (Type.isFunction(handler.execute)) {
			try {
				handler.execute(context);
			} catch(exception) {
				throw exception;
			}
		}

		//Execute afterDispatch event
		if (Type.isFunction(handler.afterDispatch)) {
			try {
				handler.afterDispatch(context);
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

	_dispatcher: null,

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

dispatcher.implement(new dispatcher.URLEventDispatcher());

}(URLDispatcher));

