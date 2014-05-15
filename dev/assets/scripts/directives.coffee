angular.module('hannah')

.directive 'panzoom', ($timeout) ->
	restrict: 'A'
	scope:
		hzKey: '='
	compile: (elem, attrs) ->

		# $elem = elem.find 'img'

		# $pz = $elem.panzoom
	 #        $zoomIn: elem.find '.zoom-in'
	 #        $zoomOut: elem.find '.zoom-out'
	 #        $zoomRange: elem.find '.zoom-range'
	 #        $reset: elem.find '.reset'

	 #    $pz.parent().on 'mousewheel.focal', (e) ->
	 #    	e.preventDefault()
	 #    	delta = e.delta or e.originalEvent.wheelDelta
	 #    	zoomOut = (if delta then delta < 0 else e.originalEvent.deltaY > 0)
	 #    	$pz.panzoom 'zoom', zoomOut,
	 #    		increment: 0.1
	 #    		animate: false
	 #    		focal: e


		$elem = elem.find 'img'

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

.directive 'hzWindowScroll', ($timeout) ->
	restrict: 'A'
	scope:
		scrollUp: '&hzWindowScroll'
	link: (scope, elem, attrs) ->
		scrolled = false
		event = 'mousewheel'
		scrollWheelDelay = 1000
		cb = (e) ->
			scope.$apply ->
				scope.scrollUp() if not scrolled
			scrolled = true
			e.preventDefault()
			$timeout ->
				$(@).off event, cb
			, scrollWheelDelay

		$(window).on event, cb


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
		categoryName: '='
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
		    if $scope.slideIndex + 1 > $scope.images.length then $scope.slideIndex = $scope.images.length - 1 else $scope.slideIndex += 1

		$scope.slideLeft = ->
		    if $scope.slideIndex - 1 < 0 then $scope.slideIndex = 0 else $scope.slideIndex -= 1

		$scope.$watch 'slideIndex', (index) ->
		    i = 0
		    slideWidth = 0
		    while i < index
		        slideWidth += $scope.images[i].width
		        i++
		    $scope.leftOffset = -slideWidth
		    slideLimit = false

		$scope.$watch 'projects', (ps) ->
			# for every image, sum the width
			totalWidth = 0
			notLoaded = false
			$scope.images = []
			_.every ps, (p) -> _.every p.images, (img) ->
				log img
				if not img.width
					notLoaded = true
					return false
				$scope.images.push img
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



