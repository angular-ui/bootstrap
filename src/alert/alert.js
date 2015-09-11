angular.module('ui.bootstrap.alert', [])

.controller('UibAlertController', ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
  $scope.closeable = !!$attrs.close;

  if (angular.isDefined($attrs.dismissOnTimeout)) {
    $timeout(function() {
      $scope.close();
    }, parseInt($attrs.dismissOnTimeout, 10));
  }
}])

.directive('uibAlert', function() {
  return {
    controller: 'UibAlertController',
    controllerAs: 'alert',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/alert/alert.html';
    },
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      close: '&'
    }
  };
});

/* Deprecated alert below */

angular.module('ui.bootstrap.alert')

  .value('$alertSuppressWarning', false)

  .directive('alert', ['$log', '$alertSuppressWarning', function($log, $alertSuppressWarning) {
    return {
      controller: 'UibAlertController',
      controllerAs: 'alert',
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'template/alert/alert.html';
      },
      transclude: true,
      replace: true,
      scope: {
        type: '@',
        close: '&'
      },
      link: function() {
        if (!$alertSuppressWarning) {
          $log.warn('alert is now deprecated. Use uib-alert instead.');
        }
      }
    };
  }]);
