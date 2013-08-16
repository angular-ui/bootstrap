
angular.module('bootstrapDemoApp', ['ui.bootstrap', 'plunker']);

function MainCtrl($scope, $http, $document, orderByFilter) {
  var url = "http://50.116.42.77:3001";
  $scope.selectedModules = [];
  //iFrame for downloading
  var $iframe = angular.element('<iframe>').css('display','none');
  $document.find('body').append($iframe);

  $scope.showBuildModal = function() {
    $scope.buildModalShown = true;
    //Load modules if they aren't loaded yet
    if (!$scope.modules) {
      $http.get(url + "/api/bootstrap").then(function(response) {
        $scope.modules = response.data.modules;
      }, function() {
        $scope.buildGetErrorText = "Error retrieving build files from server.";
      });
    }
  };

  $scope.downloadBuild = function() {
    var downloadUrl = url + "/api/bootstrap/download?";
    angular.forEach($scope.selectedModules, function(module) {
      downloadUrl += "modules=" + module + "&";
    });
    $iframe.attr('src','');
    $iframe.attr('src', downloadUrl);
    $scope.buildModalShown = false;
  };

  $scope.selectedChanged = function(module, selected) {
    if (selected) {
      $scope.selectedModules.push(module);
    } else {
      $scope.selectedModules.splice($scope.selectedModules.indexOf(module), 1);
    }
  };
}
