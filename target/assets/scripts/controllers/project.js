(function() {
  angular.module('hannah').controller('Project', function($scope, $routeParams, $filter) {
    var category, image, project;
    log('Project controller initialized');
    category = $scope.selectedCategory = $scope.category.findByRouteId($routeParams.id);
    project = $scope.selectedProject = category.projects[0];
    image = $scope.selectedImage = project.images[0];
    this.selectProjectImage = function(project, image) {
      $scope.selectedProject = project;
      return $scope.selectedImage = image;
    };
    return this;
  });

}).call(this);
