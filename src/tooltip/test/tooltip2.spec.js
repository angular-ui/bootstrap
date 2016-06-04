describe('tooltip directive', function() {
  var $rootScope, $compile, $document, $timeout, body, fragment;

  beforeEach(module('ui.bootstrap.tooltip'));
  beforeEach(module('uib/template/tooltip/tooltip-popup.html'));
  beforeEach(module('uib/template/tooltip/tooltip-template-popup.html'));
  beforeEach(module('uib/template/tooltip/tooltip-html-popup.html'));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$document_, _$timeout_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $document = _$document_;
    $timeout = _$timeout_;

    body = $document.find('body');
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

            if (result.pass) {
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

  afterEach(function() {
    $document.off('keypress');
    fragment.remove();
  });

  function compileTooltip(ttipMarkup) {
    fragment = $compile('<div>' + ttipMarkup + '</div>')($rootScope);
    $rootScope.$digest();
    body.append(fragment);
  }

  function closeTooltip(hostEl, triggerEvt, shouldNotFlush) {
    trigger(hostEl, triggerEvt || 'mouseleave');
    hostEl.scope().$$childTail.$digest();
    if (!shouldNotFlush) {
      $timeout.flush();
    }
  }

  function trigger(element, evt) {
    element.trigger(evt);
    element.scope().$$childTail.$digest();
  }

  describe('basic scenarios with default options', function() {
    it('shows default tooltip on mouse enter and closes on mouse leave', function() {
      compileTooltip('<span uib-tooltip="tooltip text">Trigger here</span>');

      trigger(fragment.find('span'), 'mouseenter');
      expect(fragment).toHaveOpenTooltips();

      closeTooltip(fragment.find('span'));
      expect(fragment).not.toHaveOpenTooltips();
    });

    it('should not show a tooltip when its content is empty', function() {
      compileTooltip('<span uib-tooltip=""></span>');
      trigger(fragment.find('span'), 'mouseenter');
      expect(fragment).not.toHaveOpenTooltips();
    });

    it('should not show a tooltip when its content becomes empty', function() {
      $rootScope.content = 'some text';
      compileTooltip('<span uib-tooltip="{{ content }}"></span>');

      trigger(fragment.find('span'), 'mouseenter');
      $timeout.flush(0);
      expect(fragment).toHaveOpenTooltips();

      $rootScope.content = '';
      $rootScope.$digest();
      $timeout.flush();
      expect(fragment).not.toHaveOpenTooltips();
    });

    it('should update tooltip when its content becomes empty', function() {
      $rootScope.content = 'some text';
      compileTooltip('<span uib-tooltip="{{ content }}"></span>');

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
            compileTooltip('<span ' + html + ' tooltip-placement="left">Trigger here</span>');
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
            compileTooltip('<span ' + html + ' tooltip-class="custom">Trigger here</span>');
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
    compileTooltip('<span uib-tooltip="tooltip text">Trigger here</span>');

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
    compileTooltip('<span uib-tooltip="tooltip text" tooltip-popup-delay="1000">Trigger here</span>');

    trigger(fragment.find('span'), 'mouseenter');
    trigger(fragment.find('span'), 'mouseenter');

    closeTooltip(fragment.find('span'));
    expect(fragment).not.toHaveOpenTooltips();
  });

  it('should not show tooltips element is disabled (button) - issue #3167', function() {
    compileTooltip('<button uib-tooltip="cancel!" ng-disabled="disabled" ng-click="disabled = true">Cancel</button>');

    trigger(fragment.find('button'), 'mouseenter');
    expect(fragment).toHaveOpenTooltips();

    trigger(fragment.find('button'), 'click');
    $timeout.flush();
    // One needs to flush deferred functions before checking there is no tooltip.
    expect(fragment).not.toHaveOpenTooltips();
  });
});
