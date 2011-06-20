/*
---
name: URLDispatcher.Route

description: 

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
		var paturn = this.getPaturn();
		var conds = this.getConditions();
		var paths = paturn.split('/');
		var index = 0;
		paths.each(function(value, key){
			if (value.charAt(0) == ':'){
				if (!conds[index++]) {
					throw new Error('The corresponding pattern is not found.');
				}
				paths[key] = '(' + conds[index] + ')';
			}
		});
		var re = new RegExp(paths.join('/'));
		return (re.test(url)) ? paturn : false;
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
		var paturn = this.getPaturn();
		var re = new RegExp(':[a-zA-Z]+\/?');
		if (re.test(paturn) && values) {
			for (var key in values) {
				var re = new RegExp(':' + key);
				if (!re.test(paturn)) {
					throw new Error(key + ' is not found from the URL pattern.');
				}
				paturn = paturn.replace(':' + key, values[key]);
			}
		}
		if (paturn.charAt(0) == '^') {
			paturn = paturn.replace('^', '')
		}
		return paturn;
	}

});

}(URLDispatcher));
