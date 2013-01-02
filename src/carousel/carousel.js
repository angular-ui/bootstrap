/*
*
*    Angular Bootstrap Carousel 
*
*      The carousel has all of the function that the original Bootstrap carousel has, except for animations.
*      
*      For no interval set the interval to non-number
*      Template: <carousel interval="none"><slide active="slide.active">{{anything}}</slide></carousel>
*      To change the carousel from outside the carousel itself add in the current-index attribute
*      Template: <carousel interval="none" current-index="int"><slide active="slide.active">{{anything}}</slide></carousel>
*/
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
.controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
  var slides = $scope.slides = [],
    self = this,
    currentTimeout, currentSlide, isPlaying;
  $scope.currentIndex = -1;

  /* direction: "prev" or "next" */
  self.select = function(index, direction) {
    var nextSlide = slides[index];
    if (nextSlide && index != self.selectedIndex) {
      if ($scope.$currentTransition) {
        $scope.$currentTransition.cancel();
        //Timeout so ng-class in template has time to fix classes for finished slide
        $timeout(goNext);
      } else {
        goNext();
      }
    }
    function goNext() {
      //If we have a slide to transition from and we have a transition type and we're allowed, go
      if (currentSlide && angular.isString(direction) && !$scope.noTransition) { 
        //We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
        nextSlide.$element.addClass(direction);
        nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth; //force reflow
        angular.extend(nextSlide, {direction: direction, sliding: true});
        angular.extend(currentSlide||{}, {direction: direction});

        $scope.$currentTransition = $transition(nextSlide.$element, {});
        //We have to create new pointers inside a closure so next/current don't change
        (function(next,current) {
          $scope.$currentTransition.then(
            function(){ transitionDone(next, current); },
            function(){ transitionDone(next, current); }
          );
        }(nextSlide, currentSlide));
      } else {
        transitionDone(nextSlide, currentSlide);
      }
      currentSlide = nextSlide;
      $scope.currentIndex = self.selectedIndex = index;
      //every time you change slides, reset the timer
      restartTimer();
    }
    function transitionDone(next, current) {
      angular.extend(next, {active: true, sliding: false, direction: null});
      angular.extend(current||{}, {active: false, direction: null});
      $scope.$currentTransition = null;
    }
  };

  $scope.next = function() {
    var newIndex = ($scope.currentIndex + 1) % slides.length;
    return self.select(newIndex, 'next');
  };

  $scope.prev = function() {
    var newIndex = $scope.currentIndex - 1 < 0 ? slides.length - 1 : $scope.currentIndex - 1;
    return self.select(newIndex, 'prev');
  };

  function getInterval() {
    var i = +$scope.interval;
    return (isNaN(i) || i<=0) ? 5000 : i;
  }
  function playCarousel() {
    if (isPlaying) {
      $scope.next();
      restartTimer();
    } else {
      $scope.pause();
    }
  }
  function restartTimer() {
    if (currentTimeout) {
      $timeout.cancel(currentTimeout);
    }
    currentTimeout = $timeout(playCarousel, getInterval());
  }
  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };
  $scope.pause = function() {
    isPlaying = false;
    if (currentTimeout) {
      $timeout.cancel(currentTimeout);
    }
  };

  self.addSlide = function(slide, element) {
    angular.extend(slide, {$element: element});
    slides.push(slide);
    //if this is the first slide or the slide is set to active, select it
    if(slides.length === 1 || slide.active) {
      self.select(slides.length - 1);
      if (slides.length == 1) {
        $scope.play();
      }
    } else {
      slide.active = false;
    }
  };

  self.removeSlide = function(slide) {
    //get the index of the slide inside the carousel
    var index = slides.indexOf(slide);
    slides.splice(index, 1);
    if (slides.length > 0 && slide.active) {
      if (index >= slides.length) {
        self.select(index - 1);
      } else {
        self.select(index);
      }
    }
  };
}])
.directive('carousel', [function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    controller: 'CarouselController',
    require: 'carousel',
    templateUrl: 'template/carousel/carousel.html',
    scope: {
      currentIndex: '=',
      interval: '=',
      noTransition: '=' //This really exists so unit tests can test without transitions
    },
    link: function(scope, elm, attrs, carouselCtrl) {
      scope.$watch('currentIndex', function(idx) {
        //If it's a number and it's not same as current selection, change selection
        if (+idx == idx && idx != carouselCtrl.selectedIndex) {
          var selected = carouselCtrl.selectedIndex;
          carouselCtrl.select(idx, idx > selected ? "next" : "prev");
        }
      });
    }
  };
}])
.directive('slide', [function() {
  return {
    require: '^carousel',
    restrict: 'EA',
    transclude: true,
    replace: true,
    templateUrl: 'template/carousel/slide.html',
    scope: {
      active:'='
    },
    link: function (scope, element, attrs, carouselCtrl) {
      carouselCtrl.addSlide(scope, element);
      //the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function (event) {
        carouselCtrl.removeSlide(scope);
      });
    }
  };
}]);
