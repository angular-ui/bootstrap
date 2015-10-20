describe('uib-alert', function() {
  var element, scope, $compile, $templateCache, $timeout;

  beforeEach(module('ui.bootstrap.alert'));
  beforeEach(module('template/alert/alert.html'));

  beforeEach(inject(function($rootScope, _$compile_, _$templateCache_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $templateCache = _$templateCache_;
    $timeout = _$timeout_;

    element = angular.element(
      '<div>' +
        '<uib-alert ng-repeat="alert in alerts" type="{{alert.type}}"' +
          'close="removeAlert($index)">{{alert.msg}}' +
        '</uib-alert>' +
      '</div>');

    scope.alerts = [
      { msg:'foo', type:'success'},
      { msg:'bar', type:'error'},
      { msg:'baz'}
    ];
  }));

  function createAlerts() {
    $compile(element)(scope);
    scope.$digest();
    return element.find('.alert');
  }

  function findCloseButton(index) {
    return element.find('.close').eq(index);
  }

  function findContent(index) {
    return element.find('div[ng-transclude] span').eq(index);
  }

  it('should expose the controller to the view', function() {
    $templateCache.put('template/alert/alert.html', '<div>{{alert.text}}</div>');

    element = $compile('<uib-alert></uib-alert>')(scope);
    scope.$digest();

    var ctrl = element.controller('uib-alert');
    expect(ctrl).toBeDefined();

    ctrl.text = 'foo';
    scope.$digest();

    expect(element.html()).toBe('foo');
  });

  it('should support custom templates', function() {
    $templateCache.put('foo/bar.html', '<div>baz</div>');

    element = $compile('<uib-alert template-url="foo/bar.html"></uib-alert>')(scope);
    scope.$digest();

    expect(element.html()).toBe('baz');
  });

  it('should generate alerts using ng-repeat', function() {
    var alerts = createAlerts();
    expect(alerts.length).toEqual(3);
  });

  it('should use correct classes for different alert types', function() {
    var alerts = createAlerts();
    expect(alerts.eq(0)).toHaveClass('alert-success');
    expect(alerts.eq(1)).toHaveClass('alert-error');
    expect(alerts.eq(2)).toHaveClass('alert-warning');
  });

  it('should respect alert type binding', function() {
    var alerts = createAlerts();
    expect(alerts.eq(0)).toHaveClass('alert-success');

    scope.alerts[0].type = 'error';
    scope.$digest();

    expect(alerts.eq(0)).toHaveClass('alert-error');
  });

  it('should show the alert content', function() {
    var alerts = createAlerts();

    for (var i = 0, n = alerts.length; i < n; i++) {
      expect(findContent(i).text()).toBe(scope.alerts[i].msg);
    }
  });

  it('should show close buttons and have the dismissible class', function() {
    var alerts = createAlerts();

    for (var i = 0, n = alerts.length; i < n; i++) {
      expect(findCloseButton(i).css('display')).not.toBe('none');
      expect(alerts.eq(i)).toHaveClass('alert-dismissible');
    }
  });

  it('should fire callback when closed', function() {
    var alerts = createAlerts();

    scope.$apply(function() {
      scope.removeAlert = jasmine.createSpy();
    });

    expect(findCloseButton(0).css('display')).not.toBe('none');
    findCloseButton(1).click();

    expect(scope.removeAlert).toHaveBeenCalledWith(1);
  });

  it('should not show close button and have the dismissible class if no close callback specified', function() {
    element = $compile('<uib-alert>No close</uib-alert>')(scope);
    scope.$digest();
    expect(findCloseButton(0)).toBeHidden();
    expect(element).not.toHaveClass('alert-dismissible');
  });

  it('should be possible to add additional classes for alert', function() {
    var element = $compile('<uib-alert class="alert-block" type="info">Default alert!</uib-alert>')(scope);
    scope.$digest();
    expect(element).toHaveClass('alert-block');
    expect(element).toHaveClass('alert-info');
  });

  it('should close automatically if dismiss-on-timeout is defined on the element', function() {
    scope.removeAlert = jasmine.createSpy();
    $compile('<uib-alert close="removeAlert()" dismiss-on-timeout="500">Default alert!</uib-alert>')(scope);
    scope.$digest();

    $timeout.flush();
    expect(scope.removeAlert).toHaveBeenCalled();
  });

  it('should not close immediately with a dynamic dismiss-on-timeout', function() {
    scope.removeAlert = jasmine.createSpy();
    scope.dismissTime = 500;
    $compile('<uib-alert close="removeAlert()" dismiss-on-timeout="{{dismissTime}}">Default alert!</uib-alert>')(scope);
    scope.$digest();

    $timeout.flush(100);
    expect(scope.removeAlert).not.toHaveBeenCalled();

    $timeout.flush(500);
    expect(scope.removeAlert).toHaveBeenCalled();
  });
});

/* Deprecation tests below */

describe('alert deprecation', function() {
  beforeEach(module('ui.bootstrap.alert'));
  beforeEach(module('template/alert/alert.html'));

  it('should suppress warning', function() {
    module(function($provide) {
      $provide.value('$alertSuppressWarning', true);
    });

    inject(function($compile, $log, $rootScope) {
      spyOn($log, 'warn');

      var element = '<alert></alert>';
      element = $compile(element)($rootScope);
      $rootScope.$digest();
      expect($log.warn.calls.count()).toBe(0);
    });
  });

  it('should give warning by default', inject(function($compile, $log, $rootScope) {
    spyOn($log, 'warn');

    var element = '<alert></alert>';
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    expect($log.warn.calls.count()).toBe(2);
    expect($log.warn.calls.argsFor(0)).toEqual(['AlertController is now deprecated. Use UibAlertController instead.']);
    expect($log.warn.calls.argsFor(1)).toEqual(['alert is now deprecated. Use uib-alert instead.']);
  }));
});
