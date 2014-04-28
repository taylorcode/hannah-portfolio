(function() {
  angular.module('hannah').controller('Hannah', function($route, $routeParams, $location, $scope, $http, $filter) {
    log('Hannah Controller Initialized');
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
    $http.get('assets/json/projects.json').success(function(categories) {
      return $scope.categories = categories;
    });
    return $scope.category = {
      findByRouteId: function(routeId) {
        var foundCategory;
        if (!$scope.categories) {
          return;
        }
        foundCategory = null;
        _.every($scope.categories, function(category) {
          if ($routeParams.id === $filter('camelCaseToDash')(category.name)) {
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
  });

}).call(this);
