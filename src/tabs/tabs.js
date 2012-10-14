angular.module('ui.bootstrap.tabs', [])
.controller('TabsController', ['$scope', '$element', function($scope, $element) {
  var panes = $scope.panes = [];

  $scope.select = function selectPane(pane) {
    angular.forEach(panes, function(pane) {
      pane.selected = false;
    });
    pane.selected = true;
  };

  this.addPane = function addPane(pane) {
    if (!panes.length) {
      $scope.select(pane);
    }
    panes.push(pane);

    return function removePane() {
      var index = panes.indexOf(pane);
      $scope.panes.splice(index, 1);
      //Select a new pane if removed pane was selected 
      if (pane.selected && panes.length > 0) {
        $scope.select(panes[index < panes.length ? index : index-1]);
      }
    };
  };
}])
.directive('tabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: 'TabsController',
    templateUrl: 'template/tabs/tabs.html',
    replace: true
  };
})
.directive('pane', function() {
  return {
    require: '^tabs',
    restrict: 'E',
    transclude: true,
    scope: { title: '@' },
    link: function(scope, element, attrs, tabsCtrl) {
      scope.$on('$destroy', function() { dump("$on.$destroy"); });
      element.bind('$destroy', function() { dump("$destroy"); });
      scope.$on('$destroy', tabsCtrl.addPane(scope));
    },
    templateUrl: 'template/tabs/pane.html',
    replace: true
  };
});
