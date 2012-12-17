angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger) {

    var deferred = $q.defer();
    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
      element.unbind($transition.transitionEndEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    // Only bind if the browser supports transitions
    if ( $transition.transitionEndEventName ) {
      element.bind($transition.transitionEndEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }

      // If the browser doesn't support transitions then we immediately resolve the event
      if ( !$transition.transitionEndEventName ) {
        deferred.resolve(element);
      }
    });

    // Add out custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( $transition.transitionEndEventName ) {
        element.unbind($transition.transitionEndEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
  };
  for (var name in transitionEndEventNames){
    if (transElement.style[name] !== undefined) {
      $transition.transitionEndEventName = transitionEndEventNames[name];
    }
  }
  return $transition;
}]);