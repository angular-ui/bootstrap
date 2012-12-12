angular.module('ui.bootstrap.transition', [])

.factory('$transition', ['$q', function($q) {

  var $transition = function(element, trigger) {
    if ( !$transition.transitionEndEventName ) {
      return;
    }
    var deferred = $q.defer();
    var transitionEndHandler = function(event) {
      element.unbind($transition.transitionEndEventName, transitionEndHandler);
      deferred.resolve(element);
    };
    element.bind($transition.transitionEndEventName, transitionEndHandler);
    if ( angular.isString(trigger) ) {
      element.addClass(trigger);
    } else if ( angular.isFunction(trigger) ) {
      trigger(element);
    } else if ( angular.isObject(trigger) ) {
      element.css(trigger);
    }
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