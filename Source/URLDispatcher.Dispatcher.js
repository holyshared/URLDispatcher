/*
---
name: URLDispatcher.Dispathcer

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - URLDispatcher/URLDispatcher
  - URLDispatcher/URLDispatcher.Router
  - URLDispatcher/URLDispatcher.HandlerManager

provides: [URLDispatcher.Dispatcher]

...
*/
(function(dispatcher){

dispatcher.Dispatcher = new Class({

	initialize: function(){
		this._router = new dispatcher.Router();
		this._handlers = new dispatcher.HandlerManager();
	},

	register: function(paturn, handler, conditions){
		this._router.addRoute(paturn, conditions);
		this._handlers.addHandler(paturn, handler);
	},

	unregister: function(paturn){
		this._router.removeRoute(paturn);
		this._handlers.removeHandler(paturn);
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

		handler.preDispatch();
		handler.execute();
		handler.postDispatch();

	}

});

dispatcher.implement(new dispatcher.Dispatcher());

}(URLDispatcher));
