describe('modal', function() {
  var scope, $compile;

  beforeEach(module('ui.bootstrap'));
  beforeEach(inject(function($rootScope, _$compile_) {
    scope = $rootScope;//.$new();
    $compile = _$compile_;
  }));

  function modal(options, expr) {
    scope.modalOpts = options;
    return $compile("<div bs-modal='"+(expr || 'modalShown')+"' options='modalOpts'>" +
      "Content</div>")(scope);
  }

  it('should toggle modal with model', function() {
    var elm = modal();
    scope.$apply('modalShown = true');
    expect(elm).toHaveClass('in');
    scope.$apply('modalShown = false');
    expect(elm).not.toHaveClass('in');
  });

  it('should close on escape if option is true (default)', function() {
    var elm = modal();
    scope.$apply('modalShown = true');
    $("body").trigger({type: 'keyup', which: 27}); //escape
    expect(elm).not.toHaveClass('in');
  });

  it('should close on backdrop click if option is true (default)', function() {
    var elm = modal();
    scope.$apply('modalShown = true');
    $(".modal-backdrop").click();
    expect(elm).not.toHaveClass('in');
  });

  it('should not close on escape if option is false', function() {
    var elm = modal({escape:false});
    scope.$apply('modalShown = true');
    $("body").trigger({type: 'keyup', which: 27});
    expect(elm).toHaveClass('in');
  });

  it('should not close on backdrop click if option is false', function() {
    var elm = modal({backdrop:false});
    scope.$apply('modalShown = true');
    $(".modal-backdrop").click();
    expect(elm).toHaveClass('in');
  });

  it('should work with expression instead of variable', function() {
    scope.foo = true;
    scope.shown = function() { return scope.foo; };
    var elm = modal({}, 'shown()');
    scope.$apply();
    expect(elm).toHaveClass('in');
    scope.$apply('foo = false');
    expect(elm).not.toHaveClass('in');
  });

  it('should work with escape/backdrop when an expression TODO', function() {
    expect(true).toBe(false);
    //failed test so we know it doesn't work yet
  });
});

