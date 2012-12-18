describe('collapsible directive', function () {

  var scope, $compile, $timeout, $transition;

  beforeEach(module('ui.bootstrap.collapsible'));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$timeout_, _$transition_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $timeout = _$timeout_;
    $transition = _$transition_;
  }));

  var element;

  beforeEach(function() {
    element = $compile('<div collapsible is-collapsed="isCollapsed">Some Content</div>')(scope);
    angular.element(document.body).append(element);
  });

  it('should collapse if isCollapsed = true', function() {
    scope.isCollapsed = true;
    scope.$digest();
    $timeout.flush();
    expect(element.height()).toBe(0);
  });

  it('should expand if isCollapsed = false', function() {
    scope.isCollapsed = false;
    scope.$digest();
    $timeout.flush();
    expect(element.height()).not.toBe(0);
  });    
});