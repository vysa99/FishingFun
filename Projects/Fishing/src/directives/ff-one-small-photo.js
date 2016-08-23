angular.module('FishingFun')

.directive('ffOneSmallPhoto', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/templates/onesmallphoto.html',
    replace: true,
    scope: {
    	photo: '='
    },
    link: function(scope, elem, attrs) {
    	//Three levels up since ratio div is two directives up
   		var containerAspectRatio = elem.parent()[0].clientWidth / elem.parent()[0].clientHeight;

// image file name passed as an attribute
   		elem.on('load', function() {
			var imageAspectRatio = this.width / this.height;

			var fillClass = (imageAspectRatio > containerAspectRatio  
			    ? 'fillHeight'
			    : 'fillWidth');
			angular.element(this).addClass(fillClass);	
	    });
    }
  };
});