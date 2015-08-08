/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module( 'ui.bootstrap.tooltip', [ 'ui.bootstrap.position', 'ui.bootstrap.bindHtml' ] )

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider( '$tooltip', function () {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    animation: true,
    popupDelay: 0,
    useContentExp: false
  };

  // Default hide triggers for each show trigger
  var triggerMap = {
    'mouseenter': 'mouseleave',
    'click': 'click',
    'focus': 'blur'
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
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
   */
  this.setTriggers = function setTriggers ( triggers ) {
    angular.extend( triggerMap, triggers );
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
  this.$get = [ '$window', '$compile', '$timeout', '$document', '$position', '$interpolate', '$rootScope', function ( $window, $compile, $timeout, $document, $position, $interpolate, $rootScope ) {
    return function $tooltip ( type, prefix, defaultTriggerShow, options ) {
      options = angular.extend( {}, defaultOptions, globalOptions, options );

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      function getTriggers ( trigger ) {
        var show = (trigger || options.trigger || defaultTriggerShow).split(' ');
        var hide = show.map(function(trigger) {
          return triggerMap[trigger] || trigger;
        });
        return {
          show: show,
          hide: hide
        };
      }

      var directiveName = snake_case( type );

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      var template =
        '<div '+ directiveName +'-popup '+
          'title="'+startSym+'title'+endSym+'" '+
          (options.useContentExp ?
            'content-exp="contentExp()" ' :
            'content="'+startSym+'content'+endSym+'" ') +
          'placement="'+startSym+'placement'+endSym+'" '+
          'popup-class="'+startSym+'popupClass'+endSym+'" '+
          'animation="animation" '+
          'is-open="isOpen"'+
          'origin-scope="origScope" '+
          '>'+
        '</div>';

      return {
        restrict: 'EA',
        compile: function (tElem, tAttrs) {
          var tooltipLinker = $compile( template );

          return function link ( scope, element, attrs, tooltipCtrl ) {
            var tooltip;
            var tooltipLinkedScope;
            var transitionTimeout;
            var popupTimeout;
            var appendToBody = angular.isDefined( options.appendToBody ) ? options.appendToBody : false;
            var triggers = getTriggers( undefined );
            var hasEnableExp = angular.isDefined(attrs[prefix+'Enable']);
            var ttScope = scope.$new(true);
            var repositionScheduled = false;

            var positionTooltip = function () {
              if (!tooltip) { return; }

              var ttPosition = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
              ttPosition.top += 'px';
              ttPosition.left += 'px';

              // Now set the calculated positioning.
              tooltip.css( ttPosition );
            };

            var positionTooltipAsync = function () {
              $timeout(positionTooltip, 0, false);
            };

            // Set up the correct scope to allow transclusion later
            ttScope.origScope = scope;

            // By default, the tooltip is not open.
            // TODO add ability to start tooltip opened
            ttScope.isOpen = false;

            function toggleTooltipBind () {
              if ( ! ttScope.isOpen ) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }

            // Show the tooltip with delay if specified, otherwise show it immediately
            function showTooltipBind() {
              if(hasEnableExp && !scope.$eval(attrs[prefix+'Enable'])) {
                return;
              }

              prepareTooltip();

              if ( ttScope.popupDelay ) {
                // Do nothing if the tooltip was already scheduled to pop-up.
                // This happens if show is triggered multiple times before any hide is triggered.
                if (!popupTimeout) {
                  popupTimeout = $timeout( show, ttScope.popupDelay, false );
                  popupTimeout.then(function(reposition){reposition();});
                }
              } else {
                show()();
              }
            }

            function hideTooltipBind () {
              hide();
              if (!$rootScope.$$phase) {
                $rootScope.$digest();
              }
            }

            // Show the tooltip popup element.
            function show() {

              popupTimeout = null;

              // If there is a pending remove transition, we must cancel it, lest the
              // tooltip be mysteriously removed.
              if ( transitionTimeout ) {
                $timeout.cancel( transitionTimeout );
                transitionTimeout = null;
              }

              // Don't show empty tooltips.
              if ( !(options.useContentExp ? ttScope.contentExp() : ttScope.content) ) {
                return angular.noop;
              }

              createTooltip();

              // Set the initial positioning.
              tooltip.css({ top: 0, left: 0, display: 'block' });

              positionTooltip();

              // And show the tooltip.
              ttScope.isOpen = true;
              ttScope.$apply(); // digest required as $apply is not called

              // Return positioning function as promise callback for correct
              // positioning after draw.
              return positionTooltip;
            }

            // Hide the tooltip popup element.
            function hide() {
              // First things first: we don't show it anymore.
              ttScope.isOpen = false;

              //if tooltip is going to be shown after delay, we must cancel this
              $timeout.cancel( popupTimeout );
              popupTimeout = null;

              // And now we remove it from the DOM. However, if we have animation, we
              // need to wait for it to expire beforehand.
              // FIXME: this is a placeholder for a port of the transitions library.
              if ( ttScope.animation ) {
                if (!transitionTimeout) {
                  transitionTimeout = $timeout(removeTooltip, 500);
                }
              } else {
                removeTooltip();
              }
            }

            function createTooltip() {
              // There can only be one tooltip element per directive shown at once.
              if (tooltip) {
                removeTooltip();
              }
              tooltipLinkedScope = ttScope.$new();
              tooltip = tooltipLinker(tooltipLinkedScope, function (tooltip) {
                if ( appendToBody ) {
                  $document.find( 'body' ).append( tooltip );
                } else {
                  element.after( tooltip );
                }
              });

              if (options.useContentExp) {
                tooltipLinkedScope.$watch('contentExp()', function (val) {
                  if (!val && ttScope.isOpen) {
                    hide();
                  }
                });
                
                tooltipLinkedScope.$watch(function() {
                  if (!repositionScheduled) {
                    repositionScheduled = true;
                    tooltipLinkedScope.$$postDigest(function() {
                      repositionScheduled = false;
                      positionTooltipAsync();
                    });
                  }
                });
                
              }
            }

            function removeTooltip() {
              transitionTimeout = null;
              if (tooltip) {
                tooltip.remove();
                tooltip = null;
              }
              if (tooltipLinkedScope) {
                tooltipLinkedScope.$destroy();
                tooltipLinkedScope = null;
              }
            }

            function prepareTooltip() {
              prepPopupClass();
              prepPlacement();
              prepPopupDelay();
            }

            ttScope.contentExp = function () {
              return scope.$eval(attrs[type]);
            };

            /**
             * Observe the relevant attributes.
             */
            if (!options.useContentExp) {
              attrs.$observe( type, function ( val ) {
                ttScope.content = val;

                if (!val && ttScope.isOpen) {
                  hide();
                } else {
                  positionTooltipAsync();
                }
              });
            }

            attrs.$observe( 'disabled', function ( val ) {
              if (popupTimeout && val) {
                $timeout.cancel(popupTimeout);
              }

              if (val && ttScope.isOpen ) {
                hide();
              }
            });

            attrs.$observe( prefix+'Title', function ( val ) {
              ttScope.title = val;
              positionTooltipAsync();
            });

            attrs.$observe( prefix + 'Placement', function () {
              if (ttScope.isOpen) {
                $timeout(function () {
                  prepPlacement();
                  show()();
                }, 0, false);
              }
            });

            function prepPopupClass() {
              ttScope.popupClass = attrs[prefix + 'Class'];
            }

            function prepPlacement() {
              var val = attrs[ prefix + 'Placement' ];
              ttScope.placement = angular.isDefined( val ) ? val : options.placement;
            }

            function prepPopupDelay() {
              var val = attrs[ prefix + 'PopupDelay' ];
              var delay = parseInt( val, 10 );
              ttScope.popupDelay = ! isNaN(delay) ? delay : options.popupDelay;
            }

            var unregisterTriggers = function () {
              triggers.show.forEach(function(trigger) {
                element.unbind(trigger, showTooltipBind);
              });
              triggers.hide.forEach(function(trigger) {
                element.unbind(trigger, hideTooltipBind);
              });
            };

            function prepTriggers() {
              var val = attrs[ prefix + 'Trigger' ];
              unregisterTriggers();

              triggers = getTriggers( val );

              triggers.show.forEach(function(trigger, idx) {
                if (trigger === triggers.hide[idx]) {
                  element.bind(trigger, toggleTooltipBind);
                } else if (trigger) {
                  element.bind(trigger, showTooltipBind);
                  element.bind(triggers.hide[idx], hideTooltipBind);
                }
              });
            }
            prepTriggers();

            var animation = scope.$eval(attrs[prefix + 'Animation']);
            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

            var appendToBodyVal = scope.$eval(attrs[prefix + 'AppendToBody']);
            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

            // if a tooltip is attached to <body> we need to remove it on
            // location change as its parent scope will probably not be destroyed
            // by the change.
            if ( appendToBody ) {
              scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess () {
              if ( ttScope.isOpen ) {
                hide();
              }
            });
            }

            // Make sure tooltip is destroyed and removed.
            scope.$on('$destroy', function onDestroyTooltip() {
              $timeout.cancel( transitionTimeout );
              $timeout.cancel( popupTimeout );
              unregisterTriggers();
              removeTooltip();
              ttScope = null;
            });
          };
        }
      };
    };
  }];
})

// This is mostly ngInclude code but with a custom scope
.directive( 'tooltipTemplateTransclude', [
         '$animate', '$sce', '$compile', '$templateRequest',
function ($animate ,  $sce ,  $compile ,  $templateRequest) {
  return {
    link: function ( scope, elem, attrs ) {
      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      var changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      var cleanupLastIncludeContent = function() {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }
        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }
        if (currentElement) {
          $animate.leave(currentElement).then(function() {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.tooltipTemplateTransclude), function (src) {
        var thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function(response) {
            if (thisChangeId !== changeCounter) { return; }
            var newScope = origScope.$new();
            var template = response;

            var clone = $compile(template)(newScope, function(clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function() {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    }
  };
}])

/**
 * Note that it's intentional that these classes are *not* applied through $animate.
 * They must not be animated as they're expected to be present on the tooltip on
 * initialization.
 */
.directive('tooltipClasses', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      if (scope.placement) {
        element.addClass(scope.placement);
      }
      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }
      if (scope.animation()) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    }
  };
})

.directive( 'tooltipPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-popup.html'
  };
})

.directive( 'tooltip', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'tooltip', 'tooltip', 'mouseenter' );
}])

.directive( 'tooltipTemplatePopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/tooltip/tooltip-template-popup.html'
  };
})

.directive( 'tooltipTemplate', [ '$tooltip', function ( $tooltip ) {
  return $tooltip('tooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

.directive( 'tooltipHtmlPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-popup.html'
  };
})

.directive( 'tooltipHtml', [ '$tooltip', function ( $tooltip ) {
  return $tooltip('tooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

/*
Deprecated
*/
.directive( 'tooltipHtmlUnsafePopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
  };
})

.value('tooltipHtmlUnsafeSuppressDeprecated', false)
.directive( 'tooltipHtmlUnsafe', [
          '$tooltip', 'tooltipHtmlUnsafeSuppressDeprecated', '$log',
function ( $tooltip ,  tooltipHtmlUnsafeSuppressDeprecated ,  $log) {
  if (!tooltipHtmlUnsafeSuppressDeprecated) {
    $log.warn('tooltip-html-unsafe is now deprecated. Use tooltip-html or tooltip-template instead.');
  }
  return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter' );
}]);
