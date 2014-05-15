angular.module('hannah')

.controller 'Category', ($scope, $stateParams, $filter) ->
    log 'Category controller initialized'

    category = $scope.selectedCategory = $scope.category.findByRouteId $stateParams.id
    # initial set

    @