/*
---
name: URLDispatcher.Dispathcer

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/String
  - Core/Class
  - URLDispatcher/URLDispatcher

provides: [URLDispatcher.Dispathcer]

...
*/
(function(dispatcher){


dispatcher.Dispatcher = new Class({

	_handlers: {},

	initialize: function(){
		this.router = new dispatcher.Router();
	},

	register: function(paturn, handler, conditions){
		this._addHandler(paturn, handler);
		this.router.addRoute(paturn, conditions);
	},

	dispatch: function(url, context){
		var paturn = this.router.match(url);
		if (!paturn) {
			return false;
		}

		var handler = this._getHandler(paturn);



	},

	_addHandler: function(paturn, handler){
		this._handlers[paturn] = handler;
	}.protect(),

	_getHandler: function(paturn){
		return this._handlers[paturn];
	}.protect()

});

}(URLDispatcher));
