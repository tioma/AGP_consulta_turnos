/**
 * Created by kolesnikov-a on 21/02/14.
 */

var serverUrl = config.url();

var myapp = angular.module('myapp', ['ui.router','ui.bootstrap', 'ngSanitize']);

myapp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	// For any unmatched url, send to
	$urlRouterProvider.otherwise("/consultaTurnos");

	//noinspection JSValidateTypes
	$stateProvider
		.state('consulta', {
			url: "/consultaTurnos",
			templateUrl: "view/consultaTurnos.html"
		})
}]);
