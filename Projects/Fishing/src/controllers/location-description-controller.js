angular.module('FishingFun')
.controller('locationDescriptionController', ['$route', 'myDataService', function ($route, myDataService) {
	this.location = myDataService.getFishingLocationById($route.current.params.id);
}]);