describe('tabindex toggle directive', function() {
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.tabindex'));
  beforeEach(inject(function($compile, _$rootScope_) {
    $rootScope = _$rootScope_;
    element = $compile('<a href uib-tabindex-toggle ng-disabled="disabled">foo</a>')($rootScope);
    $rootScope.$digest();
  }));

  it('should toggle the tabindex on disabled toggle', function() {
    expect(element.prop('tabindex')).toBe(0);

    $rootScope.disabled = true;
    $rootScope.$digest();

    expect(element.prop('tabindex')).toBe(-1);

    $rootScope.disabled = false;
    $rootScope.$digest();

    expect(element.prop('tabindex')).toBe(0);
  });
});
