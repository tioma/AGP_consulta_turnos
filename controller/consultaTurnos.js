/**
 * Created by artiom on 10/06/15.
 */

myapp.controller('consultaTurnosCtrl', ['$scope', 'turnosFactory', 'dialogs', '$sce', function($scope, turnosFactory, dialogs, $sce){
	$scope.email = '';
	$scope.contenedor = '';
	$scope.validEmail = false;

	$scope.cargando = false;
	$scope.mostrarResultado = false;
	$scope.mostrarHTML = false;
	$scope.turnos = [];

	$scope.deshabilitarConsulta = true;

	$scope.$watch('contenedor', function(){
		if (!angular.isDefined($scope.contenedor)) $scope.contenedor = '';
		$scope.deshabilitarConsulta = !$scope.validEmail || $scope.contenedor == '';
	});

	$scope.$watch('email', function(){
		var expr = /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		$scope.validEmail = expr.test($scope.email);
		$scope.deshabilitarConsulta = !$scope.validEmail || $scope.contenedor == '';
	});

	$scope.consultar = function(){
		$scope.cargando = true;
		turnosFactory.traerTurnos($scope.email, $scope.contenedor, function(data, tipo){
			if (tipo == 'json'){
				if (data.status == 'OK'){
					if (data.data.length > 0){
						$scope.mostrarResultado = true;
						$scope.turnos = data.data;
					} else {
						dialogs.notify('Consulta de turnos', 'No se hallaron turnos cargados con el mail y contenedor enviados');
					}
				} else {
					dialogs.error('Consulta de turnos', 'Se ha producido un error al cargar los datos');
				}
			} else if (tipo == 'error') {
				dialogs.error('Consulta de turnos', 'Se ha producido un error al cargar los datos');
			} else {
				$scope.respuesta = data;
				$scope.mostrarHTML = true;
			}
			$scope.cargando = false;
		})
	};

	$scope.seleccionar = function(id){
		$scope.mostrarResultado = false;
		$scope.cargando = true;
		turnosFactory.turnoById($scope.contenedor, id, function(data, status){
			if (status == 'OK'){
				$scope.respuesta = data;
				$scope.mostrarHTML = true;
			} else {
				dialogs.error('Consulta de turnos', 'Se ha producido un error al cargar los datos');
				$scope.mostrarResultado = true;
			}
			$scope.cargando = false;
		})
	};

	$scope.imprimir = function(){
		window.print();
	};

	$scope.to_trusted = function(htmlCode) {
		return $sce.trustAsHtml(htmlCode);
	};

	$scope.volver = function(){
		if ($scope.mostrarHTML){
			if ($scope.turnos.length > 0){
				$scope.mostrarHTML = false;
				$scope.mostrarResultado = true;
			} else {
				$scope.mostrarHTML = false;
				$scope.email = '';
				$scope.contenedor = '';
			}
		} else {
			$scope.mostrarResultado = false;
			$scope.turnos = [];
			$scope.email = '';
			$scope.contenedor = '';
		}
	};

	$scope.hitEnter = function(evt){
		if(angular.equals(evt.keyCode,13) && !$scope.deshabilitarConsulta) $scope.consultar();
	};

}]);
