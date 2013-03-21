/**
 * The following features are still outstanding: popup delay, animation as a
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
    animation: true
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
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = [ '$window', '$compile', '$timeout', '$parse', '$document', function ( $window, $compile, $timeout, $parse, $document ) {
    return function $tooltip ( type, defaultTriggerShow, defaultTriggerHide ) {
      var options = angular.extend( {}, defaultOptions, globalOptions );

      var template = 
        '<'+ type +'-popup '+
          'title="{{tt_title}}" '+
          'content="{{tt_content}}" '+
          'placement="{{tt_placement}}" '+
          'animation="tt_animation()" '+
          'is-open="tt_isOpen"'+
          '>'+
        '</'+ type +'-popup>';

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
          var $body;

          attrs.$observe( type, function ( val ) {
            scope.tt_content = val;
          });

          attrs.$observe( type+'Title', function ( val ) {
            scope.tt_title = val;
          });

          attrs.$observe( type+'Placement', function ( val ) {
            scope.tt_placement = angular.isDefined( val ) ? val : options.placement;
          });

          attrs.$observe( type+'Animation', function ( val ) {
            scope.tt_animation = angular.isDefined( val ) ? $parse( val ) : function(){ return options.animation; };
          });

          // By default, the tooltip is not open.
          // TODO add ability to start tooltip opened
          scope.tt_isOpen = false;
          
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
            // toolip be mysteriously removed.
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
                scope.$apply( show );
              } else {
                scope.$apply( hide );
              }
            });
          } else {
            element.bind( defaultTriggerShow, function showTooltipBind() {
              scope.$apply( show );
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
  return $tooltip( 'tooltip', 'mouseenter', 'mouseleave' );
}]);

