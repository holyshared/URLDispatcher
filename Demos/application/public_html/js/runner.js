(function(win, doc){

	win.addEvent('domready', function(){

		var behavior = new Behavior();
		behavior.apply(behavior.getContentElement());
		
		var delegator = new Delegator();
		delegator.bindToBehavior(behavior);
		delegator.attach(behavior.getContentElement());

	});

}(window, document));
