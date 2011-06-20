URLDispatcher
=======================================





URLDispatcher.Dispatcher
---------------------------------------

	var dispatcher = new URLDispatcher.Dispatcher();
	dispatcher.register('^/:name', function(context){
	}, ['\\w+']);
	
	or
	
	var handler = {
	
		preDispatch: function(context){
			//do something
		},
	
		execute: function(context){
			//do something
		},
	
		postDispatch: function(context){
			//do something
		}
	}
	
	dispatcher.register('^/:name', handler, ['\\w+']);

### Properties

### Methods

* register (paturn, handler, [conditions]) - 
* dispatch (url, [context])



URLDispatcher.Router
---------------------------------------

	var router = new URLDispatcher.Router();
	router.addRoute('^/:name', ['\\w+']);
	
	var route = router.match('/foo');
	if (route){
		alert(route); //Alert '^/:name'
	} else {
		alert(route); //Alert false
	}

### Methods

* match (string) - 
* addRoute (string) - 
* addRoutes (object) - 
* removeRoute (string) - 
* removeRoutes (object) - 


URLDispatcher.Route
---------------------------------------

	var route = new URLDispatcher.Route();
	route.setPaturn('^/:name')
		.setConditions(['\\w+']);

	alert(route.assemble({
		name: 'foo'
	})); ///foo


### Methods

* match (string) - 
* getPaturn -
* setPaturn (string) - 
* getConditions - 
* setConditions (array) - 
* assemble - 
