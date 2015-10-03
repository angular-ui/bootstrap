describe('tooltip template', function() {
  var elm,
      elmBody,
      scope,
      elmScope,
      tooltipScope;

  // load the popover code
  beforeEach(module('ui.bootstrap.tooltip'));

  // load the template
  beforeEach(module('template/tooltip/tooltip-template-popup.html'));

  beforeEach(inject(function($templateCache) {
    $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
  }));

  beforeEach(inject(function($rootScope, $compile) {
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

  function trigger(element, evt) {
    evt = new Event(evt);

    element[0].dispatchEvent(evt);
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

/* Deprecation tests below */

describe('tooltip template deprecation', function() {
  beforeEach(module('ui.bootstrap.tooltip'));
  beforeEach(module('template/tooltip/tooltip-template-popup.html'));

  var elm, elmBody, elmScope, tooltipScope;

  function trigger(element, evt) {
    evt = new Event(evt);

    element[0].dispatchEvent(evt);
    element.scope().$$childTail.$digest();
  }

  it('should suppress warning', function() {
    module(function($provide) {
      $provide.value('$tooltipSuppressWarning', true);
    });

    inject(function($compile, $log, $rootScope, $templateCache) {
      spyOn($log, 'warn');
      $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
      $rootScope.templateUrl = 'myUrl';

      elmBody = angular.element('<div><span tooltip-template="templateUrl">Selector Text</span></div>');
      $compile(elmBody)($rootScope);
      $rootScope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      trigger(elm, 'mouseenter');

      expect($log.warn.calls.count()).toBe(0);
    });
  });

  it('should give warning by default', inject(function($compile, $log, $rootScope, $templateCache) {
    spyOn($log, 'warn');
    $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
    $rootScope.templateUrl = 'myUrl';

    var element = '<div><span tooltip-template="templateUrl">Selector Text</span></div>';
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    elmBody = angular.element('<div><span tooltip-template="templateUrl">Selector Text</span></div>');
    $compile(elmBody)($rootScope);
    $rootScope.$digest();
    elm = elmBody.find('span');
    elmScope = elm.scope();
    tooltipScope = elmScope.$$childTail;

    trigger(elm, 'mouseenter');

    expect($log.warn.calls.count()).toBe(2);
    expect($log.warn.calls.argsFor(0)).toEqual(['$tooltip is now deprecated. Use $uibTooltip instead.']);
    expect($log.warn.calls.argsFor(1)).toEqual(['tooltip-template-popup is now deprecated. Use uib-tooltip-template-popup instead.']);
  }));
});
