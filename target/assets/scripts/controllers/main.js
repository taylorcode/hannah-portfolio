(function() {
  angular.module('hannah').controller('Hannah', function($route, $routeParams, $location, $scope) {
    log('Hannah Controller Initialized');
    this.$route = $route;
    this.$location = $location;
    return this.$routeParams = $routeParams;
  });

}).call(this);
