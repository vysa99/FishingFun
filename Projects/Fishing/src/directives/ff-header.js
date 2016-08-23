angular.module('FishingFun')

.directive('ffHeader', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/header.html',
	  replace: true, 
    controller: ['$location', function($location) {
    	this.go = function() {
   			$location.path("/").search({});
   		};
    }],
    controllerAs: 'ffHeader'
  };
});