describe('carousel', function() {
  beforeEach(module('ui.bootstrap.carousel', function($compileProvider, $provide) {
    angular.forEach(['ngSwipeLeft', 'ngSwipeRight'], makeMock);
    function makeMock(name) {
      $provide.value(name + 'Directive', []); //remove existing directive if it exists
      $compileProvider.directive(name, function() {
        return function(scope, element, attr) {
          element.on(name, function() {
            scope.$apply(attr[name]);
          });
        };
      });
    }
  }));
  beforeEach(module('ngAnimateMock'));
  beforeEach(module('uib/template/carousel/carousel.html', 'uib/template/carousel/slide.html'));

  var $rootScope, $compile, $controller, $interval, $templateCache, $timeout, $animate;
  beforeEach(inject(function(_$rootScope_, _$compile_, _$controller_, _$interval_, _$templateCache_, _$timeout_, _$animate_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $controller = _$controller_;
    $interval = _$interval_;
    $templateCache = _$templateCache_;
    $timeout = _$timeout_;
    $animate = _$animate_;
  }));

  describe('basics', function() {
    var elm, scope;
    beforeEach(function() {
      scope = $rootScope.$new();
      scope.slides = [
        {content: 'one', index: 0},
        {content: 'two', index: 1},
        {content: 'three', index: 2}
      ];
      elm = $compile(
        '<uib-carousel active="active" interval="interval" no-transition="true" no-pause="nopause">' +
          '<uib-slide ng-repeat="slide in slides track by slide.index" index="slide.index">' +
            '{{slide.content}}' +
          '</uib-slide>' +
        '</uib-carousel>'
      )(scope);
      scope.interval = 5000;
      scope.nopause = undefined;
      scope.$apply();
    });

    function testSlideActive(slideIndex) {
      for (var i = 0; i < scope.slides.length; i++) {
        if (i === slideIndex) {
          expect(scope.active).toBe(scope.slides[i].index);
        } else {
          expect(scope.active).not.toBe(scope.slides[i].index);
        }
      }
    }

    it('should allow overriding of the carousel template', function() {
      $templateCache.put('foo/bar.html', '<div>foo</div>');

      elm = $compile('<uib-carousel template-url="foo/bar.html"></uib-carousel>')(scope);
      $rootScope.$digest();

      expect(elm.html()).toBe('foo');
    });

    it('should allow overriding of the slide template', function() {
      $templateCache.put('foo/bar.html', '<div class="slide">bar</div>');

      elm = $compile(
        '<uib-carousel interval="interval" no-transition="true" no-pause="nopause">' +
          '<uib-slide template-url="foo/bar.html"></uib-slide>' +
        '</uib-carousel>'
      )(scope);
      $rootScope.$digest();

      var slide = elm.find('.slide');
      expect(slide.html()).toBe('bar');
    });

    it('should be able to select a slide via model changes', function() {
      testSlideActive(0);
      scope.$apply('active=1');
      testSlideActive(1);
    });

    it('should create clickable prev nav button', function() {
      var navPrev = elm.find('a.left');
      var navNext = elm.find('a.right');

      expect(navPrev.length).toBe(1);
      expect(navNext.length).toBe(1);
    });

    it('should display clickable slide indicators', function () {
      var indicators = elm.find('ol.carousel-indicators > li');
      expect(indicators.length).toBe(3);
    });

    it('should stop cycling slides forward when noWrap is truthy', function () {
      elm = $compile(
        '<uib-carousel active="active" interval="interval" no-wrap="noWrap">' +
          '<uib-slide ng-repeat="slide in slides track by slide.index" index="slide.index">' +
            '{{slide.content}}' +
          '</uib-slide>' +
        '</uib-carousel>'
      )(scope);

      scope.noWrap = true;
      scope.$apply();

      var $scope = elm.isolateScope();
      spyOn($scope, 'pause');

      scope.active = $scope.slides.length - 1;
      scope.$apply();
      testSlideActive($scope.slides.length - 1);
      $scope.next();
      testSlideActive($scope.slides.length - 1);
      expect($scope.pause).toHaveBeenCalled();
    });

    it('should stop cycling slides backward when noWrap is truthy', function () {
      elm = $compile(
        '<uib-carousel active="active" interval="interval" no-wrap="noWrap">' +
          '<uib-slide ng-repeat="slide in slides track by slide.index" index="slide.index">' +
            '{{slide.content}}' +
          '</uib-slide>' +
        '</uib-carousel>'
      )(scope);

      scope.noWrap = true;
      scope.$apply();

      var $scope = elm.isolateScope();
      spyOn($scope, 'pause');

      testSlideActive(0);
      $scope.prev();
      testSlideActive(0);
      expect($scope.pause).toHaveBeenCalled();
    });

    it('should hide navigation when only one slide', function () {
      scope.slides = [{active:false,content:'one'}];
      scope.$apply();
      elm = $compile(
        '<uib-carousel active="active" interval="interval" no-transition="true">' +
          '<uib-slide ng-repeat="slide in slides" index="$index">' +
            '{{slide.content}}' +
          '</uib-slide>' +
        '</uib-carousel>'
      )(scope);
      var indicators = elm.find('ol.carousel-indicators > li');
      expect(indicators.length).toBe(0);

      var navNext = elm.find('a.right');
      expect(navNext.length).toBe(0);

      var navPrev = elm.find('a.left');
      expect(navPrev.length).toBe(0);
    });

    it('should show navigation when there are 3 slides', function () {
      var indicators = elm.find('ol.carousel-indicators > li');
      expect(indicators.length).not.toBe(0);

      var navNext = elm.find('a.right');
      expect(navNext.length).not.toBe(0);

      var navPrev = elm.find('a.left');
      expect(navPrev.length).not.toBe(0);
    });

    it('should go to next when clicking next button', function() {
      var navNext = elm.find('a.right');
      testSlideActive(0);
      navNext.click();
      testSlideActive(1);
      navNext.click();
      testSlideActive(2);
      navNext.click();
      testSlideActive(0);
    });

    it('should go to prev when clicking prev button', function() {
      var navPrev = elm.find('a.left');
      testSlideActive(0);
      navPrev.click();
      testSlideActive(2);
      navPrev.click();
      testSlideActive(1);
      navPrev.click();
      testSlideActive(0);
    });

    describe('swiping', function() {
      it('should go next on swipeLeft', function() {
        testSlideActive(0);
        elm.triggerHandler('ngSwipeLeft');
        testSlideActive(1);
      });

      it('should go prev on swipeRight', function() {
        testSlideActive(0);
        elm.triggerHandler('ngSwipeRight');
        testSlideActive(2);
      });
    });

    it('should select a slide when clicking on slide indicators', function () {
      var indicators = elm.find('ol.carousel-indicators > li');
      indicators.eq(1).click();
      testSlideActive(1);
    });

    it('shouldnt go forward if interval is NaN or negative or has no slides', function() {
      testSlideActive(0);
      var previousInterval = scope.interval;
      scope.$apply('interval = -1');
      $interval.flush(previousInterval);
      testSlideActive(0);
      scope.$apply('interval = 1000');
      $interval.flush(1000);
      testSlideActive(1);
      scope.$apply('interval = false');
      $interval.flush(1000);
      testSlideActive(1);
      scope.$apply('interval = 1000');
      $interval.flush(1000);
      testSlideActive(2);
      scope.$apply('slides = []');
      $interval.flush(1000);
      testSlideActive(2);
    });

    it('should bind the content to slides', function() {
      var contents = elm.find('div.item');

      expect(contents.length).toBe(3);
      expect(contents.eq(0).text()).toBe('one');
      expect(contents.eq(1).text()).toBe('two');
      expect(contents.eq(2).text()).toBe('three');

      scope.$apply(function() {
        scope.slides[0].content = 'what';
        scope.slides[1].content = 'no';
        scope.slides[2].content = 'maybe';
      });

      expect(contents.eq(0).text()).toBe('what');
      expect(contents.eq(1).text()).toBe('no');
      expect(contents.eq(2).text()).toBe('maybe');
    });

    it('should be playing by default and cycle through slides', function() {
      testSlideActive(0);
      $interval.flush(scope.interval);
      testSlideActive(1);
      $interval.flush(scope.interval);
      testSlideActive(2);
      $interval.flush(scope.interval);
      testSlideActive(0);
    });

    it('should pause and play on mouseover', function() {
      testSlideActive(0);
      $interval.flush(scope.interval);
      testSlideActive(1);
      elm.trigger('mouseenter');
      testSlideActive(1);
      $interval.flush(scope.interval);
      testSlideActive(1);
      elm.trigger('mouseleave');
      $interval.flush(scope.interval);
      testSlideActive(2);
    });

    it('should not pause on mouseover if noPause', function() {
      scope.$apply('nopause = true');
      testSlideActive(0);
      elm.trigger('mouseenter');
      $interval.flush(scope.interval);
      testSlideActive(1);
      elm.trigger('mouseleave');
      $interval.flush(scope.interval);
      testSlideActive(2);
    });

    it('should remove slide from dom and change active slide', function() {
      scope.$apply('active = 2');
      testSlideActive(2);
      scope.$apply('slides.splice(2,1)');
      $timeout.flush(0);
      expect(elm.find('div.item').length).toBe(2);
      testSlideActive(1);
      $interval.flush(scope.interval);
      testSlideActive(0);
      scope.$apply('slides.splice(1,1)');
      $timeout.flush(0);
      expect(elm.find('div.item').length).toBe(1);
      testSlideActive(0);
    });

    it('should change dom when you reassign ng-repeat slides array', function() {
      scope.slides = [
        {content:'new1', index: 4},
        {content:'new2', index: 5},
        {content:'new3', index: 6}
      ];
      scope.$apply();
      var contents = elm.find('div.item');
      expect(contents.length).toBe(3);
      expect(contents.eq(0).text()).toBe('new1');
      expect(contents.eq(1).text()).toBe('new2');
      expect(contents.eq(2).text()).toBe('new3');
    });

    it('should not change if next is clicked while transitioning', function() {
      var carouselScope = elm.children().scope();
      var next = elm.find('a.right');

      testSlideActive(0);
      carouselScope.$currentTransition = true;
      next.click();

      testSlideActive(0);

      carouselScope.$currentTransition = null;
      next.click();
      testSlideActive(1);
    });

    it('should buffer the slides if transition is clicked and only transition to the last requested', function() {
      var carouselScope = elm.children().scope();

      testSlideActive(0);
      carouselScope.$currentTransition = null;
      carouselScope.select(carouselScope.slides[1]);
      $animate.flush();

      testSlideActive(1);

      carouselScope.$currentTransition = true;
      carouselScope.select(carouselScope.slides[2]);
      scope.$apply();

      testSlideActive(1);

      carouselScope.select(carouselScope.slides[0]);
      scope.$apply();

      testSlideActive(1);

      carouselScope.$currentTransition = null;
      $interval.flush(scope.interval);
      $animate.flush();

      testSlideActive(2);

      $interval.flush(scope.interval);
      $animate.flush();

      testSlideActive(0);
    });

    it('issue 1414 - should not continue running timers after scope is destroyed', function() {
      testSlideActive(0);
      $interval.flush(scope.interval);
      testSlideActive(1);
      $interval.flush(scope.interval);
      testSlideActive(2);
      $interval.flush(scope.interval);
      testSlideActive(0);
      spyOn($interval, 'cancel').and.callThrough();
      scope.$destroy();
      expect($interval.cancel).toHaveBeenCalled();
    });

    it('issue 4390 - should reset the currentTransition if there are no slides', function() {
      var carouselScope = elm.children().scope();
      var next = elm.find('a.right');
      scope.slides = [
        {content:'new1', index: 1},
        {content:'new2', index: 2},
        {content:'new3', index: 3}
      ];
      scope.$apply();

      testSlideActive(0);
      carouselScope.$currentTransition = true;

      scope.slides = [];
      scope.$apply();

      expect(carouselScope.$currentTransition).toBe(null);
    });
  });

  describe('slide order', function() {
    var elm, scope;
    beforeEach(function() {
      scope = $rootScope.$new();
      scope.slides = [
        {content: 'one', id: 3},
        {content: 'two', id: 1},
        {content: 'three', id: 2}
      ];
      elm = $compile(
        '<uib-carousel active="active" interval="interval" no-transition="true" no-pause="nopause">' +
          '<uib-slide ng-repeat="slide in slides | orderBy: \'id\' track by slide.id" index="slide.id">' +
            '{{slide.content}}' +
          '</uib-slide>' +
        '</uib-carousel>'
      )(scope);
      scope.$apply();
    });

    function testSlideActive(slideIndex) {
      for (var i = 0; i < scope.slides.length; i++) {
        if (i === slideIndex) {
          expect(scope.active).toBe(scope.slides[i].id);
        } else {
          expect(scope.active).not.toBe(scope.slides[i].id);
        }
      }
    }

    it('should change dom when the order of the slides changes', function() {
      scope.slides[0].id = 3;
      scope.slides[1].id = 2;
      scope.slides[2].id = 1;
      scope.$apply();
      var contents = elm.find('div.item');
      expect(contents.length).toBe(3);
      expect(contents.eq(0).text()).toBe('three');
      expect(contents.eq(1).text()).toBe('two');
      expect(contents.eq(2).text()).toBe('one');
    });

    it('should select next after order change', function() {
      testSlideActive(1);
      var next = elm.find('a.right');
      next.click();
      testSlideActive(2);
    });

    it('should select prev after order change', function() {
      testSlideActive(1);
      var prev = elm.find('a.left');
      prev.click();
      testSlideActive(0);
    });

    it('should add slide in the specified position', function() {
      testSlideActive(1);
      scope.slides[2].id = 4;
      scope.slides.push({content:'four', id: 5});
      scope.$apply();
      var contents = elm.find('div.item');
      expect(contents.length).toBe(4);
      expect(contents.eq(0).text()).toBe('two');
      expect(contents.eq(1).text()).toBe('one');
      expect(contents.eq(2).text()).toBe('three');
      expect(contents.eq(3).text()).toBe('four');
    });

    it('should remove slide after order change', function() {
      testSlideActive(1);
      scope.slides.splice(1, 1);
      scope.$apply();
      var contents = elm.find('div.item');
      expect(contents.length).toBe(2);
      expect(contents.eq(0).text()).toBe('three');
      expect(contents.eq(1).text()).toBe('one');
    });
  });

  describe('controller', function() {
    var scope, ctrl;
    //create an array of slides and add to the scope
    var slides = [
      {'content': 1, index: 0},
      {'content': 2, index: 1},
      {'content': 3, index: 2},
      {'content': 4, index: 3}
    ];

    beforeEach(function() {
      scope = $rootScope.$new();
      scope.noWrap = angular.noop;
      ctrl = $controller('UibCarouselController', {$scope: scope, $element: angular.element('<div></div>')});
      for (var i = 0; i < slides.length; i++) {
        ctrl.addSlide(slides[i]);
      }
    });

    it('should set first slide to active = true and the rest to false', function() {
      angular.forEach(ctrl.slides, function(slide, i) {
        if (i !== 0) {
          expect(slide.slide.active).not.toBe(true);
        } else {
          expect(slide.slide.active).toBe(true);
        }
      });
    });

    it('should add a new slide and not change the active slide', function() {
      var newSlide = {active: false, index: 4};
      expect(ctrl.slides.length).toBe(4);
      ctrl.addSlide(newSlide);
      expect(ctrl.slides.length).toBe(5);
      expect(ctrl.slides[4].slide.active).toBe(false);
      expect(ctrl.slides[0].slide.active).toBe(true);
    });

    it('should remove slide and change active slide if needed', function() {
      expect(ctrl.slides.length).toBe(4);
      ctrl.removeSlide(ctrl.slides[0].slide);
      $timeout.flush(0);
      expect(ctrl.slides.length).toBe(3);
      expect(scope.active).toBe(1);
      ctrl.select(ctrl.slides[2]);
      ctrl.removeSlide(ctrl.slides[2].slide);
      $timeout.flush(0);
      expect(ctrl.slides.length).toBe(2);
      expect(scope.active).toBe(2);
      ctrl.removeSlide(ctrl.slides[0].slide);
      $timeout.flush(0);
      expect(ctrl.slides.length).toBe(1);
      expect(scope.active).toBe(1);
    });

    it('issue 1414 - should not continue running timers after scope is destroyed', function() {
      spyOn(scope, 'next');
      scope.interval = 2000;
      scope.$digest();

      $interval.flush(scope.interval);
      expect(scope.next.calls.count()).toBe(1);

      scope.$destroy();

      $interval.flush(scope.interval);
      expect(scope.next.calls.count()).toBe(1);
    });

    it('should be exposed in the template', inject(function($templateCache) {
      $templateCache.put('uib/template/carousel/carousel.html', '<div>{{carousel.text}}</div>');

      var scope = $rootScope.$new();
      var elm = $compile('<uib-carousel interval="bar" no-transition="false" no-pause="true"></uib-carousel>')(scope);
      $rootScope.$digest();

      var ctrl = elm.controller('uibCarousel');

      expect(ctrl).toBeDefined();

      ctrl.text = 'foo';
      $rootScope.$digest();

      expect(elm.html()).toBe('foo');
    }));
  });

  it('should expose a custom model in the carousel slide', function() {
    var scope = $rootScope.$new();
    scope.slides = [
      {active:false,content:'one'},
      {active:false,content:'two'},
      {active:false,content:'three'}
    ];
    var elm = $compile(
      '<uib-carousel active="active" interval="interval" no-transition="true" no-pause="nopause">' +
        '<uib-slide ng-repeat="slide in slides" index="$index" actual="slide">' +
          '{{slide.content}}' +
        '</uib-slide>' +
      '</uib-carousel>'
    )(scope);
    $rootScope.$digest();

    var ctrl = elm.controller('uibCarousel');

    expect(angular.equals(ctrl.slides.map(function(slide) {
      return slide.slide.actual;
    }), scope.slides)).toBe(true);
  });
});
