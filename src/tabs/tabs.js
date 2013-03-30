angular.module('ui.bootstrap.tabs', [])

.directive('tabs', function() {
  return function() {
    throw new Error("The `tabs` directive is deprecated, please migrate to `tabset`. Instructions can be found at http://github.com/angular-ui/bootstrap/tree/master/CHANGELOG.md");
  };
})

.controller('TabsetController', ['$scope', '$element', 
function TabsetCtrl($scope, $element) {
  var ctrl = this,
    tabs = ctrl.tabs = $scope.tabs = [];

  ctrl.select = function(tab) {
    angular.forEach(tabs, function(tab) {
      tab.active = false;
    });  
    tab.active = true;
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    if (tabs.length == 1) {
      ctrl.select(tab);
    }
  };

  ctrl.removeTab = function removeTab(tab) { 
    var index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected
    if (tab.active && tabs.length > 1) {
      //If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };
}])

.directive('tabset', function() {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    controller: 'TabsetController',
    templateUrl: 'template/tabs/tabset.html'
  };
})

.directive('tab', ['$parse', '$http', '$templateCache', '$compile',
function($parse, $http, $templateCache, $compile) {
  return {
    require: '^tabset',
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/tabs/tab.html',
    transclude: true,
    scope: {
      heading: '@',
      onSelect: '&select' //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, tabsetCtrl) {
        var getActive, setActive;
        scope.active = false; // default value
        if (attrs.active) {
          getActive = $parse(attrs.active);
          setActive = getActive.assign;
          scope.$parent.$watch(getActive, function updateActive(value) {
            scope.active = !!value;
          });
        } else {
          setActive = getActive = angular.noop;
        }

        scope.$watch('active', function(active) {
          setActive(scope.$parent, active);
          if (active) {
            tabsetCtrl.select(scope);
            scope.onSelect();
          }
        });

        scope.select = function() {
          scope.active = true;
        };

        tabsetCtrl.addTab(scope);
        scope.$on('$destroy', function() {
          tabsetCtrl.removeTab(scope);
        });
        //If the tabset sets this tab to active, set the parent scope's active
        //binding too.  We do this so the watch for the parent's initial active
        //value won't overwrite what is initially set by the tabset
        if (scope.active) {
          setActive(scope.$parent, true);
        } 

        //Transclude the collection of sibling elements. Use forEach to find
        //the heading if it exists. We don't use a directive for tab-heading
        //because it is problematic. Discussion @ http://git.io/MSNPwQ
        transclude(scope.$parent, function(clone) {
          //Look at every element in the clone collection. If it's tab-heading,
          //mark it as that.  If it's not tab-heading, mark it as tab contents
          var contents = [], heading;
          angular.forEach(clone, function(el) {
            //See if it's a tab-heading attr or element directive
            //First make sure it's a normal element, one that has a tagName
            if (el.tagName &&
                (el.hasAttribute("tab-heading") || 
                 el.hasAttribute("data-tab-heading") ||
                 el.tagName.toLowerCase() == "tab-heading" ||
                 el.tagName.toLowerCase() == "data-tab-heading"
                )) {
              heading = el;
            } else {
              contents.push(el);
            }
          });
          //Share what we found on the scope, so our tabHeadingTransclude and
          //tabContentTransclude directives can find out what the heading and
          //contents are.
          if (heading) { 
            scope.headingElement = angular.element(heading);
          }
          scope.contentElement = angular.element(contents);
        });
      };
    }
  };
}])

.directive('tabHeadingTransclude', [function() {
  return {
    restrict: 'A',
    require: '^tab', 
    link: function(scope, elm, attrs, tabCtrl) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
}])

.directive('tabContentTransclude', ['$parse', function($parse) {
  return {
    restrict: 'A',
    require: '^tabset',
    link: function(scope, elm, attrs, tabsetCtrl) {
      scope.$watch($parse(attrs.tabContentTransclude), function(tab) {
        elm.html('');
        if (tab) {
          elm.append(tab.contentElement);
        }
      });
    }
  };
}])

;

