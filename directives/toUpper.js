/**
 * Created by artiom on 10/06/15.
 */
myapp.directive('uppercased', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(input) {
				return input ? input.toUpperCase() : "";
			});
			element.css("text-transform","uppercase");
		}
	};
});

myapp.directive('lowercased', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(input) {
				return input ? input.toLowerCase() : "";
			});
			element.css("text-transform","lowercase");
		}
	};
});