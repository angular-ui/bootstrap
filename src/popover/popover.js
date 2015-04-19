/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
angular.module( 'ui.bootstrap.popover', [ 'ui.bootstrap.tooltip' ] )

.directive( 'popoverTemplatePopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/popover/popover-template.html'
  };
})

.directive( 'popoverTemplate', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'popoverTemplate', 'popover', 'click', {
    useContentExp: true
  } );
}])

.directive( 'popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html'
  };
})

.directive( 'popover', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'popover', 'popover', 'click' );
}]);
