describe('tooltip', function() {
  var elm, 
      elmBody,
      scope, 
      elmScope;

  // load the tooltip code
  beforeEach(module('ui.bootstrap.tooltip'));

  // load the template
  beforeEach(module('template/tooltip/tooltip-popup.html'));

  beforeEach(inject(function($rootScope, $compile) {
    elmBody = angular.element( 
      '<div><span tooltip="tooltip text">Selector Text</span></div>' 
    );

    scope = $rootScope;
    $compile(elmBody)(scope);
    scope.$digest();
    elm = elmBody.find('span');
    elmScope = elm.scope();
  }));

  it('should not be open initially', inject(function() {
    expect( elmScope.isOpen ).toBe( false );
    
    // We can only test *that* the tooltip-popup element wasn't created as the
    // implementation is templated and replaced.
    expect( elmBody.children().length ).toBe( 1 );
  }));

  it('should open on mouseenter', inject(function() {
    elm.trigger( 'mouseenter' );
    expect( elmScope.isOpen ).toBe( true );

    // We can only test *that* the tooltip-popup element was created as the
    // implementation is templated and replaced.
    expect( elmBody.children().length ).toBe( 2 );
  }));

  it('should close on mouseleave', inject(function() {
    elm.trigger( 'mouseenter' );
    elm.trigger( 'mouseleave' );
    expect( elmScope.isOpen ).toBe( false );
  }));

  it('should have default placement of "top"', inject(function() {
    elm.trigger( 'mouseenter' );
    expect( elmScope.placement ).toBe( "top" );
  }));

  it('should allow specification of placement', inject( function( $compile ) {
    elm = $compile( angular.element( 
      '<span tooltip="tooltip text" tooltip-placement="bottom">Selector Text</span>' 
    ) )( scope );
    elmScope = elm.scope();

    elm.trigger( 'mouseenter' );
    expect( elmScope.placement ).toBe( "bottom" );
  }));

  it('should work inside an ngRepeat', inject( function( $compile ) {

    elm = $compile( angular.element( 
      '<ul>'+
        '<li ng-repeat="item in items">'+
          '<span id="selector" tooltip="{{item.tooltip}}">{{item.name}}</span>'+
        '</li>'+
      '</ul>'
    ) )( scope );

    scope.items = [
      { name: "One", tooltip: "First Tooltip" }
    ];
    
    scope.$digest();
    
    var tt = angular.element( elm.find("li > span")[0] );
    
    tt.trigger( 'mouseenter' );

    // Due to the transclusion, the contents of the element are in a span, so
    // we select the tooltip's child and ensure its content matches.
    expect( tt.children().text() ).toBe( scope.items[0].name );

    // And the tooltip text should still match.
    expect( tt.scope().tooltipTitle ).toBe( scope.items[0].tooltip );

    tt.trigger( 'mouseleave' );
  }));
});

    
