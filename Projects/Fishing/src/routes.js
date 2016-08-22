angular.module('FishingFun')
.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'templates/pages/main/index.html'
	})
	.when('/location', {
		templateUrl: 'templates/pages/location/index.html'
	})
	.when('/fish', {
		templateUrl: 'templates/pages/fish/index.html'
	})
	.otherwise({redirectTo: '/'});
});