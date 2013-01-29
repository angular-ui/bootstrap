angular.module("ui.bootstrap.alert", []).directive('alert', function () {
  return {
    restrict:'EA',
    templateUrl:'template/alert/alert.html',
    transclude:true,
    replace:true,
    scope:{
      type:'=',
      close:'&'
    },
    link:function (scope, element, attrs) {
      scope.dismiss = function () {
        scope.close();
      };
    }
  };
});