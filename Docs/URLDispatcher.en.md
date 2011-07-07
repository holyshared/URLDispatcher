URLDispatcher
=======================================





URLDispatcher.URLEventDispatcher
------------------------------------------------

	var dispatcher = new URLDispatcher.URLEventDispatcher();
	dispatcher.addRoute('^/:name', function(){

	}, ['\\w+']);

	or

	var handler = {

		preDispatch: function(){
			//do something
		},

		execute: function(){
			//do something
		},

		postDispatch: function(){
			//do something
		}
	}

	dispatcher.addRoute('^/:name', handler, ['\\w+']);

### Options
* resources (array) - 
* routes (object) - 
* onStartup
* onRoutingStart
* onRoutingEnd
* onShutdown


### Methods

* addRoute (string, object, [array]) - 
* addRoutes (object) - 
* removeRoute (string) - 
* removeRoutes (string, [string]) - 
* dispatch (string, [object]) - 
* hasRoute (string) - 
* getLength - 


URLDispatcher.Resource
------------------------------------------------

	var myResource = {
		key1: 'value1',
		key2: 'value2'
	};

	var dispatcher = new URLDispatcher();
	dispatcher.addResource('myResource', myResource);


### Methods

* addResource (string, object) - 
* addResources (object) - 
* removeResource (string) - 
* removeResources (string, [string]) - 
* hasResource (string) - 
* getResource (string) - 
* getResources (string, [string]) - 



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
* assemble - 
* isValid

URLDispatcher.Handler
------------------------------------------------


### Methods

* setContext (object) - 
* getContext - 
* getArg (string) - 
* getArgs - 
* getParam (string) - 
* getParams - 
* hasResource (string) - 
* getResource (string) - 
* getResources -
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