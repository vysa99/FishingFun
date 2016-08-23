angular.module('FishingFun')

.filter('arrayPropertyFinder', function() {
  return function(array, property, value) {
	for (var i = 0; i < array.length ; i++) {
		if (+array[i][property] == +value) {
			return array[i];
		}
	}
	return null;
  }
});