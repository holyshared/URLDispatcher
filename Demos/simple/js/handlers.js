(function(doc, Builder){

var App = this.Application = {};

App.RootHandler = function(context){
	var content = context.getArg('content');		
	content.appendChild(Builder.h2('url'));
	content.appendChild(Builder.p(window.location.href));
};

App.EventHandler = function(){};
App.EventHandler.implement({

	beforeDispatch: function(context){
		var content = context.getArg('content');		
		var params = context.getParams('type');
		var values = context.getArgs('content', 'observer');
		this._renderTitle('beforeDispatch', content);
		this._renderContent(content, params, values);
	},

	execute: function(context){
		var content = context.getArg('content');		
		var params = context.getParams('type');
		var values = context.getArgs('content', 'observer');
		this._renderTitle('execute', content);
		this._renderContent(content, params, values);
	},

	afterDispatch: function(context){
		var content = context.getArg('content');		
		var params = context.getParams('type');
		var values = context.getArgs('content', 'observer');
		this._renderTitle('afterDispatch', content);
		this._renderContent(content, params, values);
	},

	_renderTitle: function(title, content){
		content.appendChild(Builder.h2(title));
	}.protect(),

	_renderContent: function(content, params, values){
		content.appendChild(Builder.h3('url'));
		content.appendChild(Builder.p(window.location.href));

		if (params){
			content.appendChild(Builder.h3('params'));
			content.appendChild(buildDlList(params));
		}

		if (values){
			content.appendChild(Builder.h3('values'));
			content.appendChild(buildDlList(values));
		}

	}.protect()

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
