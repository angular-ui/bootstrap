describe('popover', function() {
  var elm,
      elmBody,
      scope,
      elmScope,
      tooltipScope;

  // load the popover code
  beforeEach(module('ui.bootstrap.popover'));

  // load the template
  beforeEach(module('uib/template/popover/popover-html.html'));

  beforeEach(inject(function($rootScope, $compile, $sce, _$document_) {
    $document = _$document_;
    elmBody = angular.element(
      '<div><span uib-popover-html="template">Selector Text</span></div>'
    );

    scope = $rootScope;
    scope.template = $sce.trustAsHtml('<span>My template</span>');
    $compile(elmBody)(scope);
    scope.$digest();
    $document.find('body').append(elmBody);
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

  it('should not open on click if template is empty', inject(function() {
    scope.template = null;
    scope.$digest();

    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(false);

    expect(elmBody.children().length).toBe(1);
  }));

  it('should show updated text', inject(function($sce) {
    scope.template = $sce.trustAsHtml('<span>My template</span>');
    scope.$digest();

    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(true);

    expect(elmBody.children().eq(1).text().trim()).toBe('My template');

    scope.template = $sce.trustAsHtml('<span>Another template</span>');
    scope.$digest();

    expect(elmBody.children().eq(1).text().trim()).toBe('Another template');
  }));

  it('should hide popover when template becomes empty', inject(function($timeout) {
    elm.trigger('click');
    tooltipScope.$digest();
    $timeout.flush(0);
    expect(tooltipScope.isOpen).toBe(true);

    scope.template = '';
    scope.$digest();

    expect(tooltipScope.isOpen).toBe(false);

    $timeout.flush();
    expect(elmBody.children().length).toBe(1);
  }));


  it('should not unbind event handlers created by other directives - issue 456', inject(function($compile) {
    scope.click = function() {
      scope.clicked = !scope.clicked;
    };

    elmBody = angular.element(
      '<div><input uib-popover-html="template" ng-click="click()" popover-trigger="mouseenter"/></div>'
    );
    $compile(elmBody)(scope);
    scope.$digest();

    elm = elmBody.find('input');

    elm.trigger('mouseenter');
    tooltipScope.$digest();
    elm.trigger('mouseleave');
    tooltipScope.$digest();
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
      '<div><span uib-popover-html="template" popover-animation="false">Selector Text</span></div>'
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

  it ('should display the title', inject(function($compile) {
    elmBody = angular.element(
      '<div><span uib-popover-html="template" popover-title="popover title">Selector Text</span></div>'
    );

    $compile(elmBody)(scope);
    scope.$digest();
    elm = elmBody.find('span');

    elm.trigger('click');
    scope.$digest();

    var titleEl = elmBody.find('.popover-title');
    expect(titleEl.text()).toBe('popover title');
  }));

  describe('supports options', function() {
    describe('placement', function() {
      it('can specify an alternative, valid placement', inject(function($compile) {
        elmBody = angular.element(
          '<div><span uib-popover-html="template" popover-placement="left">Trigger here</span></div>'
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
          '<div><span uib-popover-html="template" popover-class="custom">Trigger here</span></div>'
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
  });
});
