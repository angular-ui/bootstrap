angular.module('ui.bootstrap.demo').controller('PositionDemoCtrl', function ($scope, $window, $uibPosition) {

    $scope.elemVals = {};
    $scope.parentScrollable = true;
    $scope.parentRelative = true;

    $scope.getValues = function() {
      var divEl = $window.document.querySelector('#posdemodiv');
      var btnEl = $window.document.querySelector('#posdemobtn');

      var offsetParent = $uibPosition.offsetParent(divEl);
      $scope.elemVals.offsetParent = 'type: ' + offsetParent.tagName + ', id: ' + offsetParent.id;

      var scrollParent = $uibPosition.scrollParent(divEl);
      $scope.elemVals.scrollParent = 'type: ' + scrollParent.tagName + ', id: ' + scrollParent.id;

      $scope.scrollbarWidth = $uibPosition.scrollbarWidth();

      $scope.elemVals.position = $uibPosition.position(divEl);

      $scope.elemVals.offset = $uibPosition.offset(divEl);

      $scope.elemVals.viewportOffset = $uibPosition.viewportOffset(divEl);

      $scope.elemVals.positionElements = $uibPosition.positionElements(btnEl, divEl, 'auto bottom-left');
    };
});