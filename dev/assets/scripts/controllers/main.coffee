angular.module('hannah')

.controller 'Hannah', ($route, $routeParams, $location, $scope) ->
    log 'Hannah Controller Initialized'
    @$route = $route
    @$location = $location
    @$routeParams = $routeParams