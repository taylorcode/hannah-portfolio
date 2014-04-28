(function() {
  angular.module('hannah').controller('Project', function($scope, $stateParams, $filter) {
    var category;
    log('Project controller initialized');
    category = $scope.selectedCategory = $scope.category.findByRouteId($stateParams.id);
    return this;
  });

}).call(this);
