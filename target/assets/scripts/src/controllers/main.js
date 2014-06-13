(function() {
  angular.module('hannah').controller('Hannah', function($route, $routeParams, $location, $scope, $http, $filter, $rootScope, $timeout) {
    var categoriesDir, imgResolutions, slideUpDuration;
    log('Hannah Controller Initialized');
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
    $rootScope.coverSlideUp = false;
    slideUpDuration = 500;
    categoriesDir = 'assets/media/images/categories';
    imgResolutions = ['thumb', 'display', 'fullres'];
    $http.get('assets/json/projects.json').success(function(categories) {
      return $scope.categories = categories;
    });
    $rootScope.moveCoverSlide = function() {
      $rootScope.coverSlideUp = true;
      return $timeout(function() {
        return $rootScope.slidUp = true;
      }, slideUpDuration);
    };
    $scope.category = {
      findByRouteId: function(routeId) {
        var foundCategory;
        if (!$scope.categories) {
          return;
        }
        foundCategory = null;
        _.every($scope.categories, function(category) {
          if (routeId === $filter('titleCaseToDash')(category.name)) {
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
