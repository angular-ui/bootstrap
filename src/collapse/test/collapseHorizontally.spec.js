describe('collapse directive', function() {
  var elementH, compileFnH, scope, $compile, $animate, $q;

  beforeEach(module('ui.bootstrap.collapse'));
  beforeEach(module('ngAnimateMock'));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$animate_, _$q_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $animate = _$animate_;
    $q = _$q_;
  }));

  beforeEach(function() {
    elementH = angular.element(
      '<div uib-collapse="isCollapsed" '
      + 'expanding="expanding()" '
      + 'expanded="expanded()" '
      + 'collapsing="collapsing()" '
      + 'collapsed="collapsed()" '
      + 'horizontal>'
      + 'Some Content</div>');
    compileFnH = $compile(elementH);
    angular.element(document.body).append(elementH);
  });

  afterEach(function() {
    elementH.remove();
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
    compileFnH(scope);
    scope.$digest();
    expect(elementH.width()).toBe(0);
    assertCallbacks({ collapsed: true });
  });

  it('should not trigger any animation on initialization if isCollapsed = true', function() {
    var wrapperFn = function() {
      $animate.flush();
    };

    scope.isCollapsed = true;
    compileFnH(scope);
    scope.$digest();

    expect(wrapperFn).toThrowError(/No pending animations ready to be closed or flushed/);
  });

  it('should collapse if isCollapsed = true on subsequent use', function() {
    scope.isCollapsed = false;
    compileFnH(scope);
    scope.$digest();
    initCallbacks();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(elementH.width()).toBe(0);
    assertCallbacks({ collapsing: true, collapsed: true });
  });

  it('should show after toggled from collapsed', function() {
    initCallbacks();
    scope.isCollapsed = true;
    compileFnH(scope);
    scope.$digest();
    expect(elementH.width()).toBe(0);
    assertCallbacks({ collapsed: true });
    scope.collapsed.calls.reset();

    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    expect(elementH.width()).not.toBe(0);
    assertCallbacks({ expanding: true, expanded: true });
  });

  it('should not trigger any animation on initialization if isCollapsed = false', function() {
    var wrapperFn = function() {
      $animate.flush();
    };

    scope.isCollapsed = false;
    compileFnH(scope);
    scope.$digest();

    expect(wrapperFn).toThrowError(/No pending animations ready to be closed or flushed/);
  });

  it('should expand if isCollapsed = false on subsequent use', function() {
    scope.isCollapsed = false;
    compileFnH(scope);
    scope.$digest();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    initCallbacks();
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    expect(elementH.width()).not.toBe(0);
    assertCallbacks({ expanding: true, expanded: true });
  });

  it('should collapse if isCollapsed = true on subsequent uses', function() {
    scope.isCollapsed = false;
    compileFnH(scope);
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
    expect(elementH.width()).toBe(0);
    assertCallbacks({ collapsing: true, collapsed: true });
  });

  it('should change aria-expanded attribute', function() {
    scope.isCollapsed = false;
    compileFnH(scope);
    scope.$digest();
    expect(elementH.attr('aria-expanded')).toBe('true');

    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(elementH.attr('aria-expanded')).toBe('false');
  });

  it('should change aria-hidden attribute', function() {
    scope.isCollapsed = false;
    compileFnH(scope);
    scope.$digest();
    expect(elementH.attr('aria-hidden')).toBe('false');

    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(elementH.attr('aria-hidden')).toBe('true');
  });

  describe('expanding callback returning a promise', function() {
    var defer, collapsedWidth;

    beforeEach(function() {
      defer = $q.defer();

      scope.isCollapsed = true;
      scope.expanding = function() {
        return defer.promise;
      };
      compileFnH(scope);
      scope.$digest();
      collapsedWidth = elementH.width();

      // set flag to expand ...
      scope.isCollapsed = false;
      scope.$digest();

      // ... shouldn't expand yet ...
      expect(elementH.attr('aria-expanded')).not.toBe('true');
      expect(elementH.width()).toBe(collapsedWidth);
    });

    it('should wait for it to resolve before animating', function() {
      defer.resolve();

      // should now expand
      scope.$digest();
      $animate.flush();

      expect(elementH.attr('aria-expanded')).toBe('true');
      expect(elementH.width()).toBeGreaterThan(collapsedWidth);
    });

    it('should not animate if it rejects', function() {
      defer.reject();

      // should NOT expand
      scope.$digest();

      expect(elementH.attr('aria-expanded')).not.toBe('true');
      expect(elementH.width()).toBe(collapsedWidth);
    });
  });

  describe('collapsing callback returning a promise', function() {
    var defer, expandedWidth;

    beforeEach(function() {
      defer = $q.defer();
      scope.isCollapsed = false;
      scope.collapsing = function() {
        return defer.promise;
      };
      compileFnH(scope);
      scope.$digest();

      expandedWidth = elementH.width();

      // set flag to collapse ...
      scope.isCollapsed = true;
      scope.$digest();

      // ... but it shouldn't collapse yet ...
      expect(elementH.attr('aria-expanded')).not.toBe('false');
      expect(elementH.width()).toBe(expandedWidth);
    });

    it('should wait for it to resolve before animating', function() {
      defer.resolve();

      // should now collapse
      scope.$digest();
      $animate.flush();

      expect(elementH.attr('aria-expanded')).toBe('false');
      expect(elementH.width()).toBeLessThan(expandedWidth);
    });

    it('should not animate if it rejects', function() {
      defer.reject();

      // should NOT collapse
      scope.$digest();

      expect(elementH.attr('aria-expanded')).not.toBe('false');
      expect(elementH.width()).toBe(expandedWidth);
    });
  });

});
