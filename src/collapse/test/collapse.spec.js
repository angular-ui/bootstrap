describe('collapse directive', function() {
  var element, compileFn, scope, $compile, $animate, $q;

  beforeEach(module('ui.bootstrap.collapse'));
  beforeEach(module('ngAnimateMock'));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$animate_, _$q_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $animate = _$animate_;
    $q = _$q_;
  }));

  beforeEach(function() {
    element = angular.element(
      '<div uib-collapse="isCollapsed" '
        + 'expanding="expanding()" '
        + 'expanded="expanded()" '
        + 'collapsing="collapsing()" '
        + 'collapsed="collapsed()">'
      + 'Some Content</div>');
    compileFn = $compile(element);
    angular.element(document.body).append(element);
  });

  afterEach(function() {
    element.remove();
  });

  function initCallbacks() {
    scope.collapsing = jasmine.createSpy('scope.collapsing');
    scope.collapsed = jasmine.createSpy('scope.collapsed');
    scope.expanding = jasmine.createSpy('scope.expanding');
    scope.expanded = jasmine.createSpy('scope.expanded');
  }

  function assertCallbacks(expected) {
    ['collapsing', 'collapsed', 'expanding', 'expanded'].forEach(function(cbName) {
      if (expected[cbName]) {
        expect(scope[cbName]).toHaveBeenCalled();
      } else {
        expect(scope[cbName]).not.toHaveBeenCalled();
      }
    });
  }

  it('should be hidden on initialization if isCollapsed = true', function() {
    initCallbacks();
    scope.isCollapsed = true;
    compileFn(scope);
    scope.$digest();
    expect(element.height()).toBe(0);
    assertCallbacks({ collapsed: true });
  });

  it('should not trigger any animation on initialization if isCollapsed = true', function() {
    var wrapperFn = function() {
      $animate.flush();
    };

    scope.isCollapsed = true;
    compileFn(scope);
    scope.$digest();

    expect(wrapperFn).toThrowError(/No pending animations ready to be closed or flushed/);
  });

  it('should collapse if isCollapsed = true on subsequent use', function() {
    scope.isCollapsed = false;
    compileFn(scope);
    scope.$digest();
    initCallbacks();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(element.height()).toBe(0);
    assertCallbacks({ collapsing: true, collapsed: true });
  });

  it('should show after toggled from collapsed', function() {
    initCallbacks();
    scope.isCollapsed = true;
    compileFn(scope);
    scope.$digest();
    expect(element.height()).toBe(0);
    assertCallbacks({ collapsed: true });
    scope.collapsed.calls.reset();

    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    expect(element.height()).not.toBe(0);
    assertCallbacks({ expanding: true, expanded: true });
  });

  it('should not trigger any animation on initialization if isCollapsed = false', function() {
    var wrapperFn = function() {
      $animate.flush();
    };

    scope.isCollapsed = false;
    compileFn(scope);
    scope.$digest();

    expect(wrapperFn).toThrowError(/No pending animations ready to be closed or flushed/);
  });

  it('should expand if isCollapsed = false on subsequent use', function() {
    scope.isCollapsed = false;
    compileFn(scope);
    scope.$digest();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    initCallbacks();
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    expect(element.height()).not.toBe(0);
    assertCallbacks({ expanding: true, expanded: true });
  });

  it('should collapse if isCollapsed = true on subsequent uses', function() {
    scope.isCollapsed = false;
    compileFn(scope);
    scope.$digest();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    initCallbacks();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(element.height()).toBe(0);
    assertCallbacks({ collapsing: true, collapsed: true });
  });

  it('should change aria-expanded attribute', function() {
    scope.isCollapsed = false;
    compileFn(scope);
    scope.$digest();
    expect(element.attr('aria-expanded')).toBe('true');

    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(element.attr('aria-expanded')).toBe('false');
  });

  it('should change aria-hidden attribute', function() {
    scope.isCollapsed = false;
    compileFn(scope);
    scope.$digest();
    expect(element.attr('aria-hidden')).toBe('false');

    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(element.attr('aria-hidden')).toBe('true');
  });

  describe('dynamic content', function() {
    var element;

    beforeEach(function() {
      element = angular.element('<div uib-collapse="isCollapsed"><p>Initial content</p><div ng-show="exp">Additional content</div></div>');
      $compile(element)(scope);
      angular.element(document.body).append(element);
    });

    afterEach(function() {
      element.remove();
    });

    it('should grow accordingly when content size inside collapse increases', function() {
      scope.exp = false;
      scope.isCollapsed = false;
      scope.$digest();
      var collapseHeight = element.height();
      scope.exp = true;
      scope.$digest();
      expect(element.height()).toBeGreaterThan(collapseHeight);
    });

    it('should shrink accordingly when content size inside collapse decreases', function() {
      scope.exp = true;
      scope.isCollapsed = false;
      scope.$digest();
      var collapseHeight = element.height();
      scope.exp = false;
      scope.$digest();
      expect(element.height()).toBeLessThan(collapseHeight);
    });
  });

  describe('expanding callback returning a promise', function() {
    var defer, collapsedHeight;

    beforeEach(function() {
      defer = $q.defer();

      scope.isCollapsed = true;
      scope.expanding = function() {
        return defer.promise;
      };
      compileFn(scope);
      scope.$digest();
      collapsedHeight = element.height();

      // set flag to expand ...
      scope.isCollapsed = false;
      scope.$digest();

      // ... shouldn't expand yet ...
      expect(element.attr('aria-expanded')).not.toBe('true');
      expect(element.height()).toBe(collapsedHeight);
    });

    it('should wait for it to resolve before animating', function() {
      defer.resolve();

      // should now expand
      scope.$digest();
      $animate.flush();

      expect(element.attr('aria-expanded')).toBe('true');
      expect(element.height()).toBeGreaterThan(collapsedHeight);
    });

    it('should not animate if it rejects', function() {
      defer.reject();

      // should NOT expand
      scope.$digest();

      expect(element.attr('aria-expanded')).not.toBe('true');
      expect(element.height()).toBe(collapsedHeight);
    });
  });

  describe('collapsing callback returning a promise', function() {
    var defer, expandedHeight;

    beforeEach(function() {
      defer = $q.defer();
      scope.isCollapsed = false;
      scope.collapsing = function() {
        return defer.promise;
      };
      compileFn(scope);
      scope.$digest();

      expandedHeight = element.height();

      // set flag to collapse ...
      scope.isCollapsed = true;
      scope.$digest();

      // ... but it shouldn't collapse yet ...
      expect(element.attr('aria-expanded')).not.toBe('false');
      expect(element.height()).toBe(expandedHeight);
    });

    it('should wait for it to resolve before animating', function() {
      defer.resolve();

      // should now collapse
      scope.$digest();
      $animate.flush();

      expect(element.attr('aria-expanded')).toBe('false');
      expect(element.height()).toBeLessThan(expandedHeight);
    });

    it('should not animate if it rejects', function() {
      defer.reject();

      // should NOT collapse
      scope.$digest();

      expect(element.attr('aria-expanded')).not.toBe('false');
      expect(element.height()).toBe(expandedHeight);
    });
  });

});
