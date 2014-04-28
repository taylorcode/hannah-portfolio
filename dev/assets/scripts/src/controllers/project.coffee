angular.module('hannah')

.controller 'Project', ($scope, $stateParams, $filter) ->
    log 'Project controller initialized'

    category = $scope.selectedCategory = $scope.category.findByRouteId $stateParams.id
    # initial set

    @