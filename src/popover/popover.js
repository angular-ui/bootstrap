/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, and selector delegatation.
 */
angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip'])

.directive('uibPopoverTemplatePopup', function() {
  return {
    replace: true,
    scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/popover/popover-template.html'
  };
})

.directive('uibPopoverTemplate', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverTemplate', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uibPopoverHtmlPopup', function() {
  return {
    replace: true,
    scope: { contentExp: '&', title: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover-html.html'
  };
})

.directive('uibPopoverHtml', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopoverHtml', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uibPopoverPopup', function() {
  return {
    replace: true,
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html'
  };
})

.directive('uibPopover', ['$uibTooltip', function($uibTooltip) {
  return $uibTooltip('uibPopover', 'popover', 'click');
}]);

/* Deprecated popover below */

angular.module('ui.bootstrap.popover')

.value('$popoverSuppressWarning', false)

.directive('popoverTemplatePopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/popover/popover-template.html',
    link: function() {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-template-popup is now deprecated. Use uib-popover-template-popup instead.');
      }
    }
  };
}])

.directive('popoverTemplate', ['$tooltip', function($tooltip) {
  return $tooltip('popoverTemplate', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('popoverHtmlPopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { contentExp: '&', title: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover-html.html',
    link: function() {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-html-popup is now deprecated. Use uib-popover-html-popup instead.');
      }
    }
  };
}])

.directive('popoverHtml', ['$tooltip', function($tooltip) {
  return $tooltip('popoverHtml', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('popoverPopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html',
    link: function() {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-popup is now deprecated. Use uib-popover-popup instead.');
      }
    }
  };
}])

.directive('popover', ['$tooltip', function($tooltip) {

  return $tooltip('popover', 'popover', 'click');
}]);
