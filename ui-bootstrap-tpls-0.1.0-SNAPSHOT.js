angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.accordion","ui.bootstrap.carousel","ui.bootstrap.dropdownToggle","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tabs","ui.bootstrap.transition"]);

angular.module('ui.bootstrap.accordion', []);
angular.module('ui.bootstrap.accordion').controller('AccordionController', ['$scope', function ($scope) {

  var groups = $scope.groups = [];

  this.select = function(group) {
    angular.forEach(groups, function (group) {
      group.selected = false;
    });
    group.selected = true;
  };

  this.toggle = function(group) {
    if (group.selected) {
      group.selected = false;
    } else {
      this.select(group);
    }
  };

  this.addGroup = function(group) {
    groups.push(group);
    if(group.selected) {
      this.select(group);
    }
  };

  this.removeGroup = function(group) {
    groups.splice(groups.indexOf(group), 1);
  };

}]);

/* accordion: Bootstrap accordion implementation
 * @example
 <accordion>
   <accordion-group title="sth">Static content</accordion-group>
   <accordion-group title="sth">Static content - is it? {{sth}}</accordion-group>
   <accordion-group title="group.title" ng-repeat="group in groups">{{group.content}}</accordion-group>
 </accordion>
 */
angular.module('ui.bootstrap.accordion').directive('accordion', function () {
  return {
    restrict:'E',
    transclude:true,
    scope:{},
    controller:'AccordionController',
    templateUrl:'template/accordion/accordion.html'
  };
});

angular.module('ui.bootstrap.accordion').directive('accordionGroup', function () {
  return {
    require:'^accordion',
    restrict:'E',
    transclude:true,
    scope:{
      heading:'@'
    },
    link: function(scope, element, attrs, accordionCtrl) {

      accordionCtrl.addGroup(scope);

      scope.select = function() {
        accordionCtrl.select(scope);
      };

      scope.toggle = function() {
        accordionCtrl.toggle(scope);
      };

      scope.$on('$destroy', function (event) {
        accordionCtrl.removeGroup(scope);
      });
    },
    templateUrl:'template/accordion/accordion-group.html',
    replace:true
  };
});

/*
*
*    Angular Bootstrap Carousel 
*
*      The carousel has all of the function that the original Bootstrap carousel has, except for animations.
*      
*      For no interval set the interval to non-number
*      Template: <carousel interval="none"><slide active="slide.active">{{anything}}</slide></carousel>
*      To change the carousel from outside the carousel itself add in the current-index attribute
*      Template: <carousel interval="none" current-index="int"><slide active="slide.active">{{anything}}</slide></carousel>
*/
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
.controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
  var slides = $scope.slides = [],
    self = this,
    currentTimeout, currentSlide, isPlaying;
  $scope.currentIndex = -1;

  /* direction: "prev" or "next" */
  self.select = function(index, direction) {
    var nextSlide = slides[index];
    if (nextSlide && index != self.selectedIndex) {
      if ($scope.$currentTransition) {
        $scope.$currentTransition.cancel();
        //Timeout so ng-class in template has time to fix classes for finished slide
        $timeout(goNext);
      } else {
        goNext();
      }
    }
    function goNext() {
      //If we have a slide to transition from and we have a transition type and we're allowed, go
      if (currentSlide && angular.isString(direction) && !$scope.noTransition) { 
        //We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
        nextSlide.$element.addClass(direction);
        nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth; //force reflow
        angular.extend(nextSlide, {direction: direction, sliding: true});
        angular.extend(currentSlide||{}, {direction: direction});

        $scope.$currentTransition = $transition(nextSlide.$element, {});
        //We have to create new pointers inside a closure so next/current don't change
        (function(next,current) {
          $scope.$currentTransition.then(
            function(){ transitionDone(next, current); },
            function(){ transitionDone(next, current); }
          );
        }(nextSlide, currentSlide));
      } else {
        transitionDone(nextSlide, currentSlide);
      }
      currentSlide = nextSlide;
      $scope.currentIndex = self.selectedIndex = index;
      //every time you change slides, reset the timer
      restartTimer();
    }
    function transitionDone(next, current) {
      angular.extend(next, {active: true, sliding: false, direction: null});
      angular.extend(current||{}, {active: false, direction: null});
      $scope.$currentTransition = null;
    }
  };

  $scope.next = function() {
    var newIndex = ($scope.currentIndex + 1) % slides.length;
    return self.select(newIndex, 'next');
  };

  $scope.prev = function() {
    var newIndex = $scope.currentIndex - 1 < 0 ? slides.length - 1 : $scope.currentIndex - 1;
    return self.select(newIndex, 'prev');
  };

  function getInterval() {
    var i = +$scope.interval;
    return (isNaN(i) || i<=0) ? 5000 : i;
  }
  function playCarousel() {
    if (isPlaying) {
      $scope.next();
      restartTimer();
    } else {
      $scope.pause();
    }
  }
  function restartTimer() {
    if (currentTimeout) {
      $timeout.cancel(currentTimeout);
    }
    currentTimeout = $timeout(playCarousel, getInterval());
  }
  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };
  $scope.pause = function() {
    isPlaying = false;
    if (currentTimeout) {
      $timeout.cancel(currentTimeout);
    }
  };

  self.addSlide = function(slide, element) {
    angular.extend(slide, {$element: element});
    slides.push(slide);
    //if this is the first slide or the slide is set to active, select it
    if(slides.length === 1 || slide.active) {
      self.select(slides.length - 1);
      if (slides.length == 1) {
        $scope.play();
      }
    } else {
      slide.active = false;
    }
  };

  self.removeSlide = function(slide) {
    //get the index of the slide inside the carousel
    var index = slides.indexOf(slide);
    slides.splice(index, 1);
    if (slides.length > 0 && slide.active) {
      if (index >= slides.length) {
        self.select(index - 1);
      } else {
        self.select(index);
      }
    }
  };
}])
.directive('carousel', [function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    controller: 'CarouselController',
    require: 'carousel',
    templateUrl: 'template/carousel/carousel.html',
    scope: {
      currentIndex: '=',
      interval: '=',
      noTransition: '=' //This really exists so unit tests can test without transitions
    },
    link: function(scope, elm, attrs, carouselCtrl) {
      scope.$watch('currentIndex', function(idx) {
        //If it's a number and it's not same as current selection, change selection
        if (+idx == idx && idx != carouselCtrl.selectedIndex) {
          var selected = carouselCtrl.selectedIndex;
          carouselCtrl.select(idx, idx > selected ? "next" : "prev");
        }
      });
    }
  };
}])
.directive('slide', [function() {
  return {
    require: '^carousel',
    restrict: 'EA',
    transclude: true,
    replace: true,
    templateUrl: 'template/carousel/slide.html',
    scope: {
      active:'='
    },
    link: function (scope, element, attrs, carouselCtrl) {
      carouselCtrl.addSlide(scope, element);
      //the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function (event) {
        carouselCtrl.removeSlide(scope);
      });
    }
  };
}]);

/*
 * dropdownToggle - Provides dropdown menu functionality in place of bootstrap js
 * @restrict class or attribute
 * @example:
   <li class="dropdown">
     <a class="dropdown-toggle">My Dropdown Menu</a>
     <ul class="dropdown-menu">
       <li ng-repeat="choice in dropChoices">
         <a ng-href="{{choice.href}}">{{choice.text}}</a>
       </li>
     </ul>
   </li>
 */

angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', 
['$document', '$location', '$window', function ($document, $location, $window) {
  var openElement = null, close;
  return {
    restrict: 'CA',
    link: function(scope, element, attrs) {
      scope.$watch(function dropdownTogglePathWatch(){return $location.path();}, function dropdownTogglePathWatchAction() {
        if (close) { close(); }
      });

      element.parent().bind('click', function(event) {
        if (close) { close(); }
      });

      element.bind('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        var iWasOpen = false;

        if (openElement) {
          iWasOpen = openElement === element;
          close();
        }

        if (!iWasOpen){
          element.parent().addClass('open');
          openElement = element;

          close = function (event) {
            if (event) {
              event.preventDefault();
              event.stopPropagation();
            }
            $document.unbind('click', close);
            element.parent().removeClass('open');
            close = null;
            openElement = null;
          };

          $document.bind('click', close);
        }
      });
    }
  };
}]);

angular.module('ui.bootstrap.modal', []).directive('modal', ['$parse',function($parse) {
  var backdropEl;
  var body = angular.element(document.getElementsByTagName('body')[0]);
  var defaultOpts = {
    backdrop: true,
    escape: true
  };
  return {
    restrict: 'EA',
    link: function(scope, elm, attrs) {
      var opts = angular.extend(defaultOpts, scope.$eval(attrs.uiOptions || attrs.bsOptions || attrs.options));
      var shownExpr = attrs.modal || attrs.show;
      var setClosed;

      if (attrs.close) {
        setClosed = function() {
          scope.$apply(attrs.close);
        };
      } else {
        setClosed = function() {
          scope.$apply(function() {
            $parse(shownExpr).assign(scope, false);
          });
        };
      }
      elm.addClass('modal');

      if (opts.backdrop && !backdropEl) {
        backdropEl = angular.element('<div class="modal-backdrop"></div>');
        backdropEl.css('display','none');
        body.append(backdropEl);
      }
      
      function setShown(shown) {
        scope.$apply(function() {
          model.assign(scope, shown);
        });
      }

      function escapeClose(evt) {
        if (evt.which === 27) { setClosed(); }
      }
      function clickClose() { 
        setClosed();
      }
      
      function close() {
        if (opts.escape) { body.unbind('keyup', escapeClose); }
        if (opts.backdrop) {
          backdropEl.css('display', 'none').removeClass('in');
          backdropEl.unbind('click', clickClose);
        }
        elm.css('display', 'none').removeClass('in');
        body.removeClass('modal-open');
      }
      function open() {
        if (opts.escape) { body.bind('keyup', escapeClose); }
        if (opts.backdrop) {
          backdropEl.css('display', 'block').addClass('in');
          backdropEl.bind('click', clickClose);
        }
        elm.css('display', 'block').addClass('in');
        body.addClass('modal-open');
      }

      scope.$watch(shownExpr, function(isShown, oldShown) {
        if (isShown) {
          open();
        } else {
          close();
        }
      });
    }
  };
}]);

angular.module('ui.bootstrap.pagination', [])

.directive('pagination', function() {
  return {
    restrict: 'E',
    scope: {
      numPages: '=',
      currentPage: '=',
      onSelectPage: '&'
    },
    templateUrl: 'template/pagination/pagination.html',
    replace: true,
    link: function(scope) {
      scope.$watch('numPages', function(value) {
        scope.pages = [];
        for(var i=1;i<=value;i++) {
          scope.pages.push(i);
        }
        if ( scope.currentPage > value ) {
          scope.selectPage(value);
        }
      });
      scope.noPrevious = function() {
        return scope.currentPage === 1;
      };
      scope.noNext = function() {
        return scope.currentPage === scope.numPages;
      };
      scope.isActive = function(page) {
        return scope.currentPage === page;
      };

      scope.selectPage = function(page) {
        if ( ! scope.isActive(page) ) {
          scope.currentPage = page;
          scope.onSelectPage({ page: page });
        }
      };

      scope.selectPrevious = function() {
        if ( !scope.noPrevious() ) {
          scope.selectPage(scope.currentPage-1);
        }
      };
      scope.selectNext = function() {
        if ( !scope.noNext() ) {
          scope.selectPage(scope.currentPage+1);
        }
      };
    }
  };
});
angular.module('ui.bootstrap.tabs', [])
.controller('TabsController', ['$scope', '$element', function($scope, $element) {
  var panes = $scope.panes = [];

  $scope.select = function selectPane(pane) {
    angular.forEach(panes, function(pane) {
      pane.selected = false;
    });
    pane.selected = true;
  };

  this.addPane = function addPane(pane) {
    if (!panes.length) {
      $scope.select(pane);
    }
    panes.push(pane);
  };

  this.removePane = function removePane(pane) { 
    var index = panes.indexOf(pane);
    panes.splice(index, 1);
    //Select a new pane if removed pane was selected 
    if (pane.selected && panes.length > 0) {
      $scope.select(panes[index < panes.length ? index : index-1]);
    }
  };
}])
.directive('tabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: 'TabsController',
    templateUrl: 'template/tabs/tabs.html',
    replace: true
  };
})
.directive('pane', function() {
  return {
    require: '^tabs',
    restrict: 'E',
    transclude: true,
    scope:{
      heading:'@'
    },
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);
      scope.$on('$destroy', function() {
        tabsCtrl.removePane(scope);
      });
    },
    templateUrl: 'template/tabs/pane.html',
    replace: true
  };
});

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
angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html","template/accordion/accordion.html","template/carousel/carousel.html","template/carousel/slide.html","template/pagination/pagination.html","template/tabs/pane.html","template/tabs/tabs.html"]);

angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"accordion-group\">" +
    "    <div class=\"accordion-heading\">" +
    "        <a class=\"accordion-toggle\" ng-click=\"toggle()\">{{heading}}</a>" +
    "    </div>" +
    "    <div class=\"accordion-body collapse\" ng-class=\"{in : selected}\">" +
    "        <div class=\"accordion-inner\" ng-transclude></div>" +
    "    </div>" +
    "</div>");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/accordion/accordion.html",
    "<div class=\"accordion\" ng-transclude></div>");
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/carousel/carousel.html",
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\">" +
    "    <div class=\"carousel-inner\" ng-transclude></div>" +
    "    <a ng-click=\"prev()\" class=\"carousel-control left\">&lsaquo;</a>" +
    "    <a ng-click=\"next()\" class=\"carousel-control right\">&rsaquo;</a>" +
    "</div>" +
    "");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/carousel/slide.html",
    "<div ng-class=\"{" +
    "    'active': active, " +
    "    'prev': sliding && direction=='prev'," +
    "    'next': sliding && direction=='next'," +
    "    'right': direction=='prev'," +
    "    'left': direction=='next'" +
    "  }\" class=\"item\" ng-transclude></div>" +
    "");
}]);

angular.module("template/dialog/message.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/dialog/message.html",
    "<div class=\"modal-header\">" +
    "	<h1>{{ title }}</h1>" +
    "</div>" +
    "<div class=\"modal-body\">" +
    "	<p>{{ message }}</p>" +
    "</div>" +
    "<div class=\"modal-footer\">" +
    "	<button ng-repeat=\"btn in buttons\" ng-click=\"close(btn.result)\" class=btn ng-class=\"btn.cssClass\">{{ btn.label }}</button>" +
    "</div>" +
    "");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/pagination/pagination.html",
    "<div class=\"pagination\"><ul>" +
    "  <li ng-class=\"{disabled: noPrevious()}\"><a ng-click=\"selectPrevious()\">Previous</a></li>" +
    "  <li ng-repeat=\"page in pages\" ng-class=\"{active: isActive(page)}\"><a ng-click=\"selectPage(page)\">{{page}}</a></li>" +
    "  <li ng-class=\"{disabled: noNext()}\"><a ng-click=\"selectNext()\">Next</a></li>" +
    "  </ul>" +
    "</div>" +
    "");
}]);

angular.module("template/tabs/pane.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/tabs/pane.html",
    "<div class=\"tab-pane\" ng-class=\"{active: selected}\" ng-show=\"selected\" ng-transclude></div>" +
    "");
}]);

angular.module("template/tabs/tabs.html", []).run(["$templateCache", function($templateCache){
  $templateCache.put("template/tabs/tabs.html",
    "<div class=\"tabbable\">" +
    "  <ul class=\"nav nav-tabs\">" +
    "    <li ng-repeat=\"pane in panes\" ng-class=\"{active:pane.selected}\">" +
    "      <a href=\"\" ng-click=\"select(pane)\">{{pane.heading}}</a>" +
    "    </li>" +
    "  </ul>" +
    "  <div class=\"tab-content\" ng-transclude></div>" +
    "</div>" +
    "");
}]);
