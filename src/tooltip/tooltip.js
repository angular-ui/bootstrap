/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module( 'ui.bootstrap.tooltip', [] )

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider( '$tooltip', function () {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    animation: true,
    popupDelay: 0
  };

  // The options specified to the provider globally.
  var globalOptions = {};
  
  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
	this.options = function( value ) {
		angular.extend( globalOptions, value );
	};

  /**
   * This is a helper function for translating camel-case to snake-case.
   */
  function snake_case(name){
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  /**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = [ '$window', '$compile', '$timeout', '$parse', '$document', function ( $window, $compile, $timeout, $parse, $document ) {
    return function $tooltip ( type, prefix, defaultTriggerShow, defaultTriggerHide ) {
      var options = angular.extend( {}, defaultOptions, globalOptions );
      var directiveName = snake_case( type );

      var template = 
        '<'+ directiveName +'-popup '+
          'title="{{tt_title}}" '+
          'content="{{tt_content}}" '+
          'placement="{{tt_placement}}" '+
          'animation="tt_animation()" '+
          'is-open="tt_isOpen"'+
          '>'+
        '</'+ directiveName +'-popup>';

      // Calculate the current position and size of the directive element.
      function getPosition( element ) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: element.prop( 'offsetWidth' ),
          height: element.prop( 'offsetHeight' ),
          top: boundingClientRect.top + $window.pageYOffset,
          left: boundingClientRect.left + $window.pageXOffset
        };
      }
          
      return {
        restrict: 'EA',
        scope: true,
        link: function link ( scope, element, attrs ) {
          var tooltip = $compile( template )( scope );
          var transitionTimeout;
          var popupTimeout;
          var $body;

          attrs.$observe( type, function ( val ) {
            scope.tt_content = val;
          });

          attrs.$observe( prefix+'Title', function ( val ) {
            scope.tt_title = val;
          });

          attrs.$observe( prefix+'Placement', function ( val ) {
            scope.tt_placement = angular.isDefined( val ) ? val : options.placement;
          });

          attrs.$observe( prefix+'Animation', function ( val ) {
            scope.tt_animation = angular.isDefined( val ) ? $parse( val ) : function(){ return options.animation; };
          });

          attrs.$observe( prefix+'PopupDelay', function ( val ) {
            var delay = parseInt( val, 10 );
            scope.tt_popupDelay = ! isNaN(delay) ? delay : options.popupDelay;
          });

          // By default, the tooltip is not open.
          // TODO add ability to start tooltip opened
          scope.tt_isOpen = false;

          //show the tooltip with delay if specified, otherwise show it immediately
          function showWithDelay() {
            if( scope.tt_popupDelay ){
              popupTimeout = $timeout( show, scope.tt_popupDelay );
            }else {
              scope.$apply( show );
            }
          }
          
          // Show the tooltip popup element.
          function show() {
            var position,
                ttWidth,
                ttHeight,
                ttPosition;

            // Don't show empty tooltips.
            if ( ! scope.tt_content ) {
              return;
            }

            // If there is a pending remove transition, we must cancel it, lest the
            // tooltip be mysteriously removed.
            if ( transitionTimeout ) {
              $timeout.cancel( transitionTimeout );
            }
            
            // Set the initial positioning.
            tooltip.css({ top: 0, left: 0, display: 'block' });
            
            // Now we add it to the DOM because need some info about it. But it's not 
            // visible yet anyway.
            if ( options.appendToBody ) {
                $body = $body || $document.find( 'body' );
                $body.append( tooltip );
            } else {
              element.after( tooltip );
            }
            
            // Get the position of the directive element.
            position = getPosition( element );

            // Get the height and width of the tooltip so we can center it.
            ttWidth = tooltip.prop( 'offsetWidth' );
            ttHeight = tooltip.prop( 'offsetHeight' );
            
            // Calculate the tooltip's top and left coordinates to center it with
            // this directive.
            switch ( scope.tt_placement ) {
              case 'right':
                ttPosition = {
                  top: (position.top + position.height / 2 - ttHeight / 2) + 'px',
                  left: (position.left + position.width) + 'px'
                };
                break;
              case 'bottom':
                ttPosition = {
                  top: (position.top + position.height) + 'px',
                  left: (position.left + position.width / 2 - ttWidth / 2) + 'px'
                };
                break;
              case 'left':
                ttPosition = {
                  top: (position.top + position.height / 2 - ttHeight / 2) + 'px',
                  left: (position.left - ttWidth) + 'px'
                };
                break;
              default:
                ttPosition = {
                  top: (position.top - ttHeight) + 'px',
                  left: (position.left + position.width / 2 - ttWidth / 2) + 'px'
                };
                break;
            }
            
            // Now set the calculated positioning.
            tooltip.css( ttPosition );
              
            // And show the tooltip.
            scope.tt_isOpen = true;
          }
          
          // Hide the tooltip popup element.
          function hide() {
            // First things first: we don't show it anymore.
            //tooltip.removeClass( 'in' );
            scope.tt_isOpen = false;

            //if tooltip is going to be shown after delay, we must cancel this
            $timeout.cancel( popupTimeout );
            
            // And now we remove it from the DOM. However, if we have animation, we 
            // need to wait for it to expire beforehand.
            // FIXME: this is a placeholder for a port of the transitions library.
            if ( angular.isDefined( scope.tt_animation ) && scope.tt_animation() ) {
              transitionTimeout = $timeout( function () { tooltip.remove(); }, 500 );
            } else {
              tooltip.remove();
            }
          }

          // Register the event listeners. If only one event listener was
          // supplied, we use the same event listener for showing and hiding.
          // TODO add ability to customize event triggers
          if ( ! angular.isDefined( defaultTriggerHide ) ) {
            element.bind( defaultTriggerShow, function toggleTooltipBind () {
              if ( ! scope.tt_isOpen ) {
                showWithDelay();
              } else {
                scope.$apply( hide );
              }
            });
          } else {
            element.bind( defaultTriggerShow, function showTooltipBind() {
              showWithDelay();
            });
            element.bind( defaultTriggerHide, function hideTooltipBind() {
              scope.$apply( hide );
            });
          }
        }
      };
    };
  }];
})

.directive( 'tooltipPopup', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-popup.html'
  };
})

.directive( 'tooltip', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'tooltip', 'tooltip', 'mouseenter', 'mouseleave' );
}])

.directive( 'tooltipHtmlUnsafePopup', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
  };
})

.directive( 'tooltipHtmlUnsafe', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter', 'mouseleave' );
}])

;

