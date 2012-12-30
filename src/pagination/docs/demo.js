var PaginationDemoCtrl = function ($scope) {
  $scope.noOfPages = 6;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
};