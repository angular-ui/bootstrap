describe('modal', function() {
  var scope, $compile;

  beforeEach(module('ui.bootstrap.modal'));
  beforeEach(inject(function($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  afterEach(function(){
    $('.modal-backdrop').remove();
  });

  function modal(options, expr, closeExpr) {
    scope.modalOpts = options;
    return $compile('<div modal="' + (expr || 'modalShown') + '"' +
                    ' options="modalOpts"' +
                    ' ' + (closeExpr && 'close="'+closeExpr+"'") +
                    '>Hello!</div>')(scope);
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
  
  it('should not close on backdrop click if option is "static"', function() {
    var elm = modal({backdrop:"static"});
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

  it('should work with a close expression and escape close', function() {
    scope.bar = true;
    scope.show = function() { return scope.bar; };
    var elm = $compile("<div modal='show()' close='bar=false'></div>")(scope);
    scope.$apply();
    expect(elm).toHaveClass('in');
    $("body").trigger({type :'keyup', which: 27}); //escape
    expect(elm).not.toHaveClass('in');
  });

  it('should work with a close expression and backdrop close', function() {
    scope.baz = 1;
    scope.hello = function() { return scope.baz===1; };
    var elm = $compile("<div modal='hello()' close='baz=0'></div>")(scope);
    scope.$apply();
    expect(elm).toHaveClass("in");
    $(".modal-backdrop").click();
    expect(elm).not.toHaveClass('in');
  });
});

