angular.module('FishingFun')

.controller('catchLogController', ['$q', '$filter', '$rootScope', 'utilityService', 'myDataService', 'requestFactory', 
	function ($q, $filter, $rootScope, utilityService, myDataService, requestFactory) {
	var controller = this;
	// functions to be used in view
	controller.getBiggestFishCatch = myDataService.getBiggestFishCatch;
	controller.getBiggestFish = myDataService.getBiggestFish;
	controller.getFishingLocations = myDataService.getFishingLocations;
	controller.getFishingLocationById = myDataService.getFishingLocationById;
	controller.getCatchLog = myDataService.getCatchLog;

	controller.addMissingProperties = function(catchLogEntry) {
		var newCatchFish = $filter('arrayPropertyFinder')(myDataService.fishy, 'fishId', catchLogEntry.catchFishId);

		catchLogEntry.catchFishName = newCatchFish.fishName;
		catchLogEntry.catchFishPhoto = newCatchFish.fishPhoto;
		catchLogEntry.catchFishSpecsText = catchLogEntry.catchDate+" | "
										  +catchLogEntry.catchLength+" cm | "
										  +(catchLogEntry.catchWeigth > 1000 ? (catchLogEntry.catchWeigth/1000).toFixed(2)+" kilo" : catchLogEntry.catchWeigth+" grams");
		return catchLogEntry;
	};

	controller.findBiggestFish = function() {
		var maxWeight = 0;
		var biggestFishNo = -1;

		for (var n = 0; n < myDataService.catchLog.length ; n++) {
		// add missing fish properties to catchLog array entries - fish name, image file name, comment text				
			myDataService.catchLog[n] = controller.addMissingProperties(myDataService.catchLog[n]);

		// check for the biggest catch and get it's index
			if (myDataService.catchLog[n].catchWeigth > maxWeight) {
				maxWeight = myDataService.catchLog[n].catchWeigth;
				biggestFishNo = n;
			}
		}
		return biggestFishNo;
	}

	controller.biggestFishSetup = function(biggestFishNo) {
		var biggestFishNo = controller.findBiggestFish();

		// store trophy catch location for view formation
		myDataService.biggestFish = $filter('arrayPropertyFinder')(myDataService.fishy, 'fishId', myDataService.catchLog[biggestFishNo].catchFishId);
		myDataService.biggestFishCatch = myDataService.catchLog[biggestFishNo];

		// enable trophy desc only if biggest fish weight >= 1kg
		if (myDataService.biggestFishCatch.catchWeight >= 1000) {
			myDataService.trophyVisible = true;
		}
	};

	$q.all([requestFactory.catchLogRequest, requestFactory.fishRequest])
		.then(function(readLocations) {
			myDataService.catchLog = readLocations[0].data.sort(utilityService.arraySorter('catchDate', false));
			$rootScope.$broadcast('catchLogReady'); // event for another view elements

			myDataService.fishy = readLocations[1].data;

			controller.biggestFishSetup();
		});
}]);