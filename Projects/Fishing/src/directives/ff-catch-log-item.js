angular.module('FishingFun')

.directive('ffCatchLogItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/catchlogitem.html',
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
});