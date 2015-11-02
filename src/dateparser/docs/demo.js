angular.module('ui.bootstrap.demo').controller('DateParserDemoCtrl', function ($scope, uibDateParser) {
  $scope.format = 'yyyy/MM/dd';
  $scope.date = new Date();
});
