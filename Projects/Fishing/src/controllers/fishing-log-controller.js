angular.module('FishingFun')

.controller('fishingLogController', ['$rootScope', 'utilityService', 'myDataService', 
	function ($rootScope, utilityService, myDataService) {
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
		while (catchLog.length > i && utilityService.diffDays(todayDate, catchDate) <= 7) {
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
		while (catchLog.length > i && utilityService.diffDays(todayDate, catchDate) <= 30) {
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
		while (catchLog.length > i && utilityService.diffDays(todayDate, catchDate) <= 365) {
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
}]);