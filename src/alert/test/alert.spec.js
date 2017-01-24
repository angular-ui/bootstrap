describe('uib-alert', function() {
  var element, scope, $compile, $templateCache, $timeout;

  beforeEach(module('ui.bootstrap.alert'));
  beforeEach(module('uib/template/alert/alert.html'));

  beforeEach(inject(function($rootScope, _$compile_, _$templateCache_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $templateCache = _$templateCache_;
    $timeout = _$timeout_;

    element = angular.element(
      '<div>' +
        '<div uib-alert ng-repeat="alert in alerts" ' +
          'ng-class="\'alert-\' + (alert.type || \'warning\')" ' +
          'close="removeAlert($index)">{{alert.msg}}' +
        '</div>' +
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
    return element.find('div[ng-transclude]').eq(index);
  }

  it('should expose the controller to the view', function() {
    $templateCache.put('uib/template/alert/alert.html', '<div>{{alert.text}}</div>');

    element = $compile('<div uib-alert></div>')(scope);
    scope.$digest();

    var ctrl = element.controller('uib-alert');
    expect(ctrl).toBeDefined();

    ctrl.text = 'foo';
    scope.$digest();

    expect(element.html()).toBe('<div class="ng-binding">foo</div>');
  });

  it('should support custom templates', function() {
    $templateCache.put('foo/bar.html', '<div>baz</div>');

    element = $compile('<div uib-alert template-url="foo/bar.html"></div>')(scope);
    scope.$digest();

    expect(element.html()).toBe('<div>baz</div>');
  });

  it('should generate alerts using ng-repeat', function() {
    var alerts = createAlerts();
    expect(alerts.length).toEqual(3);
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
    element = $compile('<div uib-alert>No close</div>')(scope);
    scope.$digest();
    expect(findCloseButton(0)).toBeHidden();
    expect(element).not.toHaveClass('alert-dismissible');
  });

  it('should close automatically if dismiss-on-timeout is defined on the element', function() {
    scope.removeAlert = jasmine.createSpy();
    $compile('<div uib-alert close="removeAlert()" dismiss-on-timeout="500">Default alert!</div>')(scope);
    scope.$digest();

    $timeout.flush();
    expect(scope.removeAlert).toHaveBeenCalled();
  });

  it('should not close immediately with a dynamic dismiss-on-timeout', function() {
    scope.removeAlert = jasmine.createSpy();
    scope.dismissTime = 500;
    $compile('<div uib-alert close="removeAlert()" dismiss-on-timeout="{{dismissTime}}">Default alert!</div>')(scope);
    scope.$digest();

    $timeout.flush(100);
    expect(scope.removeAlert).not.toHaveBeenCalled();

    $timeout.flush(500);
    expect(scope.removeAlert).toHaveBeenCalled();
  });
});
