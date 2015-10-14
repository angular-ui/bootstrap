describe('tooltip', function() {
  var elm,
      elmBody,
      scope,
      elmScope,
      tooltipScope,
      $document;

  // load the tooltip code
  beforeEach(module('ui.bootstrap.tooltip'));

  // load the template
  beforeEach(module('template/tooltip/tooltip-popup.html'));

  beforeEach(inject(function($rootScope, $compile, _$document_) {
    elmBody = angular.element(
      '<div><span uib-tooltip="tooltip text" tooltip-animation="false">Selector Text</span></div>'
    );

    $document = _$document_;
    scope = $rootScope;
    $compile(elmBody)(scope);
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

  it('should not be open initially', inject(function() {
    expect(tooltipScope.isOpen).toBe(false);

    // We can only test *that* the tooltip-popup element wasn't created as the
    // implementation is templated and replaced.
    expect(elmBody.children().length).toBe(1);
  }));

  it('should open on mouseenter', inject(function() {
    trigger(elm, 'mouseenter');
    expect(tooltipScope.isOpen).toBe(true);

    // We can only test *that* the tooltip-popup element was created as the
    // implementation is templated and replaced.
    expect(elmBody.children().length).toBe(2);
  }));

  it('should close on mouseleave', inject(function() {
    trigger(elm, 'mouseenter');
    trigger(elm, 'mouseleave');
    expect(tooltipScope.isOpen).toBe(false);
  }));

  it('should not animate on animation set to false', inject(function() {
    expect(tooltipScope.animation).toBe(false);
  }));

  it('should have default placement of "top"', inject(function() {
    trigger(elm, 'mouseenter');
    expect(tooltipScope.placement).toBe('top');
  }));

  it('should allow specification of placement', inject(function($compile) {
    elm = $compile(angular.element(
      '<span uib-tooltip="tooltip text" tooltip-placement="bottom">Selector Text</span>'
    ))(scope);
    scope.$apply();
    elmScope = elm.scope();
    tooltipScope = elmScope.$$childTail;

    trigger(elm, 'mouseenter');
    expect(tooltipScope.placement).toBe('bottom');
  }));

  it('should update placement dynamically', inject(function($compile, $timeout) {
    scope.place = 'bottom';
    elm = $compile(angular.element(
      '<span uib-tooltip="tooltip text" tooltip-placement="{{place}}">Selector Text</span>'
    ))(scope);
    scope.$apply();
    elmScope = elm.scope();
    tooltipScope = elmScope.$$childTail;

    trigger(elm, 'mouseenter');
    expect(tooltipScope.placement).toBe('bottom');

    scope.place = 'right';
    scope.$digest();
    $timeout.flush();
    expect(tooltipScope.placement).toBe('right');
  }));

  it('should work inside an ngRepeat', inject(function($compile) {
    elm = $compile(angular.element(
      '<ul>'+
        '<li ng-repeat="item in items">'+
          '<span uib-tooltip="{{item.tooltip}}">{{item.name}}</span>'+
        '</li>'+
      '</ul>'
    ))(scope);

    scope.items = [
      { name: 'One', tooltip: 'First Tooltip' }
    ];

    scope.$digest();

    var tt = angular.element(elm.find('li > span')[0]);
    trigger(tt, 'mouseenter');

    expect(tt.text()).toBe(scope.items[0].name);

    tooltipScope = tt.scope().$$childTail;
    expect(tooltipScope.content).toBe(scope.items[0].tooltip);

    trigger(tt, 'mouseleave');
    expect(tooltipScope.isOpen).toBeFalsy();
  }));

  it('should show correct text when in an ngRepeat', inject(function($compile, $timeout) {
    elm = $compile(angular.element(
      '<ul>'+
        '<li ng-repeat="item in items">'+
          '<span uib-tooltip="{{item.tooltip}}">{{item.name}}</span>'+
        '</li>'+
      '</ul>'
    ))(scope);

    scope.items = [
      { name: 'One', tooltip: 'First Tooltip' },
      { name: 'Second', tooltip: 'Second Tooltip' }
    ];

    scope.$digest();

    var tt_1 = angular.element(elm.find('li > span')[0]);
    var tt_2 = angular.element(elm.find('li > span')[1]);

    trigger(tt_1, 'mouseenter');
    trigger(tt_1, 'mouseleave');

    $timeout.flush();

    trigger(tt_2, 'mouseenter');

    expect(tt_1.text()).toBe(scope.items[0].name);
    expect(tt_2.text()).toBe(scope.items[1].name);

    tooltipScope = tt_2.scope().$$childTail;
    expect(tooltipScope.content).toBe(scope.items[1].tooltip);
    expect(elm.find('.tooltip-inner').text()).toBe(scope.items[1].tooltip);

    trigger(tt_2, 'mouseleave');
  }));

  it('should only have an isolate scope on the popup', inject(function($compile) {
    var ttScope;

    scope.tooltipMsg = 'Tooltip Text';
    scope.alt = 'Alt Message';

    elmBody = $compile(angular.element(
      '<div><span alt={{alt}} uib-tooltip="{{tooltipMsg}}" tooltip-animation="false">Selector Text</span></div>'
    ))(scope);

    $compile(elmBody)(scope);
    scope.$digest();
    elm = elmBody.find('span');
    elmScope = elm.scope();

    trigger(elm, 'mouseenter');
    expect(elm.attr('alt')).toBe(scope.alt);

    ttScope = angular.element(elmBody.children()[1]).isolateScope();
    expect(ttScope.placement).toBe('top');
    expect(ttScope.content).toBe(scope.tooltipMsg);

    trigger(elm, 'mouseleave');

    //Isolate scope contents should be the same after hiding and showing again (issue 1191)
    trigger(elm, 'mouseenter');

    ttScope = angular.element(elmBody.children()[1]).isolateScope();
    expect(ttScope.placement).toBe('top');
    expect(ttScope.content).toBe(scope.tooltipMsg);
  }));

  it('should not show tooltips if there is nothing to show - issue #129', inject(function($compile) {
    elmBody = $compile(angular.element(
      '<div><span uib-tooltip="">Selector Text</span></div>'
    ))(scope);
    scope.$digest();
    elmBody.find('span').trigger('mouseenter');

    expect(elmBody.children().length).toBe(1);
  }));

  it('should close the tooltip when its trigger element is destroyed', inject(function() {
    trigger(elm, 'mouseenter');
    expect(tooltipScope.isOpen).toBe(true);

    elm.remove();
    elmScope.$destroy();
    expect(elmBody.children().length).toBe(0);
  }));

  it('issue 1191 - scope on the popup should always be child of correct element scope', function() {
    var ttScope;
    trigger(elm, 'mouseenter');

    ttScope = angular.element(elmBody.children()[1]).scope();
    expect(ttScope.$parent).toBe(tooltipScope);

    trigger(elm, 'mouseleave');

    // After leaving and coming back, the scope's parent should be the same
    trigger(elm, 'mouseenter');

    ttScope = angular.element(elmBody.children()[1]).scope();
    expect(ttScope.$parent).toBe(tooltipScope);

    trigger(elm, 'mouseleave');
  });

  describe('with specified enable expression', function() {
    beforeEach(inject(function($compile) {
      scope.enable = false;
      elmBody = $compile(angular.element(
        '<div><span uib-tooltip="tooltip text" tooltip-enable="enable">Selector Text</span></div>'
      ))(scope);
      scope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
    }));

    it('should not open ', inject(function() {
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBeFalsy();
      expect(elmBody.children().length).toBe(1);
    }));

    it('should open', inject(function() {
      scope.enable = true;
      scope.$digest();
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBeTruthy();
      expect(elmBody.children().length).toBe(2);
    }));
  });

  describe('with specified popup delay', function() {
    var $timeout;
    beforeEach(inject(function($compile, _$timeout_) {
      $timeout = _$timeout_;
      scope.delay = '1000';
      elm = $compile(angular.element(
        '<span uib-tooltip="tooltip text" tooltip-popup-delay="{{delay}}" ng-disabled="disabled">Selector Text</span>'
      ))(scope);
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
      scope.$digest();
    }));

    it('should open after timeout', function() {
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(false);

      $timeout.flush();
      expect(tooltipScope.isOpen).toBe(true);
    });

    it('should not open if mouseleave before timeout', function() {
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(false);

      trigger(elm, 'mouseleave');
      $timeout.flush();
      expect(tooltipScope.isOpen).toBe(false);
    });

    it('should use default popup delay if specified delay is not a number', function() {
      scope.delay = 'text1000';
      scope.$digest();
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(true);
    });

    it('should not open if disabled is present', function() {
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(false);

      $timeout.flush(500);
      expect(tooltipScope.isOpen).toBe(false);
      elmScope.disabled = true;
      elmScope.$digest();

      expect(tooltipScope.isOpen).toBe(false);
    });

    it('should open when not disabled after being disabled - issue #4204', function() {
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(false);

      $timeout.flush(500);
      elmScope.disabled = true;
      elmScope.$digest();

      $timeout.flush(500);
      expect(tooltipScope.isOpen).toBe(false);

      elmScope.disabled = false;
      elmScope.$digest();

      trigger(elm, 'mouseenter');
      $timeout.flush();

      expect(tooltipScope.isOpen).toBe(true);
    });

    it('should close the tooltips in order', inject(function($compile) {
      var elm2 = $compile('<div><span uib-tooltip="tooltip #2" tooltip-is-open="isOpen2">Selector Text</span></div>')(scope);
      scope.$digest();
      elm2 = elm2.find('span');
      var tooltipScope2 = elm2.scope().$$childTail;
      tooltipScope2.isOpen = false;
      scope.$digest();

      trigger(elm, 'mouseenter');
      tooltipScope2.$digest();
      $timeout.flush();
      expect(tooltipScope.isOpen).toBe(true);
      expect(tooltipScope2.isOpen).toBe(false);

      trigger(elm2, 'mouseenter');
      tooltipScope2.$digest();
      $timeout.flush();
      expect(tooltipScope.isOpen).toBe(true);
      expect(tooltipScope2.isOpen).toBe(true);

      var evt = $.Event('keypress');
      evt.which = 27;

      $document.trigger(evt);
      tooltipScope.$digest();
      tooltipScope2.$digest();

      expect(tooltipScope.isOpen).toBe(true);
      expect(tooltipScope2.isOpen).toBe(false);

      var evt2 = $.Event('keypress');
      evt2.which = 27;

      $document.trigger(evt2);
      tooltipScope.$digest();
      tooltipScope2.$digest();

      expect(tooltipScope.isOpen).toBe(false);
      expect(tooltipScope2.isOpen).toBe(false);
    }));
  });

  describe('with specified popup close delay', function() {
    var $timeout;
    beforeEach(inject(function($compile, _$timeout_) {
      $timeout = _$timeout_;
      scope.delay = '1000';
      elm = $compile(angular.element(
        '<span uib-tooltip="tooltip text" tooltip-popup-close-delay="{{delay}}" ng-disabled="disabled">Selector Text</span>'
      ))(scope);
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
      scope.$digest();
    }));

    it('should close after timeout', function() {
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(true);
      trigger(elm, 'mouseleave');
      $timeout.flush();
      expect(tooltipScope.isOpen).toBe(false);
    });

    it('should use default popup close delay if specified delay is not a number and close immediately', function() {
      scope.delay = 'text1000';
      scope.$digest();
      trigger(elm, 'mouseenter');
      expect(tooltipScope.popupCloseDelay).toBe(0);
      expect(tooltipScope.isOpen).toBe(true);
      trigger(elm, 'mouseleave');
      $timeout.flush();
      expect(tooltipScope.isOpen).toBe(false);
    });

    it('should open when not disabled after being disabled and close after delay - issue #4204', function() {
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(true);

      elmScope.disabled = true;
      elmScope.$digest();

      $timeout.flush(500);
      expect(tooltipScope.isOpen).toBe(false);

      elmScope.disabled = false;
      elmScope.$digest();

      trigger(elm, 'mouseenter');

      expect(tooltipScope.isOpen).toBe(true);
      trigger(elm, 'mouseleave');
      $timeout.flush();
      expect(tooltipScope.isOpen).toBe(false);
    });
  });

  describe('with specified popup and popup close delay', function() {
    var $timeout;
    beforeEach(inject(function($compile, _$timeout_) {
      $timeout = _$timeout_;
      scope.delay = '1000';
      elm = $compile(angular.element(
        '<span uib-tooltip="tooltip text" tooltip-popup-close-delay="{{delay}}" tooltip-popup-close-delay="{{delay}}" ng-disabled="disabled">Selector Text</span>'
      ))(scope);
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
      scope.$digest();
    }));

    it('should not open if mouseleave before timeout', function() {
      trigger(elm, 'mouseenter');
      $timeout.flush(500);
      trigger(elm, 'mouseleave');
      $timeout.flush();

      expect(tooltipScope.isOpen).toBe(false);
    });
  });

  describe('with an is-open attribute', function() {
    beforeEach(inject(function ($compile) {
      scope.isOpen = false;
      elm = $compile(angular.element(
        '<span uib-tooltip="tooltip text" tooltip-is-open="isOpen" >Selector Text</span>'
      ))(scope);
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
      scope.$digest();
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
      trigger(elm, 'mouseenter');
      expect(elmScope.isOpen).toBe(true);
      trigger(elm, 'mouseleave');
      expect(elmScope.isOpen).toBe(false);
    });
  });

  describe('with an is-open attribute expression', function() {
    beforeEach(inject(function($compile) {
      scope.isOpen = false;
      elm = $compile(angular.element(
        '<span uib-tooltip="tooltip text" tooltip-is-open="isOpen === true" >Selector Text</span>'
      ))(scope);
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
      scope.$digest();
    }));

    it('should show and hide with the expression', function() {
      expect(tooltipScope.isOpen).toBe(false);
      elmScope.isOpen = true;
      elmScope.$digest();
      expect(tooltipScope.isOpen).toBe(true);
      elmScope.isOpen = false;
      elmScope.$digest();
      expect(tooltipScope.isOpen).toBe(false);
    });
  });

  describe('with a trigger attribute', function() {
    var scope, elmBody, elm, elmScope;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope;
    }));

    it('should use it to show but set the hide trigger based on the map for mapped triggers', inject(function($compile) {
      elmBody = angular.element(
        '<div><input uib-tooltip="Hello!" tooltip-trigger="focus" /></div>'
      );
      $compile(elmBody)(scope);
      scope.$apply();
      elm = elmBody.find('input');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      expect(tooltipScope.isOpen).toBeFalsy();
      trigger(elm, 'focus');
      expect(tooltipScope.isOpen).toBeTruthy();
      trigger(elm, 'blur');
      expect(tooltipScope.isOpen).toBeFalsy();
    }));

    it('should use it as both the show and hide triggers for unmapped triggers', inject(function($compile) {
      elmBody = angular.element(
        '<div><input uib-tooltip="Hello!" tooltip-trigger="fakeTriggerAttr" /></div>'
      );
      $compile(elmBody)(scope);
      scope.$apply();
      elm = elmBody.find('input');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      expect(tooltipScope.isOpen).toBeFalsy();
      trigger(elm, 'fakeTriggerAttr');
      expect(tooltipScope.isOpen).toBeTruthy();
      trigger(elm, 'fakeTriggerAttr');
      expect(tooltipScope.isOpen).toBeFalsy();
    }));

    it('should only set up triggers once', inject(function($compile) {
      scope.test = true;
      elmBody = angular.element(
        '<div>' +
          '<input uib-tooltip="Hello!" tooltip-trigger="{{ (test && \'mouseenter\' || \'click\') }}" />' +
          '<input uib-tooltip="Hello!" tooltip-trigger="{{ (test && \'mouseenter\' || \'click\') }}" />' +
        '</div>'
      );

      $compile(elmBody)(scope);
      scope.$apply();
      var elm1 = elmBody.find('input').eq(0);
      var elm2 = elmBody.find('input').eq(1);
      var elmScope1 = elm1.scope();
      var elmScope2 = elm2.scope();
      var tooltipScope2 = elmScope2.$$childTail;

      scope.$apply('test = false');

      // click trigger isn't set
      elm2.click();
      expect(tooltipScope2.isOpen).toBeFalsy();

      // mouseenter trigger is still set
      trigger(elm2, 'mouseenter');
      expect(tooltipScope2.isOpen).toBeTruthy();
    }));

    it('should accept multiple triggers based on the map for mapped triggers', inject(function($compile) {
      elmBody = angular.element(
        '<div><input uib-tooltip="Hello!" tooltip-trigger="focus fakeTriggerAttr" /></div>'
      );
      $compile(elmBody)(scope);
      scope.$apply();
      elm = elmBody.find('input');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      expect(tooltipScope.isOpen).toBeFalsy();
      trigger(elm, 'focus');
      expect(tooltipScope.isOpen).toBeTruthy();
      trigger(elm, 'blur');
      expect(tooltipScope.isOpen).toBeFalsy();
      trigger(elm, 'fakeTriggerAttr');
      expect(tooltipScope.isOpen).toBeTruthy();
      trigger(elm, 'fakeTriggerAttr');
      expect(tooltipScope.isOpen).toBeFalsy();
    }));

    it('should not show when trigger is set to "none"', inject(function($compile) {
      elmBody = angular.element(
        '<div><input uib-tooltip="Hello!" tooltip-trigger="none" /></div>'
      );
      $compile(elmBody)(scope);
      scope.$apply();
      elm = elmBody.find('input');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
      expect(tooltipScope.isOpen).toBeFalsy();
      elm.trigger('mouseenter');
      expect(tooltipScope.isOpen).toBeFalsy();
    }));
  });

  describe('with an append-to-body attribute', function() {
    var scope, elmBody, elm, elmScope, $body;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope;
    }));

    afterEach(function() {
      $body.find('.tooltip').remove();
    });

    it('should append to the body', inject(function($compile, $document) {
      $body = $document.find('body');
      elmBody = angular.element(
        '<div><span uib-tooltip="tooltip text" tooltip-append-to-body="true">Selector Text</span></div>'
      );

      $compile(elmBody)(scope);
      scope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      var bodyLength = $body.children().length;
      trigger(elm, 'mouseenter');

      expect(tooltipScope.isOpen).toBe(true);
      expect(elmBody.children().length).toBe(1);
      expect($body.children().length).toEqual(bodyLength + 1);
    }));
  });

  describe('cleanup', function() {
    var elmBody, elm, elmScope, tooltipScope;

    function inCache() {
      var match = false;

      angular.forEach(angular.element.cache, function(item) {
        if (item.data && item.data.$scope === tooltipScope) {
          match = true;
        }
      });

      return match;
    }

    beforeEach(inject(function($compile, $rootScope) {
      elmBody = angular.element('<div><input uib-tooltip="Hello!" tooltip-trigger="fooTrigger" /></div>');

      $compile(elmBody)($rootScope);
      $rootScope.$apply();

      elm = elmBody.find('input');
      elmScope = elm.scope();
      trigger(elm, 'fooTrigger');
      tooltipScope = elmScope.$$childTail.$$childTail;
    }));

    it('should not contain a cached reference when not visible', inject(function($timeout) {
      expect(inCache()).toBeTruthy();
      elmScope.$destroy();
      expect(inCache()).toBeFalsy();
    }));
  });

  describe('observers', function() {
    var elmBody, elm, elmScope, scope, tooltipScope;

    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope;
      scope.content = 'tooltip content';
      scope.placement = 'top';
      elmBody = angular.element('<div><input uib-tooltip="{{content}}" tooltip-placement={{placement}} /></div>');
      $compile(elmBody)(scope);
      scope.$apply();

      elm = elmBody.find('input');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
    }));

    it('should be removed when tooltip hides', inject(function($timeout) {
      expect(tooltipScope.content).toBe(undefined);
      expect(tooltipScope.placement).toBe(undefined);

      trigger(elm, 'mouseenter');
      expect(tooltipScope.content).toBe('tooltip content');
      expect(tooltipScope.placement).toBe('top');
      scope.content = 'tooltip content updated';

      scope.placement = 'bottom';
      scope.$apply();
      expect(tooltipScope.content).toBe('tooltip content updated');
      expect(tooltipScope.placement).toBe('bottom');

      trigger(elm, 'mouseleave');
      $timeout.flush();
      scope.content = 'tooltip content updated after close';
      scope.placement = 'left';
      scope.$apply();
      expect(tooltipScope.content).toBe('tooltip content updated');
      expect(tooltipScope.placement).toBe('bottom');
    }));
  });
});

describe('tooltipWithDifferentSymbols', function() {
    var elmBody;

    // load the tooltip code
    beforeEach(module('ui.bootstrap.tooltip'));

    // load the template
    beforeEach(module('template/tooltip/tooltip-popup.html'));

    // configure interpolate provider to use [[ ]] instead of {{ }}
    beforeEach(module(function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.startSymbol(']]');
    }));

    function trigger(element, evt) {
      evt = new Event(evt);

      element[0].dispatchEvent(evt);
      element.scope().$$childTail.$digest();
    }

    it('should show the correct tooltip text', inject(function($compile, $rootScope) {
      elmBody = angular.element(
        '<div><input type="text" uib-tooltip="My tooltip" tooltip-trigger="focus" tooltip-placement="right" /></div>'
      );
      $compile(elmBody)($rootScope);
      $rootScope.$apply();
      var elmInput = elmBody.find('input');
      trigger(elmInput, 'focus');

      expect(elmInput.next().find('div').next().html()).toBe('My tooltip');
    }));
});

describe('tooltip positioning', function() {
  var elm, elmBody, elmScope, tooltipScope, scope;
  var $position;

  // load the tooltip code
  beforeEach(module('ui.bootstrap.tooltip', function($tooltipProvider) {
    $tooltipProvider.options({ animation: false });
  }));

  // load the template
  beforeEach(module('template/tooltip/tooltip-popup.html'));

  beforeEach(inject(function($rootScope, $compile, $uibPosition) {
    $position = $uibPosition;
    spyOn($position, 'positionElements').and.callThrough();

    scope = $rootScope;
    scope.text = 'Some Text';

    elmBody = $compile(angular.element(
      '<div><span uib-tooltip="{{ text }}">Selector Text</span></div>'
    ))(scope);
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

  it('should re-position when value changes', inject(function($timeout) {
    trigger(elm, 'mouseenter');

    scope.$digest();
    $timeout.flush();
    var startingPositionCalls = $position.positionElements.calls.count();

    scope.text = 'New Text';
    scope.$digest();
    $timeout.flush();
    expect(elm.attr('uib-tooltip')).toBe('New Text');
    expect($position.positionElements.calls.count()).toEqual(startingPositionCalls + 1);
    // Check that positionElements was called with elm
    expect($position.positionElements.calls.argsFor(startingPositionCalls)[0][0])
      .toBe(elm[0]);

    scope.$digest();
    $timeout.verifyNoPendingTasks();
    expect($position.positionElements.calls.count()).toEqual(startingPositionCalls + 1);
    expect($position.positionElements.calls.argsFor(startingPositionCalls)[0][0])
      .toBe(elm[0]);
    scope.$digest();
  }));

});

describe('tooltipHtml', function() {
  var elm, elmBody, elmScope, tooltipScope, scope;

  // load the tooltip code
  beforeEach(module('ui.bootstrap.tooltip', function($tooltipProvider) {
    $tooltipProvider.options({ animation: false });
  }));

  // load the template
  beforeEach(module('template/tooltip/tooltip-html-popup.html'));

  beforeEach(inject(function($rootScope, $compile, $sce) {
    scope = $rootScope;
    scope.html = 'I say: <strong class="hello">Hello!</strong>';
    scope.safeHtml = $sce.trustAsHtml(scope.html);

    elmBody = $compile(angular.element(
      '<div><span uib-tooltip-html="safeHtml">Selector Text</span></div>'
    ))(scope);
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

  it('should render html properly', inject(function() {
    trigger(elm, 'mouseenter');
    expect(elmBody.find('.tooltip-inner').html()).toBe(scope.html);
  }));

  it('should not open if html is empty', function() {
    scope.safeHtml = null;
    scope.$digest();
    trigger(elm, 'mouseenter');
    expect(tooltipScope.isOpen).toBe(false);
  });

  it('should show on mouseenter and hide on mouseleave', inject(function($sce) {
    expect(tooltipScope.isOpen).toBe(false);

    trigger(elm, 'mouseenter');
    expect(tooltipScope.isOpen).toBe(true);
    expect(elmBody.children().length).toBe(2);

    expect($sce.getTrustedHtml(tooltipScope.contentExp())).toEqual(scope.html);

    trigger(elm, 'mouseleave');
    expect(tooltipScope.isOpen).toBe(false);
    expect(elmBody.children().length).toBe(1);
  }));
});

describe('$tooltipProvider', function() {
  var elm,
      elmBody,
      scope,
      elmScope,
      tooltipScope;

  function trigger(element, evt) {
    evt = new Event(evt);

    element[0].dispatchEvent(evt);
    element.scope().$$childTail.$digest();
  }

  describe('popupDelay', function() {
    beforeEach(module('ui.bootstrap.tooltip', function($tooltipProvider) {
      $tooltipProvider.options({popupDelay: 1000});
    }));

    // load the template
    beforeEach(module('template/tooltip/tooltip-popup.html'));

    beforeEach(inject(function($rootScope, $compile) {
      elmBody = angular.element(
        '<div><span uib-tooltip="tooltip text">Selector Text</span></div>'
      );

      scope = $rootScope;
      $compile(elmBody)(scope);
      scope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;
    }));

    it('should open after timeout', inject(function($timeout) {
      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(false);

      $timeout.flush();
      expect(tooltipScope.isOpen).toBe(true);
    }));
  });

  describe('appendToBody', function() {
    var $body;

    beforeEach(module('template/tooltip/tooltip-popup.html'));
    beforeEach(module('ui.bootstrap.tooltip', function($tooltipProvider) {
      $tooltipProvider.options({ appendToBody: true });
    }));

    afterEach(function() {
      $body.find('.tooltip').remove();
    });

    it('should append to the body', inject(function($rootScope, $compile, $document) {
      $body = $document.find('body');
      elmBody = angular.element(
        '<div><span uib-tooltip="tooltip text">Selector Text</span></div>'
      );

      scope = $rootScope;
      $compile(elmBody)(scope);
      scope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      var bodyLength = $body.children().length;
      trigger(elm, 'mouseenter');

      expect(tooltipScope.isOpen).toBe(true);
      expect(elmBody.children().length).toBe(1);
      expect($body.children().length).toEqual(bodyLength + 1);
    }));

    it('should close on location change', inject(function($rootScope, $compile) {
      elmBody = angular.element(
        '<div><span uib-tooltip="tooltip text">Selector Text</span></div>'
      );

      scope = $rootScope;
      $compile(elmBody)(scope);
      scope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();
      tooltipScope = elmScope.$$childTail;

      trigger(elm, 'mouseenter');
      expect(tooltipScope.isOpen).toBe(true);

      scope.$broadcast('$locationChangeSuccess');
      scope.$digest();
      expect(tooltipScope.isOpen).toBe(false);
    }));
  });

  describe('triggers', function() {
    describe('triggers with a mapped value', function() {
      beforeEach(module('ui.bootstrap.tooltip', function($uibTooltipProvider) {
        $uibTooltipProvider.options({trigger: 'focus'});
      }));

      // load the template
      beforeEach(module('template/tooltip/tooltip-popup.html'));

      it('should use the show trigger and the mapped value for the hide trigger', inject(function($rootScope, $compile) {
        elmBody = angular.element(
          '<div><input uib-tooltip="tooltip text" /></div>'
        );

        scope = $rootScope;
        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('input');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        expect(tooltipScope.isOpen).toBeFalsy();
        trigger(elm, 'focus');
        expect(tooltipScope.isOpen).toBeTruthy();
        trigger(elm, 'blur');
        expect(tooltipScope.isOpen).toBeFalsy();
      }));

      it('should override the show and hide triggers if there is an attribute', inject(function($rootScope, $compile) {
        elmBody = angular.element(
          '<div><input uib-tooltip="tooltip text" tooltip-trigger="mouseenter"/></div>'
        );

        scope = $rootScope;
        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('input');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        expect(tooltipScope.isOpen).toBeFalsy();
        trigger(elm, 'mouseenter');
        expect(tooltipScope.isOpen).toBeTruthy();
        trigger(elm, 'mouseleave');
        expect(tooltipScope.isOpen).toBeFalsy();
      }));
    });

    describe('triggers with a custom mapped value', function() {
      beforeEach(module('ui.bootstrap.tooltip', function($uibTooltipProvider) {
        $uibTooltipProvider.setTriggers({ customOpenTrigger: 'foo bar' });
        $uibTooltipProvider.options({trigger: 'customOpenTrigger'});
      }));

      // load the template
      beforeEach(module('template/tooltip/tooltip-popup.html'));

      it('should use the show trigger and the mapped value for the hide trigger', inject(function($rootScope, $compile) {
        elmBody = angular.element(
          '<div><input uib-tooltip="tooltip text" /></div>'
        );

        scope = $rootScope;
        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('input');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        expect(tooltipScope.isOpen).toBeFalsy();
        trigger(elm, 'customOpenTrigger');
        expect(tooltipScope.isOpen).toBeTruthy();
        trigger(elm, 'foo');
        expect(tooltipScope.isOpen).toBeFalsy();
        trigger(elm, 'customOpenTrigger');
        expect(tooltipScope.isOpen).toBeTruthy();
        trigger(elm, 'bar');
        expect(tooltipScope.isOpen).toBeFalsy();
      }));
    });

    describe('triggers without a mapped value', function() {
      beforeEach(module('ui.bootstrap.tooltip', function($uibTooltipProvider) {
        $uibTooltipProvider.options({trigger: 'fakeTrigger'});
      }));

      // load the template
      beforeEach(module('template/tooltip/tooltip-popup.html'));

      it('should use the show trigger to hide', inject(function($rootScope, $compile) {
        elmBody = angular.element(
          '<div><span uib-tooltip="tooltip text">Selector Text</span></div>'
        );

        scope = $rootScope;
        $compile(elmBody)(scope);
        scope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;

        expect(tooltipScope.isOpen).toBeFalsy();
        trigger(elm, 'fakeTrigger');
        expect(tooltipScope.isOpen).toBeTruthy();
        trigger(elm, 'fakeTrigger');
        expect(tooltipScope.isOpen).toBeFalsy();
      }));
    });
  });
});
