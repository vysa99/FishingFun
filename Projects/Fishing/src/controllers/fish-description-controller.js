angular.module('FishingFun')
.controller('fishDescriptionController', ['$route', 'myDataService', function ($route, myDataService) {
	this.fish = myDataService.getFishyById($route.current.params.id);
}]);