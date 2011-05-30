URLDispatcher
====================================

This library is an event dispatcher with a light URL base.  
The size of the file is 2KB very lighter.

![URLDispatcher](http://holyshared.github.com/URLDispatcher/icon.png "URLDispatcher")

How to use
------------------------------------------------------------------------

### 1. The event handler is registered to the dispatcher.

The event handler is registered to the dispatcher.  
The event handler can specify the function or the object. 

#### javascript
	var dispatcher = new URLDispatcher();
	dispatcher.register('^/foo/$', function(context){
		//do something
	});

	or

	var eventHandler = {
		//It is executed before invoke is called.
		preDispatch: function(context){
			//do something
		},

		invoke: function(context){
			//do something
		},

		//After invoke is called, it is executed. 
		preDispatch: function(context){
			//do something
		}
	};

	var dispatcher = new URLDispatcher();
	dispatcher.register('^/foo/$', eventHandler);

### 2. The event is executed.

The event is executed according to arbitrary timing. 
The data to be handed over to URL and the event handler is specified for the dispatch method.

The specified data can be referred to in **the values property** of argument context object of the event handler,  
and the content that matches to the pattern of URL can be referred to in **the params property** of the context object.

#### javascript

	var dispatcher = new URLDispatcher();
	dispatcher.register('^/foo/(\\d+)', function(context){
		alert(context.params[0]); //Alert 100
		alert(context.values.id); //Alert eventDispatcher
	});

	dispatcher.dispatch('/foo/100', {
		id: 'eventDispatcher'
	});

Required libraries
------------------------------------------------------------------------

### Mootools Core
http://mootools.net/core/79d0771b1f1699ecba505c52ebbcc562

Building URLDispatcher
------------------------------------------------------------------------

To do the build, the following command is specified by the packager.  

packager build URLDispatcher/* +use-only URLDispatcher