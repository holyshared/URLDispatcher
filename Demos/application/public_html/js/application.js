(function(win, doc){

var Flickr = this.Flickr = {};

Flickr.Controller = new Class({

	start: function(){
		var location = win.location;
		var prefix = location.protocol + '//' + location.host;
		var url = location.href.replace(prefix, '');
		this.dispatch(url);
	},

	dispatch: function(){
		this.dispatcher.dispatch.apply(this.dispatcher, arguments);
	}

});

Flickr.FlickrController = new Class({

	Implements: [Flickr.Controller],

	initialize: function(container){
		this.container = $(container);
		this.dispatcher = new URLDispatcher();

		//Add resources
		this.dispatcher.addResource('request', this.getRequest(this.container));

		//Register routes
		this.dispatcher.addRoute('^/', this.indexAction)
			.addRoute('^#:category', this.categoryAction, ['\\w+']);
	},

	getRequest: function(container){
		var request = new Request.HTML({
			method: 'get',
			update: container
		});
		return request;
	},

	indexAction: function(){
		var request = this.getResource('request');
		request.setOptions({
			url: '/category'
		}).send();
	},

	categoryAction: function(){
		var category = this.getParam('category');
		var request = this.getResource('request');
		request.setOptions({
			url: '/category/' + category
		}).send();
	}

});

Behavior.addGlobalFilter('controller', {

	requireAs: {
		view: String
	},

	setup: function(element, api){
		var controller = element.getBehaviorResult('FlickrController');
		if (!controller) {
			var view = api.get('view'); 
			controller = new Flickr.FlickrController(view);
			api.addEvent('category:select', controller.dispatch.bind(controller));
			api.onCleanup(function(){
				delete controller;
			});
			controller.start();
		}
		return controller;
	}

});

Delegator.register('click', 'select', function(event){
	event.preventDefault();
	var href = $(event.target).get('href');
	var behavior = this.getBehavior();
	behavior.fireEvent('category:select', [href]);
});

}(window, document));
