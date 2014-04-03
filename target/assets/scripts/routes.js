(function() {
  window.hannah = angular.module('hannah', ['ngRoute']).config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'assets/partials/cover.html'
    }).when('/home', {
      templateUrl: 'assets/partials/home.html',
      controller: 'Home',
      controllerAs: 'home'
    }).when('/project/:id', {
      templateUrl: 'assets/partials/project.html',
      controller: 'Project',
      controllerAs: 'project'
    }).when('/about', {
      templateUrl: 'assets/partials/about.html'
    }).when('/resume', {
      templateUrl: 'assets/partials/Resume.html'
    }).when('/Contact', {
      templateUrl: 'assets/partials/contact.html'
    }).otherwise({
      redirectTo: '/'
    });
    return $locationProvider.html5Mode(true);
  });

}).call(this);
