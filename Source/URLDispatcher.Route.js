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
		var map = conditions.associate(elements);
		return map;
	},

	_toKeys: function(){
		var elements = this._getElements();
		return elements.invoke('replace', ':', '');		
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
