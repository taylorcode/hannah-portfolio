(function() {
  angular.module('hannah').controller('Hannah', function($route, $routeParams, $location, $scope, $http, $filter, $rootScope) {
    log('Hannah Controller Initialized');
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
    $rootScope.coverSlideUp = false;
    $http.get('assets/json/projects.json').success(function(categories) {
      return $scope.categories = categories;
    });
    $rootScope.moveCoverSlide = function() {
      return $rootScope.coverSlideUp = true;
    };
    $scope.category = {
      findByRouteId: function(routeId) {
        var foundCategory;
        if (!$scope.categories) {
          return;
        }
        foundCategory = null;
        _.every($scope.categories, function(category) {
          if (routeId === $filter('camelCaseToDash')(category.name)) {
            foundCategory = category;
          }
          if (foundCategory) {
            return false;
          }
          return true;
        });
        return foundCategory;
      }
    };
    return $rootScope.$on('$stateChangeSuccess', function() {
      return $rootScope.currentRoute = $location.path();
    });
  });

}).call(this);
