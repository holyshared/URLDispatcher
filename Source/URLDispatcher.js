/*
---
name: URLDispatcher

description: Core source of urldispatcher.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Function
  - Core/Object

provides: [URLDispatcher]

...
*/

(function(){

var URLDispatcher = this.URLDispatcher = function(){
	this.initialize.apply(this, arguments);
};

Object.append(URLDispatcher, {
	version: '2.1'
});

}());