angular.module('ui.bootstrap.accordion', ['ui.bootstrap.transition']);
angular.module('ui.bootstrap.accordion').controller('AccordionController', ['$scope', function ($scope) {

  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed
  this.closeOthers = function(openGroup) {
    angular.forEach(this.groups, function (group) {
      if ( group !== openGroup ) {
        group.close();
      }
    });
  };
  
  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);
    groupScope.groups = this.groups;
    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(this.groups.indexOf(group), 1);
    }
  };

}]);

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
angular.module('ui.bootstrap.accordion').directive('accordion', function () {
  return {
    restrict:'E',
    controller:'AccordionController',
    link: function(scope, element) {
      element.addClass('accordion');
    }
  };
});

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
angular.module('ui.bootstrap.accordion').directive('accordionGroup', ['$parse', '$transition', '$timeout', function($parse, $transition, $timeout) {
  // We need to find the div that contains the body element of each accordion group so that we can get its height.
  // This is so that the animations work, since height: auto doesn't trigger the CSS animation.
  // Unfortunately jqLite element.find() cannot find by CSS class.
  var findByClass = function(parentElement, cssClass) {
    var element;
    angular.forEach(parentElement.find('div'), function(div) {
      if ( angular.element(div).hasClass(cssClass) ) {
        element = div;
      }
    });
    return angular.element(element);
  };

  // CSS transitions don't work with height: auto, so we have to manually change the height to a specific
  // value and then once the animation completes, we can reset the height to auto.
  // Unfortunately if you do this while the CSS transitions are specified (i.e. in the CSS class "collapse")
  // then you trigger a change to height 0 in between.
  // The fix is to remove the "collapse" CSS class while changing the height back to auto - phew!
  var fixUpHeight = function(scope, bodyElement, height) {
    // We remove the collapse CSS class to prevent a transition when we change to height: auto
    bodyElement.removeClass('collapse');
    bodyElement.css({ height: height });
    // It appears that by reading offsetWidth, the browser realises that we have changed the height already :-/
    var x = bodyElement[0].offsetWidth;
    bodyElement.addClass('collapse');
  };

  return {
    require:'^accordion',         // We need this directive to be inside an accordion
    restrict:'E',                 // It will be an element
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl:'template/accordion/accordion-group.html',
    scope:{ heading:'@' },        // Create an isolated scope and interpolate the heading attribute onto this scope
    link: function(scope, element, attrs, accordionCtrl) {

      var bodyElement = findByClass(element, 'accordion-body');
      var currentTransition;
      var doTransition = function(change) {
        if ( currentTransition ) {
          currentTransition.cancel();
        }
        currentTransition = $transition(bodyElement,change);
        currentTransition.then(function() { currentTransition = undefined; }, function() { currentTransition = undefined; } );
        return currentTransition;
      };

      accordionCtrl.addGroup(scope);
      
      scope.open = function() {
        accordionCtrl.closeOthers(scope);

        doTransition({ height : bodyElement[0].scrollHeight + 'px' })
        .then(function() {
          // This check ensures that we don't accidentally update the height if the user has closed the group
          // while the animation was still running
          if ( scope.isOpen ) {
            fixUpHeight(scope, bodyElement, 'auto');
          }
        });
        scope.isOpen = true;
      };
      
      scope.close = function() {
        if ( scope.isOpen ) {
          scope.isOpen = false;
          fixUpHeight(scope, bodyElement, bodyElement[0].scrollHeight + 'px');

          doTransition({'height':'0'});
        }
      };

      scope.toggle = function() {
        if ( scope.isOpen ) {
          scope.close();
        } else {
          scope.open();
        }
      };

      scope.isOpen = false;
      
      scope.height = function() {
        return bodyElement.css('height');
      };

      var getOpen, setOpen, updateOpen;
      updateOpen = function(value) {
        scope.isOpen = value;
        if ( value ) {
          scope.open();
        } else {
          scope.close();
        }
      };
      
      if ( attrs.isOpen ) {
        getOpen = $parse(attrs.isOpen);
        setOpen = getOpen.assign;
        scope.$watch( function() {
          return getOpen(scope.$parent);
        }, updateOpen);
        scope.$watch('isOpen', function(value) {
          setOpen(scope.$parent, value);
        });
        updateOpen(scope.$eval(attrs.isOpen));
      }
    }
  };
}]);
