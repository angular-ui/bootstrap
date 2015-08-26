angular.module('ui.bootstrap.alert', [])

.controller('AlertController', ['$scope', '$attrs', function($scope, $attrs) {
  $scope.closeable = !!$attrs.close;
  this.close = $scope.close;
}])

.directive('alert', function() {
  return {
    controller: 'AlertController',
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
})

.directive('dismissOnTimeout', ['$timeout', function($timeout) {
  return {
    require: 'alert',
    link: function(scope, element, attrs, alertCtrl) {
      $timeout(function() {
        alertCtrl.close();
      }, parseInt(attrs.dismissOnTimeout, 10));
    }
  };
}]);
