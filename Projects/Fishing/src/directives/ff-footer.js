angular.module('FishingFun')

.directive('ffFooter', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/footer.html',
	replace: true
  };
});