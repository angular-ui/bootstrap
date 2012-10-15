describe('popover', function() {
  var scope, elm, $compile;

  beforeEach(module('ui.bootstrap'));
  beforeEach(inject(function($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  it('should create a popover element with proper contents and a title', function() {
    elm = $compile('<bs-popover id="popeye" title="hello"><span id="inside">Whats Up!</span></bs-popover>')(scope);
    scope.$apply();
    expect($(".popover", elm).length).toBeGreaterThan(0);
    expect($(".popover-title", elm).text()).toBe("hello");
    expect($("#inside", elm).text()).toBe("Whats Up!");
  });

  it('should give error if no id given for popover', function() {
    expect(function() {
      elm = $compile('<bs-popover></bs-popover')(scope);
    }).toThrow();
  });

  it('should interpolate the title', function() {
    scope.person = "Andy";
    elm = $compile("<bs-popover id='a' title='hello, {{person}}!'>Content</bs-popover>")(scope);
    scope.$apply();
    expect($(".popover-title", elm).text()).toBe("hello, Andy!");
  });
  
  it('should show popover when model is true', function() {
    var pop = $(".popover", $compile("<bs-popover id='a'>Hi</bs-popover>")(scope));
    elm = $compile("<a bs-pop-target='a' show='value'></a>")(scope);
    scope.$apply();
    expect(pop).not.toHaveClass('in');
    scope.$apply('value = true');
    expect(pop).toHaveClass('in');
    scope.$apply('value = false');
    expect(pop).not.toHaveClass('in');
  });
});
