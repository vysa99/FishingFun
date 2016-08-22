function arraySorter(property, ascending) {
    return function (obj1, obj2) {
    	if (property.includes('date') || property.includes('Date')) { 
   			var date1 = new Date (obj1[property]);
   			var date2 = new Date (obj2[property]);
    		return ascending ? date1.getTime()-date2.getTime() : date2.getTime()-date1.getTime(); 
    	}
        else {
        	var result = (obj1[property] < obj2[property]) ? -1 : (obj1[property] > obj2[property]) ? 1 : 0;
        	return ascending ? result : -result;
        }	
	}
};

function getRandomInt(min, max) {
  	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min;
};

function diffDays(date1, date2) {
	var timeDiff = Math.abs(date1.getTime() - date2.getTime());
	return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

angular.module('FishingFun', ['ngAnimate', 'ngRoute', 'ngResource'])

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
})

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
}])

.filter('arrayPropertyFinder', function() {
  return function(array, property, value) {
	for (var i = 0; i < array.length ; i++) {
		if (+array[i][property] == +value) {
			return array[i];
		}
	}
	return null;
  }
})

.directive('ffLogo', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/logo.html',
	replace: true, 
    controller: ['$location', function($location) {
    	this.go = function() {
   			$location.path("/").search({});
   		};
    }],
    controllerAs: 'ffLogo'
  };
})

.directive('ffOneSmallPhoto', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/pages/main/onesmallphoto.html',
    replace: true,
    scope: {
    	photo: '='
    },
    link: function(scope, elem, attrs) {
    	//Three levels up since ratio div is two directives up
   		var containerAspectRatio = elem.parent()[0].clientWidth / elem.parent()[0].clientHeight;

// image file name passed as an attribute
   		elem.on('load', function() {
			var imageAspectRatio = this.width / this.height;

			var fillClass = (imageAspectRatio > containerAspectRatio  
			    ? 'fillHeight'
			    : 'fillWidth');
			angular.element(this).addClass(fillClass);	
	    });
    }
  };
})

.directive('ffOneFishingLocation', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/pages/main/onelocation.html',
	replace: true, 
    link: function(scope, elem, attrs) {
    },
    controller: ['$location', function($location) {
    	var controller = this;

    	this.goIfActive = function(fishingLocation) {
    		if (!fishingLocation.unavailable) {
    			$location.path("/location")
    					 .search({id: fishingLocation.locationId});
    		};
    	};
    }],
    controllerAs: 'ffOFLController'
  };
})

.directive('ffCatchLogItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/pages/main/catchlogitem.html',
	replace: true,
    link: function(scope, elem, attrs) {
    },
    controller: ['$location', function($location) {
    	var controller = this;

    	this.go = function(fishId) {
    		$location.path("/fish")
    				 .search({id: fishId});
    	};
    }],
    controllerAs: 'ffCLIController'
  };
})

.directive('ffOneCountryPhoto', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/pages/main/countryphoto.html',
	replace: true, 
    link: function(scope, elem, attrs) {
//    	console.log(scope.$parent.fishingLocationsCtrl);
    }
  };
})

.directive('ffFishingLogTable', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/pages/main/fishinglogtable.html',
	replace: true,
    link: function(scope, elem, attrs) {
    }
  };
})

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
}])

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
}])

.controller('catchLogController', ['$q', '$filter', '$rootScope', 'myDataService', 'requestFactory', function ($q, $filter, $rootScope, myDataService, requestFactory) {
	var controller = this;
	// functions to be used in view
	controller.getBiggestFishCatch = myDataService.getBiggestFishCatch;
	controller.getBiggestFish = myDataService.getBiggestFish;
	controller.getFishingLocations = myDataService.getFishingLocations;
	controller.getFishingLocationById = myDataService.getFishingLocationById;
	controller.getCatchLog = myDataService.getCatchLog;

	controller.biggestFishSetup = function(biggestFishNo) {
		// store trophy catch location for view formation
		myDataService.biggestFish = $filter('arrayPropertyFinder')(myDataService.fishy, 'fishId', myDataService.catchLog[biggestFishNo].catchFishId);
		myDataService.biggestFishCatch = myDataService.catchLog[biggestFishNo];

		// enable trophy desc only if biggest fish weight >= 1kg
		if (myDataService.biggestFishCatch.catchWeight >= 1000) {
			myDataService.trophyVisible = true;
		}
	};

	controller.addMissingProperties = function(catchLogEntry) {
		var newCatchFish = $filter('arrayPropertyFinder')(myDataService.fishy, 'fishId', catchLogEntry.catchFishId);

		catchLogEntry.catchFishName = newCatchFish.fishName;
		catchLogEntry.catchFishPhoto = newCatchFish.fishPhoto;
		catchLogEntry.catchFishSpecsText = catchLogEntry.catchDate+" | "
										  +catchLogEntry.catchLength+" cm | "
										  +(catchLogEntry.catchWeigth > 1000 ? (catchLogEntry.catchWeigth/1000).toFixed(2)+" kilo" : catchLogEntry.catchWeigth+" grams");
		return catchLogEntry;
	};

	$q.all([requestFactory.catchLogRequest, requestFactory.fishRequest])
		.then(function(readLocations) {
			myDataService.catchLog = readLocations[0].data.sort(arraySorter('catchDate', false));
			$rootScope.$broadcast('catchLogReady'); // event for another view elements

			myDataService.fishy = readLocations[1].data;

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
			controller.biggestFishSetup(biggestFishNo);
		});
}])

.controller('fishingLogController', ['$rootScope', 'myDataService', function ($rootScope, myDataService) {
	var controller = this;
   	controller.fishingLog = [];

	$rootScope.$on('catchLogReady', function() {
		var totalFish = 0;
		var totalWeight = 0;
		var locationsVisited = [];
		var locationsCounter = 0;
		var i = 0;
		var todayDate = new Date(new Date().toJSON().slice(0,10)); 
	   	var catchDate = new Date(myDataService.catchLog[0].catchDate);
	   	var fishingLog = [];
	   	var catchLog = myDataService.catchLog;

	// Today catch
		while (catchLog.length > i && todayDate.getTime() == catchDate.getTime()) {
	// update log counters
			totalFish += 1;
	   		totalWeight += catchLog[i].catchWeigth;
	   		if (locationsVisited.indexOf(catchLog[i].catchLocation) == -1) {
	   			locationsVisited.push(catchLog[i].catchLocation);
	   			locationsCounter += 1;
	   		}
			i += 1;
	   		if (i < catchLog.length) { catchDate = new Date (catchLog[i].catchDate); }
		}
		controller.fishingLog.push({title: "Today", totalFish, totalWeight, locationsCounter});

	// This week catch
		while (catchLog.length > i && diffDays(todayDate, catchDate) <= 7) {
	// update log counters
			totalFish += 1;
	   		totalWeight += catchLog[i].catchWeigth;
	   		if (locationsVisited.indexOf(catchLog[i].catchLocation) == -1) {
	   			locationsVisited.push(catchLog[i].catchLocation);
	   			locationsCounter += 1;
	   		}
			i += 1;
	   		if (i < catchLog.length) { catchDate = new Date (catchLog[i].catchDate); }
		}
		controller.fishingLog.push({title: "This Week", totalFish, totalWeight, locationsCounter});

	// This month catch
		while (catchLog.length > i && diffDays(todayDate, catchDate) <= 30) {
	// update log counters
			totalFish += 1;
	   		totalWeight += catchLog[i].catchWeigth;
	   		if (locationsVisited.indexOf(catchLog[i].catchLocation) == -1) {
	   			locationsVisited.push(catchLog[i].catchLocation);
	   			locationsCounter += 1;
	   		}
			i += 1;
	   		if (i < catchLog.length) { catchDate = new Date (catchLog[i].catchDate); }
		}
		controller.fishingLog.push({title: "This Month", totalFish, totalWeight, locationsCounter});

	// This year catch
		while (catchLog.length > i && diffDays(todayDate, catchDate) <= 365) {
	// update log counters
			totalFish += 1;
	   		totalWeight += catchLog[i].catchWeigth;
	   		if (locationsVisited.indexOf(catchLog[i].catchLocation) == -1) {
	   			locationsVisited.push(catchLog[i].catchLocation);
	   			locationsCounter += 1;
	   		}
			i += 1;
	   		if (i < catchLog.length) { catchDate = new Date (catchLog[i].catchDate); }
		}
		controller.fishingLog.push({title: "This Year", totalFish, totalWeight, locationsCounter});
	});
}])


.controller('flickerCountryController', ['$rootScope', 'requestFactory', 'myDataService', function ($rootScope, requestFactory, myDataService) {
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
				var random = getRandomInt(0, locationPhotos.length);
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