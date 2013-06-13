var RatingDemoCtrl = function ($scope) {
  $scope.rate = 7;
  $scope.isReadonly = false;
  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
  };
};
