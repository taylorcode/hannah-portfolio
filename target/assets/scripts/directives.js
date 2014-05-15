(function() {
  angular.module('hannah').directive('panzoom', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        hzKey: '='
      },
      compile: function(elem, attrs) {
        var $elem;
        $elem = elem.find('img');
        $elem.panzoom({
          $zoomIn: elem.find('.zoom-in'),
          $zoomOut: elem.find('.zoom-out'),
          $zoomRange: elem.find('.zoom-range'),
          $reset: elem.find('.reset')
        });
        return function(scope, elem, attrs) {
          scope.$watch('hzKey', function() {
            return $elem.panzoom('reset');
          });
          return log('panzoom link init');
        };
      }
    };
  }).directive('hzWindowScroll', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        scrollUp: '&hzWindowScroll'
      },
      link: function(scope, elem, attrs) {
        var cb, event, scrollWheelDelay, scrolled;
        scrolled = false;
        event = 'mousewheel';
        scrollWheelDelay = 1000;
        cb = function(e) {
          scope.$apply(function() {
            if (!scrolled) {
              return scope.scrollUp();
            }
          });
          scrolled = true;
          e.preventDefault();
          return $timeout(function() {
            return $(this).off(event, cb);
          }, scrollWheelDelay);
        };
        return $(window).on(event, cb);
      }
    };
  }).directive('hzImageWidth', function() {
    return {
      restrict: 'A',
      scope: {
        hzImageWidth: '=',
        hzAllWidths: '='
      },
      link: function(scope, elem, attrs) {
        return elem.load(function() {
          return scope.$apply(function() {
            return scope.hzImageWidth = elem.outerWidth();
          });
        });
      }
    };
  }).directive('hzElemWidth', function() {
    return {
      restrict: 'A',
      scope: {
        hzElemWidth: '=',
        hzKey: '='
      },
      link: function(scope, elem, attrs) {
        var calculateWidth;
        calculateWidth = function() {
          return scope.hzElemWidth = elem.outerWidth();
        };
        scope.$watch('hzKey', calculateWidth);
        return calculateWidth();
      }
    };
  }).directive('hzGalleryThumbs', function() {
    return {
      templateUrl: 'assets/partials/hz-gallery-thumbs.html',
      restrict: 'A',
      scope: {
        projects: '=hzGalleryThumbs',
        selectedProject: '=',
        selectedImage: '=',
        categoryName: '='
      },
      controller: function($scope) {
        var image, project, reset, slideLimit;
        project = $scope.selectedProject = $scope.projects[0];
        image = $scope.selectedImage = project.images[0];
        $scope.leftOffset = 0;
        $scope.slideIndex = 0;
        slideLimit = false;
        $scope.resizeKey = false;
        reset = function() {
          $scope.slideIndex = 0;
          return $scope.resizeKey = !$scope.resizeKey;
        };
        $(window).resize(_.debounce(function() {
          return $scope.$apply(reset);
        }, 200));
        $scope.selectProjectImage = function(project, image) {
          $scope.selectedProject = project;
          return $scope.selectedImage = image;
        };
        $scope.slideRight = function() {
          if (slideLimit) {
            return;
          }
          if ($scope.containerWidth > $scope.imagesWidth) {
            return;
          }
          if ($scope.slideIndex + 1 > $scope.images.length) {
            return $scope.slideIndex = $scope.images.length - 1;
          } else {
            return $scope.slideIndex += 1;
          }
        };
        $scope.slideLeft = function() {
          if ($scope.slideIndex - 1 < 0) {
            return $scope.slideIndex = 0;
          } else {
            return $scope.slideIndex -= 1;
          }
        };
        $scope.$watch('slideIndex', function(index) {
          var i, slideWidth;
          i = 0;
          slideWidth = 0;
          while (i < index) {
            slideWidth += $scope.images[i].width;
            i++;
          }
          $scope.leftOffset = -slideWidth;
          return slideLimit = false;
        });
        $scope.$watch('projects', function(ps) {
          var notLoaded, totalWidth;
          totalWidth = 0;
          notLoaded = false;
          $scope.images = [];
          _.every(ps, function(p) {
            return _.every(p.images, function(img) {
              log(img);
              if (!img.width) {
                notLoaded = true;
                return false;
              }
              $scope.images.push(img);
              return totalWidth += img.width;
            });
          });
          if (!notLoaded) {
            return $scope.imagesWidth = totalWidth;
          }
        }, true);
        $scope.$watch('leftOffset', function(width) {
          var containerWidth, imagesWidth;
          containerWidth = $scope.containerWidth;
          imagesWidth = $scope.imagesWidth;
          width = -width;
          if (containerWidth - (imagesWidth - width) > 0) {
            $scope.leftOffset = containerWidth - imagesWidth;
            return slideLimit = true;
          }
        });
        this;
        return $scope.$watch('imagesWidth', reset);
      }
    };
  });

}).call(this);
