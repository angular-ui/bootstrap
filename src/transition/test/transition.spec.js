
describe('$transition', function() {

  // Work out if we are running IE
  var ie = (function(){
      var v = 3,
          div = document.createElement('div'),
          all = div.getElementsByTagName('i');
      do {
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
      } while(all[0]);
      return v > 4 ? v : undefined;
  }());

  var $transition, $timeout;

  beforeEach(module('ui.bootstrap.transition'));

  beforeEach(inject(function(_$transition_, _$timeout_) {
    $transition = _$transition_;
    $timeout = _$timeout_;
  }));

  it('returns a promise', function() {
    var element = angular.element('<div></div>');
    expect($transition(element, '').then).toBeDefined();
  });

  it('changes the css if passed a string', function() {
    var element = angular.element('<div></div>');
    spyOn(element, 'addClass');
    $transition(element, 'triggerClass');
    $timeout.flush();

    expect(element.addClass).toHaveBeenCalledWith('triggerClass');
  });

  it('changes the style if passed an object', function() {
    var element = angular.element('<div></div>');
    var triggerStyle = { height: '11px' };
    spyOn(element, 'css');
    $transition(element, triggerStyle);
    $timeout.flush();
    expect(element.css).toHaveBeenCalledWith(triggerStyle);
  });

  it('calls the function if passed', function() {
    var element = angular.element('<div></div>');
    var triggerFunction = jasmine.createSpy('triggerFunction');
    $transition(element, triggerFunction);
    $timeout.flush();
    expect(triggerFunction).toHaveBeenCalledWith(element);
  });

  // Versions of Internet Explorer before version 10 do not have CSS transitions
  if ( !ie  || ie > 9 ) {

    describe('transitionEndEventName', function() {
      it('should be a string ending with transitionend', function() {
        expect($transition.transitionEndEventName).toMatch(/transitionend$/i);
      });
    });

    it('binds a transitionEnd handler to the element', function() {
      var element = angular.element('<div></div>');
      spyOn(element, 'bind');
      $transition(element, '');
      expect(element.bind).toHaveBeenCalledWith($transition.transitionEndEventName, jasmine.any(Function));
    });
  
    it('resolves the promise when the transitionEnd is triggered', function() {
      var element = angular.element('<div></div>');
      var triggerTransitionEnd;
      var resolutionHandler = jasmine.createSpy('resolutionHandler');

      // Mock up the element.bind method
      spyOn(element, 'bind').andCallFake(function(element, handler) {
        // Store the handler to be used to simulate the end of the transition later
        triggerTransitionEnd = handler;
      });
      // Run the transition
      $transition(element, '').then(resolutionHandler);
      // Simulate the end of transition event
      triggerTransitionEnd();
      // Run the digest to cause $q resolves to be processed
      inject(function($rootScope) { $rootScope.$digest(); });

      expect(resolutionHandler).toHaveBeenCalledWith(element);
    });

  } else {

    describe('transitionEndEventName', function() {
      it('should be undefined', function() {
        expect($transition.transitionEndEventName).not.toBeDefined();
      });
    });

    it('does not bind a transitionEnd handler to the element', function() {
      var element = angular.element('<div></div>');
      spyOn(element, 'bind');
      $transition(element, '');
      expect(element.bind).not.toHaveBeenCalledWith($transition.transitionEndEventName, jasmine.any(Function));
    });

    it('resolves the promise', function() {
      var element = angular.element('<div></div>');
      var transitionEndHandler = jasmine.createSpy('transitionEndHandler');
      $transition(element, '').then(transitionEndHandler);
      $timeout.flush();
      expect(transitionEndHandler).toHaveBeenCalledWith(element);
    });

  }
});

