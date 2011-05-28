URLDispacher
=======================================



## URLDispacher

	var dispacher = new URLDispacher();
	dispacher.register('/foo/bar', function(context){
		//do something
	});

	or

	var dispacher = new URLDispacher();
	dispacher.register('/foo/bar', {

		preDispach: function(context){
			//do something
		},

		invoke: function(context){
			//do something
		},

		postDispach: function(context){
			//do something
		}

	});

### Methods

* register
* match
* dispatch
* getLength