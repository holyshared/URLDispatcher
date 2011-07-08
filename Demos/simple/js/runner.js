(function(){

var Observer = {

	register: function(target, type, callback){
		if (target.addEventListener){
			target.addEventListener(type, callback, false);
		} else {
			target.attachEvent('on' + type, callback);
		}
	}

};

var dispatcher = new URLDispatcher();
dispatcher.addRoute('^/URLDispatcher/$', Application.RootHandler);
dispatcher.addRoute('^/URLDispatcher/handler/(\\w+)', new Application.EventHandler());

Observer.register(window, 'load', function(){

	var content = document.getElementById('content');

	var location = window.location;
	var prefix = location.protocol + '//' + location.host
	var url = location.href.replace(prefix, '');

	var context = {
		content: content,
		observer: Observer
	};

	dispatcher.dispatch(url, context);

});

}());