describe('popover template', function() {
  var elm,
      elmBody,
      scope,
      elmScope,
      tooltipScope;

  // load the popover code
  beforeEach(module('ui.bootstrap.popover'));

  // load the template
  beforeEach(module('template/popover/popover.html'));
  beforeEach(module('template/popover/popover-template.html'));

  beforeEach(inject(function($templateCache) {
    $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
  }));

  beforeEach(inject(function($rootScope, $compile) {
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

/* Deprecation tests below */

describe('popover template deprecation', function() {
  beforeEach(module('ui.bootstrap.popover'));
  beforeEach(module('template/popover/popover.html'));
  beforeEach(module('template/popover/popover-template.html'));

  var elm, elmBody, elmScope, tooltipScope;

  it('should suppress warning', function() {
    module(function($provide) {
      $provide.value('$popoverSuppressWarning', true);
      $provide.value('$tooltipSuppressWarning', true);
    });

    inject(function($compile, $log, $rootScope, $templateCache) {
      spyOn($log, 'warn');
      $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
      $rootScope.templateUrl = 'myUrl';

      elmBody = angular.element('<div><span popover-template="templateUrl">Selector Text</span></div>');
      $compile(elmBody)($rootScope);
      $rootScope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      elm.trigger('click');
      tooltipScope.$digest();
      expect($log.warn.calls.count()).toBe(0);
    });
  });

  it('should give warning by default', inject(function($compile, $log, $rootScope, $templateCache) {
    spyOn($log, 'warn');
    $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
    $rootScope.templateUrl = 'myUrl';

    elmBody = angular.element('<div><span popover-template="templateUrl">Selector Text</span></div>');
    $compile(elmBody)($rootScope);
    elm = elmBody.find('span');
    elmScope = elm.scope();
    tooltipScope = elmScope.$$childTail;

    elm.trigger('click');
    tooltipScope.$digest();

    expect($log.warn.calls.count()).toBe(2);
    expect($log.warn.calls.argsFor(0)).toEqual(['$tooltip is now deprecated. Use $uibTooltip instead.']);
    expect($log.warn.calls.argsFor(1)).toEqual(['popover-template-popup is now deprecated. Use uib-popover-template-popup instead.']);
  }));
});
