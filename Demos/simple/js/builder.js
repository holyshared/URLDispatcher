(function(doc){

	var Builder = this.Builder = {};

	var elements = ['h1', 'h2', 'h3', 'h4', 'p', 'dl', 'dt', 'dd', 'ul', 'li'];
	for (var i = 0; i < elements.length; i++){
		var key = elements[i];
		Builder[key] = build(key);
	};
	
	function build(name){
		var key = name;
		return function(value){
			return element(key, value);
		}
	}
	
	function text(value){
		return doc.createTextNode(value);
	}
	
	function element(element, value){
		var node = doc.createElement(element);
		if (value){
			var nodeText = text(value); 
			node.appendChild(nodeText);
		}
		return node;
	}

}(document));
