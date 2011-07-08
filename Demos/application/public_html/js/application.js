(function(win, doc){

var Flickr = this.Flickr = {};

Flickr.Controller = new Class({

	start: function(){
		var location = win.location;
		var prefix = location.protocol + '//' + location.host;
		var url = location.href.replace(prefix, '');
		this.dispatch(url);
	}

});

Flickr.FlickrController = new Class({

	Extends: URLDispatcher.URLEventDispatcher,

	Implements: [Flickr.Controller],

	initialize: function(container, options){
		this.container = $(container);
		this.parent(options);

		this.addRoute('^/', this.indexAction.bind(this))
			.addRoute('^#:category', this.categoryAction.bind(this), ['\\w+']);
	},

	getRequest: function(){
		var request = new Request.HTML({
			method: 'get',
			update: this.container
		});
		return request;
	},

	indexAction: function(context){
		var request = this.getRequest();
		request.setOptions({
			url: '/category'
		}).send();
	},

	categoryAction: function(context){
		var category = context.getParam('category');
		var request = this.getRequest();
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
