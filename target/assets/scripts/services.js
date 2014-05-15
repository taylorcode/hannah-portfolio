(function() {
  angular.module('hannah').filter('titleCaseToDash', function() {
    return function(value) {
      if (value) {
        return value.replace(/\s+/g, '-').toLowerCase();
      }
    };
  });

}).call(this);
