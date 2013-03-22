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
    expect( elmScope.tt_isOpen ).toBe( false );
    
    // We can only test *that* the tooltip-popup element wasn't created as the
    // implementation is templated and replaced.
    expect( elmBody.children().length ).toBe( 1 );
  }));

  it('should open on mouseenter', inject(function() {
    elm.trigger( 'mouseenter' );
    expect( elmScope.tt_isOpen ).toBe( true );

    // We can only test *that* the tooltip-popup element was created as the
    // implementation is templated and replaced.
    expect( elmBody.children().length ).toBe( 2 );
  }));

  it('should close on mouseleave', inject(function() {
    elm.trigger( 'mouseenter' );
    elm.trigger( 'mouseleave' );
    expect( elmScope.tt_isOpen ).toBe( false );
  }));

  it('should have default placement of "top"', inject(function() {
    elm.trigger( 'mouseenter' );
    expect( elmScope.tt_placement ).toBe( "top" );
  }));

  it('should allow specification of placement', inject( function( $compile ) {
    elm = $compile( angular.element( 
      '<span tooltip="tooltip text" tooltip-placement="bottom">Selector Text</span>' 
    ) )( scope );
    elmScope = elm.scope();

    elm.trigger( 'mouseenter' );
    expect( elmScope.tt_placement ).toBe( "bottom" );
  }));

  it('should work inside an ngRepeat', inject( function( $compile ) {

    elm = $compile( angular.element( 
      '<ul>'+
        '<li ng-repeat="item in items">'+
          '<span tooltip="{{item.tooltip}}">{{item.name}}</span>'+
        '</li>'+
      '</ul>'
    ) )( scope );

    scope.items = [
      { name: "One", tooltip: "First Tooltip" }
    ];
    
    scope.$digest();
    
    var tt = angular.element( elm.find("li > span")[0] );
    
    tt.trigger( 'mouseenter' );

    expect( tt.text() ).toBe( scope.items[0].name );
    expect( tt.scope().tt_content ).toBe( scope.items[0].tooltip );

    tt.trigger( 'mouseleave' );
  }));

  it('should only have an isolate scope on the popup', inject( function ( $compile ) {
    var ttScope;

    scope.tooltipMsg = "Tooltip Text";
    scope.alt = "Alt Message";

    elmBody = $compile( angular.element( 
      '<div><span alt={{alt}} tooltip="{{tooltipMsg}}">Selector Text</span></div>' 
    ) )( scope );

    $compile( elmBody )( scope );
    scope.$digest();
    elm = elmBody.find( 'span' );
    elmScope = elm.scope();
    
    elm.trigger( 'mouseenter' );
    expect( elm.attr( 'alt' ) ).toBe( scope.alt );

    ttScope = angular.element( elmBody.children()[1] ).scope();
    expect( ttScope.placement ).toBe( 'top' );
    expect( ttScope.content ).toBe( scope.tooltipMsg );

    elm.trigger( 'mouseleave' );
  }));

  it('should not show tooltips if there is nothing to show - issue #129', inject(function ($compile) {

    elmBody = $compile(angular.element(
      '<div><span tooltip="">Selector Text</span></div>'
    ))(scope);
    scope.$digest();
    elmBody.find('span').trigger('mouseenter');

    expect(elmBody.children().length).toBe(1);
  }));

  describe('with specified popup delay', function () {

    beforeEach(inject(function ($compile) {
      scope.delay='1000';
      elm = $compile(angular.element(
        '<span tooltip="tooltip text" tooltip-popup-delay="{{delay}}">Selector Text</span>'
      ))(scope);
      elmScope = elm.scope();
      scope.$digest();
    }));

    it('should open after timeout', inject(function ($timeout) {

      elm.trigger('mouseenter');
      expect(elmScope.tt_isOpen).toBe(false);

      $timeout.flush();
      expect(elmScope.tt_isOpen).toBe(true);

    }));

    it('should not open if mouseleave before timeout', inject(function ($timeout) {
      elm.trigger('mouseenter');
      expect(elmScope.tt_isOpen).toBe(false);

      elm.trigger('mouseleave');
      $timeout.flush();
      expect(elmScope.tt_isOpen).toBe(false);
    }));

    it('should use default popup delay if specified delay is not a number', function(){
      scope.delay='text1000';
      scope.$digest();
      elm.trigger('mouseenter');
      expect(elmScope.tt_isOpen).toBe(true);
    });

  });

});

describe( '$tooltipProvider', function() {

  describe( 'popupDelay', function() {
    var elm,
      elmBody,
      scope,
      elmScope;

    beforeEach(module('ui.bootstrap.tooltip', function($tooltipProvider){
      $tooltipProvider.options({popupDelay: 1000});
    }));

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

    it('should open after timeout', inject(function($timeout) {

      elm.trigger( 'mouseenter' );
      expect( elmScope.tt_isOpen ).toBe( false );

      $timeout.flush();
      expect( elmScope.tt_isOpen ).toBe( true );

    }));

  });

  describe('appendToBody', function() {
    var elm, 
        elmBody,
        scope, 
        elmScope,
        body;

    // load the tooltip code
    beforeEach(module('ui.bootstrap.tooltip', function ( $tooltipProvider ) {
        $tooltipProvider.options({ appendToBody: true });
    }));

    // load the template
    beforeEach(module('template/tooltip/tooltip-popup.html'));

    it( 'should append to the body', inject( function( $rootScope, $compile, $document ) {
      $body = $document.find( 'body' );
      elmBody = angular.element( 
        '<div><span tooltip="tooltip text">Selector Text</span></div>' 
      );

      scope = $rootScope;
      $compile(elmBody)(scope);
      scope.$digest();
      elm = elmBody.find('span');
      elmScope = elm.scope();

      var bodyLength = $body.children().length;
      elm.trigger( 'mouseenter' );
      
      expect( elmScope.tt_isOpen ).toBe( true );
      expect( elmBody.children().length ).toBe( 1 );
      expect( $body.children().length ).toEqual( bodyLength + 1 );
    }));
  });
});

