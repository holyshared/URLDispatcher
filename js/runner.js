(function(){

var Observer = {

	register: function(target, type, callback){
		if (target.addEventListener){
			target.addEventListener(type, callback, false);
		} else {
			target.attachEvent('on' + type, callback);
		}
	}

};

var dispatcher = new URLDispatcher();
dispatcher.register('http://holyshared.github.com/URLDispatcher/', function(context){
});

Observer.register(window, 'load', function(){

	dispatcher.dispatch(window.location.url);

});

}());