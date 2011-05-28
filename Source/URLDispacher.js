/*
---
name: URLDispacher

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Function
  - Core/Object

provides: [URLDispacher]

...
*/

(function(){

var URLDispacher = this.URLDispacher = function(){};

URLDispacher.implement({
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

	if (Type.isFunction(handler)){
		this._dispatchFunction(handler, params);
	} else {
		this._dispatchHandler(handler, params);
	}
}

function dispatchFunction(handler, params){
	handler.apply(handler, params);
}

function dispatchHandler(handler, params){
	if (Type.isFunction(handler['preDispatch'])) {
		handler['preDispatch'].apply(handler, params);
	}

	handler.invoke.apply(handler, params);

	if (Type.isFunction(handler['postDispatch'])) {
		handler['postDispatch'].apply(handler, params);
	}
}

function getLength(){
	return Object.getLength(this._handlers);
}

}());