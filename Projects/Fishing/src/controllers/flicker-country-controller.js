angular.module('FishingFun')

.controller('flickerCountryController', ['$rootScope', 'requestFactory', 'utilityService', 'myDataService', 
	function ($rootScope, requestFactory, utilityService, myDataService) {
	var controller = this;
	controller.countryPhotos = [];
	var randomNumbers = [];

	$rootScope.$on('loadCountryPhotos', function() {
		controller.location = myDataService.currentCountry;


		requestFactory.getFlickerJSON(controller.location)
			.then(function(response) {
			var locationPhotos = response.data.items;

	// select 4 random photo numbers
			while (randomNumbers.length < 4 && randomNumbers.length < locationPhotos.length) {
				var random = utilityService.getRandomInt(0, locationPhotos.length);
				if (randomNumbers.indexOf(random) == -1) { 
					randomNumbers.push(random); }
			};

			controller.countryPhotos.length = 0;
			for (var i = 0; i < randomNumbers.length; i++) {
				var thisPhoto = locationPhotos[randomNumbers[i]];
				controller.countryPhotos.push({photoURL: thisPhoto.media.m, title: thisPhoto.title});
			};
		})
	});
}]);