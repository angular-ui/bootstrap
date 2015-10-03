describe('tooltip directive', function() {
  var $rootScope, $compile, $document, $timeout;

  beforeEach(module('ui.bootstrap.tooltip'));
  beforeEach(module('template/tooltip/tooltip-popup.html'));
  beforeEach(module('template/tooltip/tooltip-template-popup.html'));
  beforeEach(module('template/tooltip/tooltip-html-popup.html'));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$document_, _$timeout_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $document = _$document_;
    $timeout = _$timeout_;
  }));

  beforeEach(function() {
    jasmine.addMatchers({
      toHaveOpenTooltips: function(util, customEqualityTesters) {
        return {
          compare: function(actual, noOfOpened) {
            var ttipElements = actual.find('div.tooltip');
            noOfOpened = noOfOpened || 1;

            var result = {
              pass: util.equals(ttipElements.length, noOfOpened, customEqualityTesters)
            };

            if (result.message) {
              result.message = 'Expected "' + angular.mock.dump(ttipElements) + '" not to have "' + ttipElements.length + '" opened tooltips.';
            } else {
              result.message = 'Expected "' + angular.mock.dump(ttipElements) + '" to have "' + ttipElements.length + '" opened tooltips.';
            }

            return result;
          }
        };
      }
    });
  });

  function compileTooltip(ttipMarkup) {
    var fragment = $compile('<div>' + ttipMarkup + '</div>')($rootScope);
    $rootScope.$digest();
    return fragment;
  }

  function closeTooltip(hostEl, triggerEvt, shouldNotFlush) {
    trigger(hostEl, triggerEvt || 'mouseleave');
    hostEl.scope().$$childTail.$digest();
    if (!shouldNotFlush) {
      $timeout.flush();
    }
  }

  function trigger(element, evt) {
    evt = new Event(evt);

    element[0].dispatchEvent(evt);
    element.scope().$$childTail.$digest();
  }

  describe('basic scenarios with default options', function() {
    it('shows default tooltip on mouse enter and closes on mouse leave', function() {
      var fragment = compileTooltip('<span uib-tooltip="tooltip text">Trigger here</span>');

      trigger(fragment.find('span'), 'mouseenter');
      expect(fragment).toHaveOpenTooltips();

      closeTooltip(fragment.find('span'));
      expect(fragment).not.toHaveOpenTooltips();
    });

    it('should not show a tooltip when its content is empty', function() {
      var fragment = compileTooltip('<span uib-tooltip=""></span>');
      trigger(fragment.find('span'), 'mouseenter');
      expect(fragment).not.toHaveOpenTooltips();
    });

    it('should not show a tooltip when its content becomes empty', function() {
      $rootScope.content = 'some text';
      var fragment = compileTooltip('<span uib-tooltip="{{ content }}"></span>');

      trigger(fragment.find('span'), 'mouseenter');
      expect(fragment).toHaveOpenTooltips();

      $rootScope.content = '';
      $rootScope.$digest();
      $timeout.flush();
      expect(fragment).not.toHaveOpenTooltips();
    });

    it('should update tooltip when its content becomes empty', function() {
      $rootScope.content = 'some text';
      var fragment = compileTooltip('<span uib-tooltip="{{ content }}"></span>');

      $rootScope.content = '';
      $rootScope.$digest();

      trigger(fragment.find('span'), 'mouseenter');
      expect(fragment).not.toHaveOpenTooltips();
    });
  });

  describe('option by option', function() {
    var tooltipTypes = {
      'tooltip': 'uib-tooltip="tooltip text"',
      'tooltip-html': 'uib-tooltip-html="tooltipSafeHtml"',
      'tooltip-template': 'uib-tooltip-template="\'tooltipTextUrl\'"'
    };

    beforeEach(inject(function($sce, $templateCache) {
      $rootScope.tooltipText = 'tooltip text';
      $rootScope.tooltipSafeHtml = $sce.trustAsHtml('tooltip text');
      $templateCache.put('tooltipTextUrl', [200, '<span>tooltip text</span>', {}]);
    }));

    angular.forEach(tooltipTypes, function(html, key) {
      describe(key, function() {
        describe('placement', function() {
          it('can specify an alternative, valid placement', function() {
            var fragment = compileTooltip('<span ' + html + ' tooltip-placement="left">Trigger here</span>');
            trigger(fragment.find('span'), 'mouseenter');

            var ttipElement = fragment.find('div.tooltip');
            expect(fragment).toHaveOpenTooltips();
            expect(ttipElement).toHaveClass('left');

            closeTooltip(fragment.find('span'));
            expect(fragment).not.toHaveOpenTooltips();
          });
        });

        describe('class', function() {
          it('can specify a custom class', function() {
            var fragment = compileTooltip('<span ' + html + ' tooltip-class="custom">Trigger here</span>');
            trigger(fragment.find('span'), 'mouseenter');

            var ttipElement = fragment.find('div.tooltip');
            expect(fragment).toHaveOpenTooltips();
            expect(ttipElement).toHaveClass('custom');

            closeTooltip(fragment.find('span'));
            expect(fragment).not.toHaveOpenTooltips();
          });
        });
      });
    });
  });

  it('should show even after close trigger is called multiple times - issue #1847', function() {
    var fragment = compileTooltip('<span uib-tooltip="tooltip text">Trigger here</span>');

    trigger(fragment.find('span'), 'mouseenter');
    expect(fragment).toHaveOpenTooltips();

    closeTooltip(fragment.find('span'), null, true);
    // Close trigger is called again before timer completes
    // The close trigger can be called any number of times (even after close has already been called)
    // since users can trigger the hide triggers manually.
    closeTooltip(fragment.find('span'), null, true);
    expect(fragment).toHaveOpenTooltips();

    trigger(fragment.find('span'), 'mouseenter');
    expect(fragment).toHaveOpenTooltips();

    $timeout.flush();
    expect(fragment).toHaveOpenTooltips();
  });

  it('should hide even after show trigger is called multiple times', function() {
    var fragment = compileTooltip('<span uib-tooltip="tooltip text" tooltip-popup-delay="1000">Trigger here</span>');

    trigger(fragment.find('span'), 'mouseenter');
    trigger(fragment.find('span'), 'mouseenter');

    closeTooltip(fragment.find('span'));
    expect(fragment).not.toHaveOpenTooltips();
  });

  it('should not show tooltips element is disabled (button) - issue #3167', function() {
    var fragment = compileTooltip('<button uib-tooltip="cancel!" ng-disabled="disabled" ng-click="disabled = true">Cancel</button>');

    trigger(fragment.find('button'), 'mouseenter');
    expect(fragment).toHaveOpenTooltips();

    trigger(fragment.find('button'), 'click');
    $timeout.flush();
    // One needs to flush deferred functions before checking there is no tooltip.
    expect(fragment).not.toHaveOpenTooltips();
  });
});

/* Deprecation tests below */

describe('tooltip deprecation', function() {
  beforeEach(module('ui.bootstrap.tooltip'));
  beforeEach(module('template/tooltip/tooltip-popup.html'));
  beforeEach(module('template/tooltip/tooltip-template-popup.html'));
  beforeEach(module('template/tooltip/tooltip-html-popup.html'));

  describe('tooltip', function() {
    it('should suppress warning', function() {
      module(function($provide) {
        $provide.value('$tooltipSuppressWarning', true);
      });

      inject(function($compile, $log, $rootScope) {
        spyOn($log, 'warn');

        var element = '<div><span tooltip="tooltip text">Trigger here</span></div>';
        element = $compile(element)($rootScope);
        $rootScope.$digest();
        expect($log.warn.calls.count()).toBe(0);
      });
    });

    it('should give warning by default', inject(function($compile, $log, $rootScope) {
      spyOn($log, 'warn');

      var element = '<div><span tooltip="tooltip text">Trigger here</span></div>';
      element = $compile(element)($rootScope);
      $rootScope.$digest();

      expect($log.warn.calls.count()).toBe(1);
      expect($log.warn.calls.argsFor(0)).toEqual(['$tooltip is now deprecated. Use $uibTooltip instead.']);
    }));
  });

  describe('tooltip html', function() {
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

      inject(function($compile, $log, $rootScope, $sce) {
        spyOn($log, 'warn');

        $rootScope.html = 'I say: <strong class="hello">Hello!</strong>';
        $rootScope.safeHtml = $sce.trustAsHtml($rootScope.html);
        elmBody = angular.element('<div><span tooltip-html="safeHtml">Selector Text</span></div>');
        $compile(elmBody)($rootScope);
        $rootScope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        trigger(elm, 'mouseenter');
        tooltipScope.$digest();

        expect($log.warn.calls.count()).toBe(0);
      });
    });

    it('should give warning by default', inject(function($compile, $log, $rootScope, $sce) {
      spyOn($log, 'warn');

      $rootScope.html = 'I say: <strong class="hello">Hello!</strong>';
      $rootScope.safeHtml = $sce.trustAsHtml($rootScope.html);
      elmBody = angular.element('<div><span tooltip-html="safeHtml">Selector Text</span></div>');
      $compile(elmBody)($rootScope);
      $rootScope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      trigger(elm, 'mouseenter');
      tooltipScope.$digest();

      expect($log.warn.calls.count()).toBe(2);
      expect($log.warn.calls.argsFor(0)).toEqual(['$tooltip is now deprecated. Use $uibTooltip instead.']);
      expect($log.warn.calls.argsFor(1)).toEqual(['tooltip-html-popup is now deprecated. Use uib-tooltip-html-popup instead.']);
    }));
  });
});
