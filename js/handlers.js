(function(doc, Builder){

var App = this.Application = {};

App.RootHandler = function(context){
	var values = context.values;
	var content = values.content;

	content.appendChild(Builder.h2('url'));
	content.appendChild(Builder.p(context.url));
};

App.EventHandler = function(){};
App.EventHandler.implement({

	preDispatch: function(context){
	},

	invoke: function(context){

		var params = context.params;
		var values = context.values;
		var content = values.content;

		content.appendChild(Builder.h2('url'));
		content.appendChild(Builder.p(context.url));

		if (Type.isArray(params)){
			content.appendChild(Builder.h2('params'));
			content.appendChild(buildUlList(params));
		}

		if (values){
			content.appendChild(Builder.h2('values'));
			content.appendChild(buildDlList(values));
		}

	},

	postDispatch: function(context){
	}

});

function buildUlList(values){
	var ul = Builder.ul();
	for(var i = 0; i < values.length; i++) {
		var li = Builder.li(values[i]);
		ul.appendChild(li);
	}
	return ul;
}

function buildDlList(values){

	var dl = Builder.dl();
	for (var key in values){

		var value = values[key];
		switch(typeOf(value)){
			case 'object':
				var dd = Builder.dd('object');
				break;
			case 'function':
				var dd = Builder.dd('function');
				break;
			case 'element':
				var dd = Builder.dd('element');
				break;
			default:
				var dd = Builder.dd(value);
				break;
		}
		var dt = Builder.dt(key);

		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	return dl;
}

}(document, Builder));
