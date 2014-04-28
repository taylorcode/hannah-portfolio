(function() {
  angular.module('hannah').filter('camelCaseToDash', function() {
    return function(value) {
      return value.replace(' ', '-').toLowerCase();
    };
  });

}).call(this);
