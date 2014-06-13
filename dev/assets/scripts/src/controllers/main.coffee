angular.module('hannah')

.controller 'Hannah', ($route, $routeParams, $location, $scope, $http, $filter, $rootScope, $timeout) ->
    log 'Hannah Controller Initialized'
    @$route = $route
    @$location = $location
    @$routeParams = $routeParams
    $rootScope.coverSlideUp = false
    slideUpDuration = 500
    categoriesDir = 'assets/media/images/categories'
    imgResolutions = ['thumb', 'display', 'fullres']

    preloadImages = (categories) ->
        delay = 
        _.each categories, (category) -> _.each category.projects, (project) -> _.each project.images, (img) ->
            convertToDash = $filter 'titleCaseToDash'
            _.each imgResolutions, (res) ->
                (new Image).src = categoriesDir + '/' + convertToDash(category.name) + '/' + convertToDash(project.title) + '/' + res + '/' + img.src

    # get projects, attach to parent $scope
    $http.get 'assets/json/projects.json'
    .success (categories) ->
        $scope.categories = categories
        preloadImages categories
        
    $rootScope.moveCoverSlide = ->
        $rootScope.coverSlideUp = true
        $timeout ->
            $rootScope.slidUp = true
        , slideUpDuration

    $scope.category = 
        findByRouteId: (routeId) ->
            return if not $scope.categories
            foundCategory = null
            _.every $scope.categories, (category) ->
                foundCategory = category if routeId is $filter('titleCaseToDash') category.name
                return false if foundCategory
                true

            foundCategory

    $rootScope.$on '$stateChangeSuccess', ->
        $rootScope.currentRoute = $location.path()