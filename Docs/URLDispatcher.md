URLDispatcher
=======================================


URLDispatcher.Route
---------------------------------------

var simpleRoute = URLDispatcher.Route('^/');

var queryRoute = URLDispatcher.Route('^/(\\w+)', ['type']);

var queryRoute = URLDispatcher.Route('^/:type', {
	type: '^/(\\w+)'
});


var queryRoute = URLDispatcher.Route();
queryRoute.setPaturn('^/:type')
	.setBinds({
		type: '^/(\\w+)'
	})
	.assemble({
		type: 'foo'
	});

route.set('paturn', '^/:type')
	.set('binds', {
		type: '^/(\\w+)'
	});

### Methods

* setPaturn
* getPaturn
* setBinds
* getBinds
* assemble


URLDispatcher.Router
---------------------------------------

var router = URLDispatcher.Router();
router.addRoute(URLDispatcher.Route('^/'));

router.addRoute(URLDispatcher.Route('^/', ['type']));

var route = router.match('/example.com/');
if (route) {
	//
} else {
	//
}

### Methods

* addRoute
* addRoutes
* removeRoute
* removeRoutes
* match


URLDispatcher.Dispatcher
---------------------------------------

var app = new UD.Application();

var dispatcher = new URLDispatcher.Dispatcher();
dispatcher.addHandler(new UD.Route('^/'), function(context){
	//do something
});
dispatcher.dispatch('/', {
	key1: 'value1',
	key2: 'value2'
});


### Methods

* addHandler
* addHandlers
* removeHandler
* removeHandlers
* dispatch
