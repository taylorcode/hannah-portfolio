(function() {
  angular.module('hannah').controller('Category', function($scope, $stateParams, $filter) {
    var category, preloadImages;
    log('Category controller initialized');
    category = $scope.selectedCategory = $scope.category.findByRouteId($stateParams.id);
    preloadImages = function(categories) {
      return _.each($scope.selectedCategory.projects, function(project) {
        return _.each(project.images, function(img) {
          var convertToDash;
          convertToDash = $filter('titleCaseToDash');
          return _.each(imgResolutions, function(res) {
            return (new Image).src = categoriesDir + '/' + convertToDash(category.name) + '/' + convertToDash(project.title) + '/' + res + '/' + img.src;
          });
        });
      });
    };
    return this;
  });

}).call(this);
