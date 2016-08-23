angular.module('FishingFun')

.factory('utilityService', function() {
    var service = {};

    service.arraySorter = function(property, ascending) {
      return function (obj1, obj2) {
        if (property.includes('date') || property.includes('Date')) { 
          var date1 = new Date (obj1[property]);
          var date2 = new Date (obj2[property]);
          return ascending ? date1.getTime()-date2.getTime() : date2.getTime()-date1.getTime(); 
        }
        else {
          var result = (obj1[property] < obj2[property]) ? -1 : (obj1[property] > obj2[property]) ? 1 : 0;
          return ascending ? result : -result;
        } 
      };
    };

    service.getRandomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    service.diffDays = function(date1, date2) {
      var timeDiff = Math.abs(date1.getTime() - date2.getTime());
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    return service;
});