describe('popover', function() {
  var elm,
      elmBody,
      scope,
      elmScope,
      tooltipScope,
      $document;

  // load the popover code
  beforeEach(module('ui.bootstrap.popover'));

  // load the template
  beforeEach(module('uib/template/popover/popover.html'));

  beforeEach(inject(function($rootScope, $compile, _$document_) {
    $document = _$document_;
    elmBody = angular.element(
      '<div><span uib-popover="popover text">Selector Text</span></div>'
    );

    scope = $rootScope;
    $compile(elmBody)(scope);
    scope.$digest();
    elm = elmBody.find('span');
    elmScope = elm.scope();
    tooltipScope = elmScope.$$childTail;
  }));

  afterEach(function() {
    $document.off('keypress');
  });

  it('should not be open initially', inject(function() {
    expect(tooltipScope.isOpen).toBe(false);

    // We can only test *that* the popover-popup element wasn't created as the
    // implementation is templated and replaced.
    expect(elmBody.children().length).toBe(1);
  }));

  it('should open on click', inject(function() {
    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(true);

    // We can only test *that* the popover-popup element was created as the
    // implementation is templated and replaced.
    expect(elmBody.children().length).toBe(2);
  }));

  it('should close on second click', inject(function() {
    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(true);
    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(false);
  }));

  it('should not unbind event handlers created by other directives - issue 456', inject(function($compile) {
    scope.click = function() {
      scope.clicked = !scope.clicked;
    };

    elmBody = angular.element(
      '<div><input uib-popover="Hello!" ng-click="click()" popover-trigger="mouseenter"/></div>'
    );
    $compile(elmBody)(scope);
    scope.$digest();

    elm = elmBody.find('input');

    elm.trigger('mouseenter');
    elm.trigger('mouseleave');
    expect(scope.clicked).toBeFalsy();

    elm.click();
    expect(scope.clicked).toBeTruthy();
  }));

  it('should popup with animate class by default', inject(function() {
    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(true);

    expect(elmBody.children().eq(1)).toHaveClass('fade');
  }));

  it('should popup without animate class when animation disabled', inject(function($compile) {
    elmBody = angular.element(
      '<div><span uib-popover="popover text" popover-animation="false">Selector Text</span></div>'
    );

    $compile(elmBody)(scope);
    scope.$digest();
    elm = elmBody.find('span');
    elmScope = elm.scope();
    tooltipScope = elmScope.$$childTail;

    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(true);
    expect(elmBody.children().eq(1)).not.toHaveClass('fade');
  }));

  describe('supports options', function() {
    describe('placement', function() {
      it('can specify an alternative, valid placement', inject(function($compile) {
        elmBody = angular.element(
          '<div><span uib-popover="popover text" popover-placement="left">Trigger here</span></div>'
        );
        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        elm.trigger('click');
        tooltipScope.$digest();
        expect(tooltipScope.isOpen).toBe(true);

        expect(elmBody.children().length).toBe(2);
        var ttipElement = elmBody.find('div.popover');
        expect(ttipElement).toHaveClass('left');
      }));
    });

    describe('class', function() {
      it('can specify a custom class', inject(function($compile) {
        elmBody = angular.element(
          '<div><span uib-popover="popover text" popover-class="custom">Trigger here</span></div>'
        );
        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        elm.trigger('click');
        tooltipScope.$digest();
        expect(tooltipScope.isOpen).toBe(true);

        expect(elmBody.children().length).toBe(2);
        var ttipElement = elmBody.find('div.popover');
        expect(ttipElement).toHaveClass('custom');
      }));
    });

    describe('is-open', function() {
      beforeEach(inject(function ($compile) {
        scope.isOpen = false;
        elmBody = angular.element(
          '<div><span uib-popover="popover text" popover-placement="left" popover-is-open="isOpen">Trigger here</span></div>'
        );
        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;
      }));

      it('should show and hide with the controller value', function() {
        expect(tooltipScope.isOpen).toBe(false);
        elmScope.isOpen = true;
        elmScope.$digest();
        expect(tooltipScope.isOpen).toBe(true);
        elmScope.isOpen = false;
        elmScope.$digest();
        expect(tooltipScope.isOpen).toBe(false);
      });

      it('should update the controller value', function() {
        elm.trigger('click');
        tooltipScope.$digest();
        expect(elmScope.isOpen).toBe(true);
        elm.trigger('click');
        tooltipScope.$digest();
        expect(elmScope.isOpen).toBe(false);
      });
    });
  });
});
