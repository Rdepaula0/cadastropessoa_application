var app = angular.module("starter", ["ui.bootstrap"]);

app.config(function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
});

app.filter("capitalize", function () {
	return function (input) {
		return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
	}
});

app.directive("focusMe",
    function ($timeout) {
    	return {
    		scope: { trigger: "@focusMe" }, link: function (scope, element) {
    			scope.$watch("trigger",
                            function (value) {
                            	if (value === "true") {
                            		$timeout(function () {
                            			element[0].focus();
                            		});
                            	}
                            });
    		}
    	};
    });

app.config(["$httpProvider", function ($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind('keydown keypress', function (e) {
			if (e.which == 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});
				e.preventDefault();
			}
		});
	};
});
