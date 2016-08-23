angular.module('FishingFun')

.directive('ffOneCountryPhoto', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/countryphoto.html',
	replace: true, 
    link: function(scope, elem, attrs) {
//    	console.log(scope.$parent.fishingLocationsCtrl);
    }
  };
});