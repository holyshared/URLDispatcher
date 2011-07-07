(function(win, doc){
/*
	var dispatcher = new URLDispatcher({
		resources: {
			logger: function(message){
				if (!(window.console && message)) {
					return false;
				}
				window.console.log(message);
			}
		}
	});

	dispatcher.addRoutes([
		Application.IndexHandler,
		Application.CategoryHandler
	]);
*/
	win.addEvent('domready', function(){
/*
		var location = win.location;
		var prefix = location.protocol + '//' + location.host
		var url = location.href.replace(prefix, '');

		dispatcher.dispatch(url);
*/

		var behavior = new Behavior();
		behavior.apply(behavior.getContentElement());
		
		var delegator = new Delegator();
		delegator.bindToBehavior(behavior);
		delegator.attach(behavior.getContentElement());

	});

}(window, document));
