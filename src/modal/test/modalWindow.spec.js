describe('modal window', function () {

  var $rootScope, $compile;

  beforeEach(module('ui.bootstrap.modal'));
  beforeEach(module('template/modal/window.html'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('should support custom CSS classes as string', function () {
    var windowEl = $compile('<div modal-window window-class="test">content</div>')($rootScope);
    $rootScope.$digest();

    expect(windowEl).toHaveClass('test');
  });
});