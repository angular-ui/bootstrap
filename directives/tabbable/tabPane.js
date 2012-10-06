angular.module('ui.bootstrap').directive('bsTabPane', [function() {
  return {
    require: '^bsTabbable',
    restrict: 'ECA',
    link: function(scope, element, attrs, tabsCtrl) {
      element.addClass('bs-tab-pane');
      element.bind('$remove', tabsCtrl.addPane(element, attrs));
    }
  };
}]);
