URLDispatcher
====================================

This library is an event dispatcher with a light URL base.  
The size of the file is 8KB very lighter.

![URLDispatcher](http://holyshared.github.com/URLDispatcher/icon.png "URLDispatcher")

How to use
------------------------------------------------------------------------

### 1. The event handler is registered to the dispatcher.

The event handler is registered to the dispatcher.  
The event handler can specify the function or the object. 

#### javascript
	var dispatcher = new URLDispatcher();
	dispatcher.addRoute('^/foo/$', function(context){
		//do something
	});

	or

	var eventHandler = {
		//It is executed before invoke is called.
		beforeDispatch: function(context){
			//do something
		},

		execute: function(context){
			//do something
		},

		//After invoke is called, it is executed. 
		afterDispatch: function(context){
			//do something
		}
	};

	var dispatcher = new URLDispatcher();
	dispatcher.addRoute('^/foo/$', eventHandler);

### 2. The event is executed.

The event is executed according to arbitrary timing. 
The data to be handed over to URL and the event handler is specified for the dispatch method.

The specified data can be referred to in **the values property** of argument context object of the event handler,  
and the content that matches to the pattern of URL can be referred to in **the params property** of the context object.

#### javascript

	var dispatcher = new URLDispatcher();
	dispatcher.addRoute('^/foo/:page', function(context){
		var id = this.getArg('id');
		var page = this.getParam('page');
		alert(page); //Alert 100
		alert(id); //Alert eventDispatcher
	}, ['\\d+']);

	dispatcher.dispatch('/foo/100', {
		id: 'eventDispatcher'
	});

Required libraries
------------------------------------------------------------------------

### Mootools Core
http://mootools.net/core/a2c956ca31acc228a3d0294f4b035d9a

Building URLDispatcher
------------------------------------------------------------------------

To do the build, the following command is specified by the packager.  

#### Mootools
packager build Core/Type Core/Object  Core/String Core/Function Core/Class +use-only Core -blocks 1.2compat

#### URLDispatcher
packager build URLDispatcher/* +use-only URLDispatcher