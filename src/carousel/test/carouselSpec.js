describe('carousel', function() {
  beforeEach(module('ui.bootstrap.carousel'));
  beforeEach(module('template/carousel/carousel.html', 'template/carousel/slide.html'));
  
  var $rootScope, elm, $compile, $controller, $timeout, $transition;
  beforeEach(inject(function(_$rootScope_, _$compile_, _$controller_, _$timeout_, _$transition_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $controller = _$controller_;
    $timeout = _$timeout_;
    $transition = _$transition_;
  }));

  describe('basics', function() {
    var elm, scope, carouselScope;
    beforeEach(function() {
      scope = $rootScope.$new();
      scope.slides = [
        {active:false,content:'one'},
        {active:false,content:'two'},
        {active:false,content:'three'}
      ];
      elm = $compile(
        '<carousel current-index="selector" interval="2500" playing="shouldPlay" no-transition="true">' +
          '<slide ng-repeat="slide in slides" active="slide.active">' +
            '{{slide.content}}' +
          '</slide>' +
        '</carousel>' 
      )(scope);
      carouselScope = elm.scope();
      scope.$apply();
    });
    afterEach(function() {
      scope.$destroy();
    });

    function testSlideActive(slideIndex) {
      for (var i=0; i<scope.slides.length; i++) {
        if (i == slideIndex) {
          expect(carouselScope.currentIndex).toBe(slideIndex);
          expect(scope.selector).toBe(slideIndex);
          expect(scope.slides[slideIndex].active).toBe(true);
        } else {
          expect(scope.slides[i].active).not.toBe(true);
        }
      }
    }

    it('should set the selected slide to active = true', function() {
      expect(scope.slides[0].content).toBe('one');
      testSlideActive(0);
      scope.$apply('selector = 1');
      testSlideActive(1);
    });

    it('should create clickable prev nav button', function() {
      var navPrev = elm.find('a.left');
      var navNext = elm.find('a.right');

      expect(navPrev.length).toBe(1);
      expect(navNext.length).toBe(1);
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
      $timeout.flush();
      testSlideActive(1);
      $timeout.flush();
      testSlideActive(2);
      $timeout.flush();
      testSlideActive(0);
    });

    it('should pause and play on mouseover', function() {
      testSlideActive(0);
      $timeout.flush();
      testSlideActive(1);
      elm.trigger('mouseenter');
      expect($timeout.flush).toThrow();//pause should cancel current timeout
      testSlideActive(1);
      elm.trigger('mouseleave');
      $timeout.flush();
      testSlideActive(2);
    });
  });

  describe('controller', function() {
    var scope, ctrl;
    //create an array of slides and add to the scope
    var slides = [{'active': false,'content': 123},{'active': false,'content': 456}];

    beforeEach(function() {
      scope = $rootScope.$new();
      ctrl = $controller('CarouselController', {$scope: scope, $element: null});
      for(var i = 0;i < slides.length;i++){
        ctrl.addSlide(slides[i]);
      }
    });
    afterEach(function() {
      scope.$destroy();
    });

    describe('addSlide', function() {
      it('should set first slide to active = true', function() {
        expect(scope.slides[0].content).toBe(123);
        expect(scope.slides[0].active).toBe(true);
        expect(scope.slides[1].active).not.toBe(true);
      });

      it('should have two slides in the scope', function() {
        expect(scope.slides).toEqual([slides[0], slides[1]]);
      });

      it('should add new slide and change active to true if active is true on the added slide', function() { 
        var newslide = {active: true};
        expect(scope.slides.length).toBe(2);
        ctrl.addSlide(newslide);
        expect(scope.slides.length).toBe(3);
        expect(scope.slides[2].active).toBe(true);
        expect(scope.slides[0].active).toBe(false);
      });

      it('should add a new slide and not change the active slide', function() { 
        var newslide = {active: false};
        expect(scope.slides.length).toBe(2);
        ctrl.addSlide(newslide);
        expect(scope.slides.length).toBe(3);
        expect(scope.slides[2].active).toBe(false);
        expect(scope.slides[0].active).toBe(true);
      });

      it('should remove slide and change active slide if needed', function() {
        var newslide = {};
        ctrl.addSlide(newslide);
        expect(scope.slides.length).toBe(3);
        expect(ctrl.selectedIndex).toBe(0);
        ctrl.removeSlide(slides[0]);
        expect(scope.slides.length).toBe(2);
        expect(ctrl.selectedIndex).toBe(0);
        ctrl.select(1);
        ctrl.removeSlide(newslide);
        expect(scope.slides.length).toBe(1);
        expect(ctrl.selectedIndex).toBe(0);
      });
    });
  });
});
