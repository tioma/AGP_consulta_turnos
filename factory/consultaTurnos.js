/**
 * Created by artiom on 10/06/15.
 */

myapp.factory('turnosFactory', ['$http', function($http){
	var factory = {};

	factory.traerTurnos = function(mail, contenedor, callback){
		var insertUrl = "http://10.10.0.223:8080/appointments/container/" + contenedor;
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

	factory.test = function(callback){
		var insertUrl = "http://10.10.0.223:8080";
		$http.get(insertUrl).success(function(data){
			callback(data);
		}).error(function(data){
			callback(data);
		})
	};

	return factory;
}]);
