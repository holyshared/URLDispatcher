CHANGE LOG
====================================

v2.1
------------------------------------------------------------------------
* The context object was passed to the argument of the event handler.
* getArg, getArgs, getParam, getParams, and getResource and getResources were not able to be executed in the event handler.
* The getResourceContainer method was mounted. 

v2.0
------------------------------------------------------------------------
* It corresponded to place holders. 
* The resource addition function was added. The added resource can be acquired by using getResource and the getResources method in the event handler.
* PreDispatch, invoke, and the postDispatch method were changed to beforeDispatch, execute, and afterDispatch.
* The event management function was added.
* The method of specifying the route was changed like Fitzgerald. 
* The processing of another URL was able to be executed from the event handler by the redirect method.
* The argument of the event handler was able to be lost, and to acquire the parameter with getArgs, getParam, and getParams getArg to the change it.

v1.0
------------------------------------------------------------------------
* An initial version was released.