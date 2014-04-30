window.hannah = angular.module('hannah', ['ngRoute', 'ui.router', 'ngAnimate'])

.config ($locationProvider, $stateProvider, $urlRouterProvider) ->

    $stateProvider
    .state 'home',
      url: '/'
      templateUrl: 'assets/partials/home.html'
      controller: 'Home as home'
    .state 'base',
      templateUrl: 'assets/partials/base.html'
      onEnter: ($rootScope) ->
        $rootScope.coverSlideUp = $rootScope.slidUp = true
    .state 'project',
      url: '/project/:id'
      templateUrl: 'assets/partials/project.html'
      controller: 'Project as project'
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

.run ->
  FastClick.attach document.body
  

