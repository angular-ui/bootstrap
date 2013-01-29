describe('collapse directive', function () {

  var scope, $compile, $timeout, $transition;

  beforeEach(module('ui.bootstrap.collapse'));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$timeout_, _$transition_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $timeout = _$timeout_;
    $transition = _$transition_;
  }));

  var element;

  beforeEach(function() {
    element = $compile('<div collapse="isCollapsed">Some Content</div>')(scope);
    angular.element(document.body).append(element);
  });

  afterEach(function() {
    element.remove();
  });

  it('should be hidden on initialization if isCollapsed = true without transition', function() {
    scope.isCollapsed = true;
    scope.$digest();
    //No animation timeout here
    expect(element.height()).toBe(0);
  });

  it('should collapse if isCollapsed = true with animation on subsequent use', function() {
    scope.isCollapsed = false;
    scope.$digest();
    scope.isCollapsed = true;
    scope.$digest();
    $timeout.flush();
    expect(element.height()).toBe(0);
  });

  it('should be shown on initialization if isCollapsed = false without transition', function() {
    scope.isCollapsed = false;
    scope.$digest();
    //No animation timeout here
    expect(element.height()).not.toBe(0);
  });

  it('should expand if isCollapsed = false with animation on subsequent use', function() {
    scope.isCollapsed = false;
    scope.$digest();
    scope.isCollapsed = true;
    scope.$digest();
    scope.isCollapsed = false;
    scope.$digest();
    $timeout.flush();
    expect(element.height()).not.toBe(0);
  });
});