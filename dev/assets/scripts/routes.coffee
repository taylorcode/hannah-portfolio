window.hannah = angular.module('hannah', ['ngRoute', 'ui.router', 'ngAnimate'])

.config ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $provide) ->
  
  # response interceptor for loading
  $http = null
  $httpProvider.interceptors.push ($q, $rootScope, $injector) ->
    request: (config) ->
      $http = $http or $injector.get '$http'
      $rootScope.pendingRequests = $http.pendingRequests.length
      config
    response: (response) ->
      $http = $http or $injector.get '$http'
      $rootScope.pendingRequests = $http.pendingRequests.length
      response

  $stateProvider
  .state 'home',
    url: '/'
    templateUrl: 'assets/partials/home.html'
    controller: 'Home as home'
  .state 'base',
    templateUrl: 'assets/partials/base.html'
    onEnter: ($rootScope) ->
      $rootScope.coverSlideUp = $rootScope.slidUp = true
  .state 'category',
    url: '/category/:id'
    templateUrl: 'assets/partials/category.html'
    controller: 'Category as category'
    parent: 'base'
  .state 'about',
    url: '/about'
    templateUrl: 'assets/partials/about.html'
    parent: 'base'
  .state 'resume',
    url: '/resume'
    templateUrl: 'assets/partials/resume.html'
    parent: 'base'
  .state 'contact',
    url: '/contact'
    templateUrl: 'assets/partials/contact.html'
    parent: 'base'

  $locationProvider.html5Mode true

.run ($rootScope, $timeout)->
  FastClick.attach document.body

  loadTimeout = null
  loadTimeoutDuration = 300
  # watch pending requests, set httpLoading if > 0
  $rootScope.$watch 'pendingRequests', (num) ->
    $rootScope.httpLoading = if num then true else false

  # set httpDelayed if more than loadTimeoutDuration has passed since httpLoading started
  $rootScope.$watch 'httpLoading', (loading) ->
    if loading
      return loadTimeout = $timeout -> 
        $rootScope.httpDelayed = true
      , loadTimeoutDuration
    $rootScope.httpDelayed = false
    $timeout.cancel loadTimeout
  
  document.addEventListener 'touchstart', ->
    log 'active pseudoclasses enabled.'
  , true

