URLDispatcher
=======================================

URLDispatcherはURLベースのイベントディスパッチャです。  
ルーティングは[Fitzgerald](https://github.com/jim/fitzgerald "Fitzgerald")を参考にしています。

URLDispatcher
------------------------------------------------

詳細はURLDispatcher.URLEventDispatcherを見てください。

### Example

	alert(URLDispatcher.version;) //Alert version.

### Properties

* version - バージョン番号


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
* resources (object) - リーソースオブジェクトのリスト
* routes (array) - ルートオブジェクトのリスト
* onStartup (function) - イベント実行を開始する前に発生します。
* onRoutingStart (function) - ルートの検索を開始する前に発生します。  パラメータにurl、実行引数をイベントリスナーに引き渡します。
* onRoutingEnd (function) - ルートの検索が終了した際に発生します。 マッチした結果をイベントリスナーに引き渡します。
* onShutdown (function) - イベント実行が終了する前に発生します。


### Methods

* addRoute (string, object, [array]) - ルートを追加します。
* addRoutes (object) - ルートを複数追加します。
* removeRoute (string) - ルートを削除します。
* removeRoutes (string, [string]) - ルートを複数削除します。
* dispatch (string, [object]) - イベントを実行します。
* hasRoute (string) - 該当するルートが存在するか調べます。
* getLength - ルート数を返します。


URLDispatcher.Resource
------------------------------------------------

URLDispatcher.Resourceはmixinクラスで、特定のクラスに、リーソース管理の機能を組み込みます。  

	var myResource = {
		key1: 'value1',
		key2: 'value2'
	};

	var dispatcher = new URLDispatcher();
	dispatcher.addResource('myResource', myResource);


### Methods

* addResource (string, object) - リソースを追加します。
* addResources (object) - リソースを複数追加します。
* removeResource (string) - リソースを削除します。
* removeResources (string, [string]) - リソースを複数削除します。
* hasResource (string) - 該当するリソースが存在するか調べます。
* getResource (string) - リソースを取得します。
* getResources (string, [string]) - リソースを複数取得します。
* getResourceContainer - リソースコンテナを返します。


URLDispatcher.Router
------------------------------------------------

URLDispatcher.Routerはイベント実行の判断を行います。  
イベントの実行の判断はスタックされたルートからURLにマッチするものを検出し、マッチした結果を返します。

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

* match (string) - 該当するルートを探します。
* addRoute (string) - ルートを追加します。
* addRoutes (object) - ルートを複数追加します。
* removeRoute (string) - ルートを削除します。
* removeRoutes (object) - ルートを複数削除します。
* hasRoute (string) - 指定したルートを探します。
* getRoute (string) - ルートを取得します。
* getRoutes - ルートを複数取得します。
* getLength - ルート数を返します。


URLDispatcher.Route
------------------------------------------------

URLDispatcher.Routeはルーターにスタックするルートオブジェクトです。  
ディスパッチャはこのオブジェクトで定義された情報を元にイベントを実行するかどうかを判断します。

	var route = new URLDispatcher.Route();
	route.setPaturn('^/:name')
		.setConditions(['\\w+']);

	alert(route.assemble({
		name: 'foo'
	})); ///foo


### Methods

* match (string) - 指定したURLにマッチするかチェックします。
* getPaturn - URLパターンを取得します。
* setPaturn (string) - URLパターンを設定します。
* getConditions - URLのパラメータパターンを取得します。
* setConditions (array) - URLのパラメータパターンを設定します。
* assemble - URLに変換します。
* isValid - ルートが妥当かチェックします。

URLDispatcher.Handler
------------------------------------------------

URLDispatcher.Handlerはディスパッチャで実行されるイベントハンドラです。

イベントハンドラの引数には、functionまたはobjectを指定することができます。  
オブジェクトの場合はpreDispatch, execute, postDispatchをメソッドを実装することができます。

* preDispatch - イベントハンドラを実行する前に実行します。
* execute - イベントハンドラを実行します。 
* postDispatch - イベントハンドラを実行した後に実行します。 

executeメソッドは必ず実装してください。  

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

* getDispatcher - イベントディスパッチャーを取得します。
* setDispatcher (object) - イベントディスパッチャーを設定します。
* redirect (url, args) - リダイレクトします。


URLDispatcher.HandlerManager
------------------------------------------------

URLDispatcher.HandlerManagerはイベントハンドラをURLパターン単位で管理するユーティリティオブジェクトです。  


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

* addHandler (string, function|object) - イベントハンドラを追加します。
* addHandlers (object) - イベントハンドラを複数追加します。
* removeHandler (string) - イベントハンドラを削除します。
* removeHandlers (object) - イベントハンドラを複数削除します。
* hasHandler (string) - 該当するイベントハンドラが存在するか確認します。
* getHandler (string) - イベントハンドラを取得します。
* getHandlers - イベントハンドラを複数取得します。
* getLength - イベントハンドラの数を取得します。
