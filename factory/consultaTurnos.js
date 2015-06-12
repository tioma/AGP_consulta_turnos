/**
 * Created by artiom on 10/06/15.
 */

myapp.factory('turnosFactory', ['$http', function($http){
	var factory = {};

	factory.traerTurnos = function(mail, contenedor, callback){
		var insertUrl = serverUrl + "/appointments/container/" + contenedor;
		$http.get(insertUrl, {params:{ email: mail }}).success(function(data, status, headers){
			var contentType = headers('Content-Type');
			if (contentType.indexOf('application/json') >= 0){
				callback(data, 'json');
			} else {
				callback(data, 'html');
			}
		}).error(function(data){
			callback(data, 'error');
		})
	};

	factory.turnoById = function(contenedor, id, callback){
		var insertUrl = serverUrl + "/appointments/container/" + contenedor;
		$http.get(insertUrl, {params:{ _id: id }}).success(function(data){
			callback(data, 'OK');
		}).error(function(data){
			callback(data, 'ERROR');
		})
	};

	return factory;
}]);
