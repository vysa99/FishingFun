angular.module('FishingFun')

.factory('requestFactory', ['$http', function($http) {
	var factory = {};

	factory.catchLogRequest = $http({
		url: 'http://localhost:8080/catch-log/all',
		method: 'GET'
	});

	factory.fishRequest = $http({
		url: 'http://localhost:8080/fishy/all',
		method: 'GET'
	});

	factory.fishingLocationsRequest = $http({
		url: 'http://localhost:8080/fishing-location/all',
		method: 'GET'
	});

  	factory.getFlickerJSON = function(location) {
 		var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+location+"&jsoncallback=JSON_CALLBACK";

	  	return $http.jsonp(flickerAPI)
	};

	return factory;
}]);