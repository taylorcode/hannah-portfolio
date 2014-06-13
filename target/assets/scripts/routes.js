(function() {
  window.hannah = angular.module('hannah', ['ngRoute', 'ui.router', 'ngAnimate']).config(function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $provide) {
    var $http;
    $http = null;
    $httpProvider.interceptors.push(function($q, $rootScope, $injector) {
      return {
        request: function(config) {
          $http = $http || $injector.get('$http');
          $rootScope.pendingRequests = $http.pendingRequests.length;
          return config;
        },
        response: function(response) {
          $http = $http || $injector.get('$http');
          $rootScope.pendingRequests = $http.pendingRequests.length;
          return response;
        }
      };
    });
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
  }).run(function($rootScope, $timeout) {
    var loadTimeout, loadTimeoutDuration;
    FastClick.attach(document.body);
    loadTimeout = null;
    loadTimeoutDuration = 300;
    $rootScope.$watch('pendingRequests', function(num) {
      return $rootScope.httpLoading = num ? true : false;
    });
    $rootScope.$watch('httpLoading', function(loading) {
      if (loading) {
        return loadTimeout = $timeout(function() {
          return $rootScope.httpDelayed = true;
        }, loadTimeoutDuration);
      }
      $rootScope.httpDelayed = false;
      return $timeout.cancel(loadTimeout);
    });
    return document.addEventListener('touchstart', function() {
      return log('active pseudoclasses enabled.');
    }, true);
  });

}).call(this);
