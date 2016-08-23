angular.module('FishingFun')

.directive('ffOneFishingLocation', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/onelocation.html',
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
});