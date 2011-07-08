URLDispatcher
=======================================

URLDispatcher is an event dispatcher of the URL base.  
Routing refers to [Fitzgerald](https://github.com/jim/fitzgerald "Fitzgerald"). 

URLDispatcher
------------------------------------------------

Please look at URLDispatcher.URLEventDispatcher about details. 

### Example

	alert(URLDispatcher.version;) //Alert version.

### Properties

* version - Version number


URLDispatcher.URLEventDispatcher
------------------------------------------------

### Example

#### For the function

	var dispatcher = new URLDispatcher.URLEventDispatcher();
	dispatcher.addRoute('^/:name', function(context){
		var logger = context.getResource('logger');
		logger.log('logging start.....');

	}, ['\\w+']);

	var logger = {
		log: function(message){
			console.log(message);
		}
	}

	dispatcher.addResource('logger', logger);

#### For the object

	var handler = {
		beforeDispatch: function(context){
			//do something
		},

		execute: function(context){
			//do something
			var logger = context.getResource('logger');
			logger.log('logging start.....');
		},

		afterDispatch: function(context){
			//do something
		}
	}

	var logger = {
		log: function(message){
			console.log(message);
		}
	}

	dispatcher.addRoute('^/:name', handler, ['\\w+']);

	dispatcher.addResource('logger', logger);


### Options
* resources (object) - List of resource object.
* routes (array) - List of route object.
* onStartup (function) - It is generated before the event execution begins.
* onRoutingStar (function) - It is generated before the retrieval of the route begins. It hands over in the parameter and url and the execution argument are handed over to the event listener.
* onRoutingEnd (function) - When the retrieval of the route ends, it is generated. The result of the match is handed over to the event listener.
* onShutdown (function) - It is generated before the event execution ends.


### Methods

* addRoute (string, object, [array]) - The route is added.
* addRoutes (array) - Two or more routes are added.
* removeRoute (string) - The route is deleted. 
* removeRoutes (string, [string]) - Two or more routes are deleted.
* dispatch (string, [object]) - The event is executed. 
* hasRoute (string) - Whether the corresponding route exists is examined.
* getLength - The number of routes is returned.


URLDispatcher.Resource
------------------------------------------------

URLDispatcher.Resource builds the function of the Lee source management into a specific class in the mixin class. 

	var myResource = {
		key1: 'value1',
		key2: 'value2'
	};

	var dispatcher = new URLDispatcher();
	dispatcher.addResource('myResource', myResource);


### Methods

* addResource (string, object) - The resource is added.
* addResources (object) - Two or more resources are added. 
* removeResource (string) - The resource is deleted. 
* removeResources (string, [string]) - Two or more resources are deleted. 
* hasResource (string) - Whether the corresponding resource exists is examined. 
* getResource (string) - The resource is acquired. 
* getResources (string, [string]) - Two or more resources are acquired. 
* getResourceContainer - The resource container is returned.


URLDispatcher.Router
------------------------------------------------

URLDispatcher.Router judges the event execution.  
The judgment of the execution of the event detects the one matched from the stacked route to URL, and returns the result of the match.

	var router = new URLDispatcher.Router();
	router.addRoute('^/:name', ['\\w+']);

	var route = router.match('/foo');
	if (route){

		var result = {
			url: route,
			paturn: this.getPaturn(),
			conditions: this.getConditions(),
			params: params
		};
		console.log(route.url); ///name
		console.log(route.paturn); //^/:name
		console.log(route.conditions); //['\\w+']
		console.log(route.params); //{ 'name': 'foo' }
	} else {
		alert(route); //Alert false
	}

### Methods

* match (string) - It looks for the corresponding route.
* addRoute (string) - The route is added. 
* addRoutes (object) - Two or more routes are added.
* removeRoute (string) - The route is deleted. 
* removeRoutes (object) - Two or more routes are deleted.
* hasRoute (string) - It looks for the specified route. 
* getRoute (string) - The route is acquired. 
* getRoutes - Two or more routes are acquired. 
* getLength - The number of routes is returned. 


URLDispatcher.Route
------------------------------------------------

URLDispatcher.Route is a stacked route object in the router.  
The dispatcher judges whether to execute the event based on information defined by this object. 

	var route = new URLDispatcher.Route();
	route.setPaturn('^/:name')
		.setConditions(['\\w+']);

	alert(route.assemble({
		name: 'foo'
	})); ///foo


### Methods

* match (string) - Whether it matches it to specified URL is checked. 
* getPaturn - The URL pattern is acquired.
* setPaturn (string) - The URL pattern is set. 
* getConditions - The parameter pattern of URL is acquired. 
* setConditions (array) - The parameter pattern of URL is set. 
* assemble - It converts it into URL.
* isValid - Whether the route is appropriate is checked.


URLDispatcher.Handler
------------------------------------------------

URLDispatcher.Handler is an event handler executed by the dispatcher. 

Function or object can be specified for the argument of the event handler.  
PreDispatch, execute, and postDispatch are mounted for the object and the method can be mounted. 

* preDispatch - It executes it before the event handler is executed. 
* execute - The event handler is executed.
* postDispatch - After the event handler is executed, it executes it. 

Please mount the execute method.  

### Example

#### For the function

	var context = new URLDispatcher.Context({
		//Dispatch arguments
		args: {
			key1: 'some value'
		},
		//URL paramters
		params: {
			key2: 'some value'
		}
	});

	var eventHandler = new URLDispatcher.Handler(function(context){
		//do something
		var key1 = context.getArg('key1');
		var key2 = context.getParam('key2');
	});
	eventHandler.execute(context);

#### For the object

	var context = new URLDispatcher.Context({
		//Dispatch arguments
		args: {
			key1: 'some value'
		},
		//URL paramters
		params: {
			key2: 'some value'
		}
	});

	var handler = {
		preDispatch: function(context){
			//do something
			var key1 = context.getArg('key1');
			var key2 = context.getParam('key2');
		},

		execute: function(context){
			//do something
			var key1 = context.getArg('key1');
			var key2 = context.getParam('key2');
		},

		postDispatch: function(context){
			//do something
			var key1 = context.getArg('key1');
			var key2 = context.getParam('key2');
		}
	}

	var eventHandler = new URLDispatcher.Handler(handler);
	eventHandler.execute(context);


### Methods

* getDispatcher - The event dispatcher is acquired. 
* setDispatcher (object) - The event dispatcher is set. 
* redirect (url, args) - It redirects it. 


URLDispatcher.HandlerManager
------------------------------------------------

URLDispatcher.HandlerManager is a utility object that manages the event handler in each URL pattern. 

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

* addHandler (string, function|object) - The event handler is added. 
* addHandlers (object) - Two or more event handlers are added. 
* removeHandler (string) - The event handler is deleted. 
* removeHandlers (object) - Two or more event handlers are deleted. 
* hasHandler (string) - Whether the corresponding event handler exists is confirmed. 
* getHandler (string) - The event handler is acquired. 
* getHandlers (string, [string])- Two or more event handlers are acquired. 
* getLength - The number of event handlers is acquired. 
