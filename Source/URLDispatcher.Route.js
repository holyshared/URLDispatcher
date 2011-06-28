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
		var re = this._compile();
		if (!re.test(url)) {
			return false;
		}

		var values = url.match(re);
		var route = (Type.isArray(values)) ? values.shift() : url;

		var params = values.associate(this.getKeys());

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
		var map = this.getPlaceHoldrsMap();
		Object.each(map, function(value, key){
			paturn = paturn.replace(key, '(' + value + ')');
		});
		return new RegExp(paturn); 
	},

	getPlaceHoldrsMap: function(){ 
		var conditions = this.getConditions();
		var placeHolders = this.getPlaceHoldrs();
		var map = conditions.associate(placeHolders);
		return map;
	},

	getKeys: function(){
		var placeHolders = this.getPlaceHoldrs();
		return placeHolders.invoke('replace', ':', '');		
	},

	getPlaceHoldrs: function(){
		var paturn = this.getPaturn();
		var re = new RegExp('(:\\w+)', 'g');
		var placeHolders = paturn.match(re);
		return placeHolders;
	},



/*
	_toRegExp: function(){
		var paturn = this.getPaturn();
		var conds = this.getConditions();
		var paths = paturn.split('/');
		var index = 0;
		paths.each(function(value, key){
			if (value.charAt(0) == ':'){
				if (!conds[index]) {
					throw new Error('The corresponding pattern is not found.');
				}
				paths[key] = '(' + conds[index] + ')';
				index++;
			}
		});
		return new RegExp(paths.join('/'));
	}.protect(),

	_getParams: function(values){
		var index = 0;
		var result = {};
		var paturn = this.getPaturn();
		var placeHolders = paturn.split('/');
		placeHolders.each(function(value, key){
			if (value.charAt(0) == ':'){
				var storeKey = value.replace(':', '');
				result[storeKey] = values[index++];
			}
		});
		return result;
	}.protect(),
*/


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
