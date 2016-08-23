angular.module('FishingFun')
.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/main.html'
	})
	.when('/location', {
		templateUrl: 'views/location.html'
	})
	.when('/fish', {
		templateUrl: 'views/fish.html'
	})
	.otherwise({redirectTo: '/'});
});