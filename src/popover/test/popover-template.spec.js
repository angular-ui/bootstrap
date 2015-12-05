describe('popover template', function() {
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
  beforeEach(module('uib/template/popover/popover-template.html'));

  beforeEach(inject(function($templateCache) {
    $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
  }));

  beforeEach(inject(function($rootScope, $compile, _$document_) {
    $document = _$document_;
    elmBody = angular.element(
      '<div><span uib-popover-template="templateUrl">Selector Text</span></div>'
    );

    scope = $rootScope;
    $compile(elmBody)(scope);
    scope.templateUrl = 'myUrl';

    scope.$digest();
    elm = elmBody.find('span');
    elmScope = elm.scope();
    tooltipScope = elmScope.$$childTail;
  }));

  afterEach(function() {
    $document.off('keypress');
  });

  it('should open on click', inject(function() {
    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(true);

    expect(elmBody.children().length ).toBe(2);
  }));

  it('should not open on click if templateUrl is empty', inject(function() {
    scope.templateUrl = null;
    scope.$digest();

    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(false);

    expect(elmBody.children().length).toBe(1);
  }));

  it('should show updated text', inject(function() {
    scope.myTemplateText = 'some text';

    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(true);

    scope.$digest();
    expect(elmBody.children().eq(1).text().trim()).toBe('some text');

    scope.myTemplateText = 'new text';
    scope.$digest();

    expect(elmBody.children().eq(1).text().trim()).toBe('new text');
  }));

  it('should hide popover when template becomes empty', inject(function($timeout) {
    elm.trigger('click');
    tooltipScope.$digest();
    expect(tooltipScope.isOpen).toBe(true);

    scope.templateUrl = '';
    scope.$digest();

    expect(tooltipScope.isOpen).toBe(false);

    $timeout.flush();
    expect(elmBody.children().length).toBe(1);
  }));

  describe('supports options', function() {
    describe('placement', function() {
      it('can specify an alternative, valid placement', inject(function($compile) {
        elmBody = angular.element(
          '<div><span uib-popover-template="templateUrl" popover-placement="left">Trigger</span></div>'
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
          '<div><span uib-popover-template="templateUrl" popover-class="custom">Trigger</span></div>'
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
