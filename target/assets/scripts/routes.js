(function() {
  window.hannah = angular.module('hannah', ['ngRoute', 'ui.router', 'ngAnimate']).config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'assets/partials/home.html',
      controller: 'Home as home'
    }).state('base', {
      templateUrl: 'assets/partials/base.html',
      onEnter: function($rootScope) {
        return $rootScope.coverSlideUp = $rootScope.slidUp = true;
      }
    }).state('category', {
      url: '/category/:id',
      templateUrl: 'assets/partials/category.html',
      controller: 'Category as category',
      parent: 'base'
    }).state('about', {
      url: '/about',
      templateUrl: 'assets/partials/about.html',
      parent: 'base'
    }).state('resume', {
      url: '/resume',
      templateUrl: 'assets/partials/resume.html',
      parent: 'base'
    }).state('contact', {
      url: '/contact',
      templateUrl: 'assets/partials/contact.html',
      parent: 'base'
    });
    return $locationProvider.html5Mode(true);
  }).run(function() {
    return FastClick.attach(document.body);
  });

}).call(this);
