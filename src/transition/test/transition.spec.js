describe('$transition', function() {
  var $transition;

  beforeEach(module('ui.bootstrap.transition'));

  beforeEach(inject(function(_$transition_) {
    $transition = _$transition_;
  }));

  it('returns a promise', function() {
    var element = angular.element('<div></div>');
    expect($transition(element, '').then).toBeDefined();
  });

  it('changes the css if passed a string', function() {
    var element = angular.element('<div></div>');
    spyOn(element, 'addClass');
    $transition(element, 'triggerClass');
    expect(element.addClass).toHaveBeenCalledWith('triggerClass');
  });

  it('changes the style if passed an object', function() {
    var element = angular.element('<div></div>');
    var triggerStyle = { height: '11px' };
    spyOn(element, 'css');
    $transition(element, triggerStyle);
    expect(element.css).toHaveBeenCalledWith(triggerStyle);
  });

  it('calls the function if passed', function() {
    var element = angular.element('<div></div>');
    var triggerFunction = jasmine.createSpy('triggerFunction');
    $transition(element, triggerFunction);
    expect(triggerFunction).toHaveBeenCalledWith(element);
  });

  it('binds a transitionEnd handler to the element', function() {
    var element = angular.element('<div></div>');
    spyOn(element, 'bind');
    $transition(element, '');
    expect(element.bind).toHaveBeenCalledWith($transition.transitionEndEventName, jasmine.any(Function));
  });


  describe('transitionEndEventName', function() {
    it('should be a string if it is defined', function() {
      if ( $transition.transitionEndEventName ) {
        expect($transition.transitionEndEventName).toMatch(/transitionend$/i);
      }
    });
  });

});

