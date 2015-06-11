/**
 * Created by kolesnikov-a on 21/02/14.
 */

var myapp = angular.module('myapp', ['ui.router','ui.bootstrap', 'ngSanitize']);

myapp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	// For any unmatched url, send to /login
	$urlRouterProvider.otherwise("/consultaTurnos");

	//noinspection JSValidateTypes
	$stateProvider
		.state('consulta', {
			url: "/consultaTurnos",
			templateUrl: "view/consultaTurnos.html"
		})
}]);

myapp.run(['$injector', function($injector){

	// Le agrega el token a todas las consultas $http
	$injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
		headersGetter()['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5vcmVwbHlAcHVlcnRvYnVlbm9zYWlyZXMuZ29iLmFyIn0.g4d2NfkU5vIYfkG2QuEsKpTiT_-jpYLK5QGriiKa4Ck';
		if (data) { return angular.toJson(data); }
	};

}]);
