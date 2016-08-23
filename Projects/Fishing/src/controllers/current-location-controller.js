angular.module('FishingFun')

.controller('currentLocationController', ['$rootScope', 'myDataService', function ($rootScope, myDataService) {
	var controller = this;
	controller.getFishingCountries = myDataService.getFishingCountries;
	controller.currentCountry = null;

	// initial setting - first countries array entry
	$rootScope.$on('fishingCountriesReady', function() {
		if (myDataService.currentCountry == null) {
			// current country not yet selected - select the first one from the list
			controller.currentCountry = myDataService.fishingCountries[0];
			myDataService.currentCountry = controller.currentCountry;
		}
		else {
			controller.currentCountry = myDataService.currentCountry;
		}

		$rootScope.$broadcast('loadCountryPhotos');
	});

	controller.changeCurrentCountry = function() {
		myDataService.currentCountry = controller.currentCountry;

		$rootScope.$broadcast('loadCountryPhotos');
	}
}]);