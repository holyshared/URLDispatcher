/*
---
name: URLDispatcher

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Function
  - Core/Object

provides: [URLDispatcher]

...
*/

(function(){

var URLDispatcher = this.URLDispatcher = function(){};

URLDispatcher.implement({
	_handlers: {},
	register: register,
	match: match,
	dispatch: dispatch,
	_dispatchFunction: dispatchFunction.protect(),
	_dispatchHandler: dispatchHandler.protect(),
	getLength: getLength
});

function register(paturn, eventHandler){
	var dispachHandler = {
		paturn: paturn,
		handler: eventHandler
	};
	this._handlers[paturn] = dispachHandler;
}

function match(url){
	for (var paturn in this._handlers){
		var re = new RegExp(paturn);
		if (!re.test(url)) continue;
		return this._handlers[paturn];
	}
	return null;
}

function dispatch(url, context){
	var matchHandler = this.match(url);
	if (!matchHandler) return;

	var paturn = matchHandler.paturn;
	var handler = matchHandler.handler; 
	var params = url.match(new RegExp(paturn));
	var targetUrl = (Type.isArray(params)) ? params.shift() : url;

	var dispatchContext = {
		url: targetUrl,
		params: params,
		values: context
	};

	if (Type.isFunction(handler)){
		this._dispatchFunction(handler, dispatchContext);
	} else {
		this._dispatchHandler(handler, dispatchContext);
	}
}

function dispatchFunction(handler, context){
	handler.call(handler, context);
}

function dispatchHandler(handler, context){
	if (Type.isFunction(handler['preDispatch'])) {
		handler['preDispatch'].call(handler, context);
	}

	handler.invoke.call(handler, context);

	if (Type.isFunction(handler['postDispatch'])) {
		handler['postDispatch'].call(handler, context);
	}
}

function getLength(){
	return Object.getLength(this._handlers);
}

}());