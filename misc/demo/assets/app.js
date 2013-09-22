angular.module('bootstrapDemoApp', ['ui.bootstrap', 'plunker'], function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

function MainCtrl($scope, $http, $document, $modal, orderByFilter) {
  var url = "http://50.116.42.77:3001";
  //iFrame for downloading
  var $iframe = angular.element('<iframe>').css('display','none');
  $document.find('body').append($iframe);

  $scope.showBuildModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'buildModal.html',
      controller: 'SelectModulesCtrl',
      resolve: {
        modules: function() {
          return $http.get(url + "/api/bootstrap").then(function(response) {
            return response.data.modules;
          });
        }
      }
    });

    modalInstance.result.then(function(selectedModules) {
      var downloadUrl = url + "/api/bootstrap/download?";
      angular.forEach(selectedModules, function(module) {
        downloadUrl += "modules=" + module + "&";
      });
      $iframe.attr('src','');
      $iframe.attr('src', downloadUrl);
    });
  };
}

var SelectModulesCtrl = function($scope, $modalInstance, modules) {

  $scope.selectedModules = [];
  $scope.modules = modules;

  $scope.selectedChanged = function(module, selected) {
    if (selected) {
      $scope.selectedModules.push(module);
    } else {
      $scope.selectedModules.splice($scope.selectedModules.indexOf(module), 1);
    }
  };

  $scope.downloadBuild = function () {
    $modalInstance.close($scope.selectedModules);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
};