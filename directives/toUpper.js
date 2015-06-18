/**
 * Created by artiom on 10/06/15.
 */
myapp.directive('uppercased', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(input) {
				input ? element.css("text-transform","uppercase") : element.css("text-transform","initial");
				return input ? input.toUpperCase() : "";
			});

		}
	};
});

myapp.directive('lowercased', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(input) {
				input ? element.css("text-transform","lowercase") : element.css("text-transform","initial");
				return input ? input.toLowerCase() : "";
			});

		}
	};
});