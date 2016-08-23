angular.module('FishingFun')

.directive('ffFishingLogTable', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/fishinglogtable.html',
	replace: true,
    link: function(scope, elem, attrs) {
    }
  };
});