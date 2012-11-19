angular.module("ui.bootstrap.alert", []).directive('alert', function() {
  return {
    restrict: 'E', 
    templateUrl: 'template/alert/alert.html', 
    transclude: true,
    scope: {
      type: '=', 
      close: '&'
    },
    link: function(scope, element, attrs) {

      scope.alertClass = scope.type ? 'alert-' + scope.type : 'alert-info';

      scope.dismiss = function() {
        scope.close();  
      };
    }
  };
});

