angular.module('hannah')

.controller 'Category', ($scope, $stateParams, $filter) ->
    log 'Category controller initialized'

    category = $scope.selectedCategory = $scope.category.findByRouteId $stateParams.id
    # initial set

    preloadImages = (categories) ->
        _.each $scope.selectedCategory.projects, (project) -> _.each project.images, (img) ->
            convertToDash = $filter 'titleCaseToDash'
            _.each imgResolutions, (res) ->
                (new Image).src = categoriesDir + '/' + convertToDash(category.name) + '/' + convertToDash(project.title) + '/' + res + '/' + img.src

    @