URLDispatcher
=======================================





URLDispatcher.URLEventDispatcher
------------------------------------------------

	var dispatcher = new URLDispatcher.URLEventDispatcher();
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

* register (string, object, [array]) - 
* unregister (string) - 
* dispatch (string, [object]) - 
* isRegist (string) - 
* getLength - 


URLDispatcher.Router
------------------------------------------------

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
* hasRoute (string) - 
* getRoute (string) - 
* getRoutes - 
* getLength - 


URLDispatcher.Route
------------------------------------------------

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
* getParams
* assemble - 
* toRegExp


URLDispatcher.Handler
------------------------------------------------


### Methods

* setContext (object) - 
* getContext - 
* getArg (string) - 
* getArgs - 
* getParam (string) - 
* getParams - 
* getDispatcher - 
* setDispatcher (object) - 
* redirect (url, args) - 


URLDispatcher.HandlerManager
------------------------------------------------

	var handler1 = new URLDispatcher.Handler(function(context){
		//do something
	});
	var handler2 = new URLDispatcher.Handler(function(context){
		//do something
	});

	var manager = new URLDispatcher.HandlerManager();
	manager.addHandler('^/:name', handler1)
		.addHandler('^/:type/:page', handler2);

### Methods

* addHandler (string, function|object) - 
* addHandlers (object) - 
* removeHandler (string) -
* removeHandlers (object) - 
* hasHandler (string) -
* getHandler (string) -
* getHandlers - 
* getLength - 