angular.module('FishingFun')

.factory('myDataService', function() {
  	var service = {};

  	service.currentCountry = null;
  	service.fishingLocations = [];
	service.catchLog=[];
	service.fishy=[];
	service.fishingLog = [];
	service.biggestFish = null;
	service.biggestFishCatch;
	service.trophyVisible = false;
	service.fishingCountries = [];

	service.getFishingLocationById = function(id) {
		for (var i = 0; i<service.fishingLocations.length ; i++) {
			if (service.fishingLocations[i].locationId == id) { 
				return service.fishingLocations[i];
			}
		}
		return null;
	};
	service.getFishyById = function(id) {
		for (var i = 0; i<service.fishy.length ; i++) {
			if (service.fishy[i].fishId == id) { 
				return service.fishy[i];
			}
		}
		return null;
	};
	service.getFishingLocations = function() {
		return service.fishingLocations;
	};
	service.getFishingCountries = function() {
		return service.fishingCountries;
	};
	service.getBiggestFishCatch = function() {
		return service.biggestFishCatch;
	};
	service.getBiggestFish = function() {
		return service.biggestFish;
	};
	service.getCatchLog = function() {
		return service.catchLog;
	};
  	return service;
});