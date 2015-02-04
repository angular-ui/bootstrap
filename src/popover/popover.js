/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
angular.module( 'ui.bootstrap.popover', [ 'ui.bootstrap.tooltip' ] )

.directive( 'popoverWindowPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/popover/popover-window.html'
  };
})

.directive( 'popoverWindow', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'popoverWindow', 'popoverWindow', 'click' );
}])

.directive( 'popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/popover/popover.html'
  };
})

.directive( 'popover', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'popover', 'popover', 'click' );
}]);
