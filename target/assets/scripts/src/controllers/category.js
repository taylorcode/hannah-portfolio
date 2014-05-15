(function() {
  angular.module('hannah').controller('Category', function($scope, $stateParams, $filter) {
    var category;
    log('Category controller initialized');
    category = $scope.selectedCategory = $scope.category.findByRouteId($stateParams.id);
    return this;
  });

}).call(this);
