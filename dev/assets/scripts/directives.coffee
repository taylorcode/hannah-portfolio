angular.module('hannah')

.directive 'panzoom', ($timeout) ->
	restrict: 'A'
	scope:
		hzKey: '='
	compile: (elem, attrs) ->

		$elem = elem.find '.zoom'

		$elem.panzoom
	        $zoomIn: elem.find '.zoom-in'
	        $zoomOut: elem.find '.zoom-out'
	        $zoomRange: elem.find '.zoom-range'
	        $reset: elem.find '.reset'

		return (scope, elem, attrs) ->
			# reset when image changes
			scope.$watch 'hzKey', ->
				$elem.panzoom 'reset'
			log 'panzoom link init'

.directive 'hzWindowScroll', ->
	restrict: 'A'
	scope:
		scrollUp: '&hzWindowScroll'
	link: (scope, elem, attrs) ->
		scrolled = false
		$(window).on 'scroll', ->
			scope.$apply ->
				scope.scrollUp() if not scrolled
			scrolled = true


.directive 'hzImageWidth', () ->
	restrict: 'A'
	scope:
		hzImageWidth: '='
		hzAllWidths: '='
	link: (scope, elem, attrs) ->
		elem.load ->
			scope.$apply ->
				scope.hzImageWidth = elem.outerWidth()

.directive 'hzElemWidth', () ->
	restrict: 'A'
	scope:
		hzElemWidth: '='
		hzKey: '='
	link: (scope, elem, attrs) ->
		calculateWidth = ->
			scope.hzElemWidth = elem.outerWidth()
		scope.$watch 'hzKey', calculateWidth
		calculateWidth()


.directive 'hzGalleryThumbs', () ->
	templateUrl: 'assets/partials/hz-gallery-thumbs.html'
	restrict: 'A'
	scope:
		projects: '=hzGalleryThumbs'
		selectedProject: '='
		selectedImage: '='
	controller: ($scope) ->

		project = $scope.selectedProject = $scope.projects[0]
		image = $scope.selectedImage = project.images[0]

		$scope.leftOffset = 0
		$scope.slideIndex = 0
		slideLimit = false
		$scope.resizeKey = false

		# resets the slide index and forces the resizeKey model to update to recalculate the width of the images
		reset = ->
			$scope.slideIndex = 0
			$scope.resizeKey = not $scope.resizeKey

		$(window).resize _.debounce ->
			$scope.$apply reset
		, 200

		$scope.selectProjectImage = (project, image) ->
			$scope.selectedProject = project
			$scope.selectedImage = image

		$scope.slideRight = ->
		    return if slideLimit
		    return if $scope.containerWidth > $scope.imagesWidth
		    if $scope.slideIndex + 1 > project.images.length then $scope.slideIndex = project.images.length else $scope.slideIndex += 1

		$scope.slideLeft = ->
		    if $scope.slideIndex - 1 < 0 then $scope.slideIndex = 0 else $scope.slideIndex -= 1

		$scope.$watch 'slideIndex', (index) ->
		    i = 0
		    slideWidth = 0
		    while i < index
		        slideWidth += project.images[i].width
		        i++
		    $scope.leftOffset = -slideWidth
		    slideLimit = false

		$scope.$watch 'projects', (ps) ->
			# for every image, sum the width
			totalWidth = 0
			notLoaded = false
			_.every ps, (p) -> _.every p.images, (img) ->
				if not img.width
					notLoaded = true
					return false
				totalWidth += img.width
			$scope.imagesWidth = totalWidth if not notLoaded
		, true

		# may want to catch the leftOffset and assign the value
		$scope.$watch 'leftOffset', (width) ->
			containerWidth = $scope.containerWidth
			imagesWidth = $scope.imagesWidth
			width = -width # inverse for calculation
			if containerWidth - (imagesWidth - width) > 0
		        $scope.leftOffset = containerWidth - imagesWidth
		        slideLimit = true
		@

		# whenever we add images, or images load, reset because width changes
		$scope.$watch 'imagesWidth', reset



