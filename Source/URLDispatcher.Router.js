/*
---
name: URLDispatcher.Router

description: 

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
		Object.each(this._routes, function(route){
			var result = route.match(url);
			if (result){
				return result;
			}
		})
		return false;
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
	},

	addRoutes: function(routes){
		if (!Type.isArray(routes)) {
			throw new TypeError('Please specify the route by the array.');
		}
		var self = this;
		routes.each(function(route, key){
			self.addRoute(route.paturn, route.conditions);
		});
	},

	removeRoute: function(paturn){
		if (!this.hasRoute(paturn)) {
			return false;
		}
		delete this._routes[paturn];
	},

	removeRoutes: function(paturns){
		if (!Type.isArray(paturns)) {
			throw new TypeError('Please specify the route by the array.');
		}
		var self = this;
		paturns.each(function(paturn, key){
			self.removeRoute(paturn);
		});
	},

	getRoute: function(paturn){
		if (!this.hasRoute(paturn)) {
			return false;
		}
		return this._routes[paturn];
	},

	getRoutes: function(){
		return this._routes;
	},

	getLength: function(){
		return Object.getLength(this._routes);
	}

});

}(URLDispatcher));
