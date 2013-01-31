describe('popover', function() {
  var elm, 
      elmBody,
      scope, 
      elmScope;

  // load the popover code
  beforeEach(module('ui.bootstrap.popover'));

  // load the template
  beforeEach(module('template/popover/popover.html'));

  beforeEach(inject(function($rootScope, $compile) {
    elmBody = angular.element( 
      '<div><span popover="popover text">Selector Text</span></div>' 
    );

    scope = $rootScope;
    $compile(elmBody)(scope);
    scope.$digest();
    elm = elmBody.find('span');
    elmScope = elm.scope();
  }));

  it('should not be open initially', inject(function() {
    expect( elmScope.tt_isOpen ).toBe( false );
    
    // We can only test *that* the popover-popup element wasn't created as the
    // implementation is templated and replaced.
    expect( elmBody.children().length ).toBe( 1 );
  }));

  it('should open on click', inject(function() {
    elm.trigger( 'click' );
    expect( elmScope.tt_isOpen ).toBe( true );

    // We can only test *that* the popover-popup element was created as the
    // implementation is templated and replaced.
    expect( elmBody.children().length ).toBe( 2 );
  }));

  it('should close on second click', inject(function() {
    elm.trigger( 'click' );
    elm.trigger( 'click' );
    expect( elmScope.tt_isOpen ).toBe( false );
  }));

  it('should have default placement of "top"', inject(function() {
    elm.trigger( 'click' );
    expect( elmScope.tt_placement ).toBe( "top" );
  }));

  it('should allow specification of placement', inject( function( $compile ) {
    elm = $compile( angular.element( 
      '<span popover="popover text" popover-placement="bottom">Selector Text</span>' 
    ) )( scope );
    elmScope = elm.scope();

    elm.trigger( 'click' );
    expect( elmScope.tt_placement ).toBe( "bottom" );
  }));

  it('should work inside an ngRepeat', inject( function( $compile ) {

    elm = $compile( angular.element( 
      '<ul>'+
        '<li ng-repeat="item in items">'+
          '<span popover="{{item.popover}}">{{item.name}}</span>'+
        '</li>'+
      '</ul>'
    ) )( scope );

    scope.items = [
      { name: "One", popover: "First popover" }
    ];
    
    scope.$digest();
    
    var tt = angular.element( elm.find("li > span")[0] );
    
    tt.trigger( 'click' );

    expect( tt.text() ).toBe( scope.items[0].name );
    expect( tt.scope().tt_popover ).toBe( scope.items[0].popover );

    tt.trigger( 'click' );
  }));

  it('should only have an isolate scope on the popup', inject( function ( $compile ) {
    var ttScope;

    scope.popoverMsg = "popover Text";
    scope.popoverTitle = "popover Text";
    scope.alt = "Alt Message";

    elmBody = $compile( angular.element( 
      '<div><span alt={{alt}} popover="{{popoverMsg}}" popover-title="{{popoverTitle}}">Selector Text</span></div>'
    ) )( scope );

    $compile( elmBody )( scope );
    scope.$digest();
    elm = elmBody.find( 'span' );
    elmScope = elm.scope();
    
    elm.trigger( 'click' );
    expect( elm.attr( 'alt' ) ).toBe( scope.alt );

    ttScope = angular.element( elmBody.children()[1] ).scope();
    expect( ttScope.placement ).toBe( 'top' );
    expect( ttScope.popoverTitle ).toBe( scope.popoverTitle );
    expect( ttScope.popoverContent ).toBe( scope.popoverMsg );

    elm.trigger( 'click' );
  }));

});

    
