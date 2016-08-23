angular.module('FishingFun')

.controller('fishingLocationsController', ['$rootScope', 'myDataService', 'requestFactory', function ($rootScope, myDataService, requestFactory) {
	var controller = this;
	controller.getFishingLocations = myDataService.getFishingLocations;

	requestFactory.fishingLocationsRequest
		.then(function(readLocations) {
			myDataService.fishingLocations = readLocations.data.sort(arraySorter('locationId', true));

			for (var i = 0; i < myDataService.fishingLocations.length; i++) { 
				var thisCountry = myDataService.fishingLocations[i].locationCountry;
				if (myDataService.fishingCountries.indexOf(thisCountry) == -1) {
					myDataService.fishingCountries.push(thisCountry);
				}
			};

			$rootScope.$broadcast('fishingCountriesReady'); // event for another view elements
	});
}]);