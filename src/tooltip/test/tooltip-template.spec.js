describe('tooltip template', function() {
  var elm,
      elmBody,
      scope,
      elmScope,
      tooltipScope,
      $document;

  // load the popover code
  beforeEach(module('ui.bootstrap.tooltip'));

  // load the template
  beforeEach(module('uib/template/tooltip/tooltip-template-popup.html'));

  beforeEach(inject(function($templateCache) {
    $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
  }));

  beforeEach(inject(function($rootScope, $compile, _$document_) {
    $document = _$document_;
    elmBody = angular.element(
      '<div><span uib-tooltip-template="templateUrl">Selector Text</span></div>'
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

  function trigger(element, evt) {
    element.trigger(evt);
    element.scope().$$childTail.$digest();
  }

  it('should open on mouseenter', inject(function() {
    trigger(elm, 'mouseenter');
    expect(tooltipScope.isOpen).toBe(true);

    expect(elmBody.children().length).toBe(2);
  }));

  it('should not open on mouseenter if templateUrl is empty', inject(function() {
    scope.templateUrl = null;
    scope.$digest();

    trigger(elm, 'mouseenter');
    expect(tooltipScope.isOpen).toBe(false);

    expect(elmBody.children().length).toBe(1);
  }));

  it('should show updated text', inject(function() {
    scope.myTemplateText = 'some text';

    trigger(elm, 'mouseenter');
    expect(tooltipScope.isOpen).toBe(true);
    scope.$digest();

    expect(elmBody.children().eq(1).text().trim()).toBe('some text');

    scope.myTemplateText = 'new text';
    scope.$digest();

    expect(elmBody.children().eq(1).text().trim()).toBe('new text');
  }));

  it('should hide tooltip when template becomes empty', inject(function($timeout) {
    trigger(elm, 'mouseenter');
    expect(tooltipScope.isOpen).toBe(true);

    scope.templateUrl = '';
    scope.$digest();

    expect(tooltipScope.isOpen).toBe(false);

    $timeout.flush();
    expect(elmBody.children().length).toBe(1);
  }));
});
