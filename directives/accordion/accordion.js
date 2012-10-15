angular.module('ui.bootstrap.accordion', []);
angular.module('ui.bootstrap.accordion').controller('AccordionController', ['$scope', function ($scope) {

  var groups = $scope.groups = [];

  this.select = function (group) {
    angular.forEach(groups, function (group) {
      group.selected = false;
    });
    group.selected = true;
  };

  this.addGroup = function (group) {
    groups.push(group);
  };

  this.removeGroup = function (group) {
    groups.splice(groups.indexOf(group), 1);
  };
}]);

/* bs-tabbable: Bootstrap accordion implementation
 * @example
 <accordion>
   <accordion-group title="sth">Static content</accordion-group>
   <accordion-group title="sth">Static content - is it? {{sth}}</accordion-group>
   <accordion-group title="group.title" ng-repeat="group in groups">{{group.content}}</accordion-group>
 </accordion>
 ...
 scope.curTab = "first"; //sets first tab to selected
 scope.curTab = t[0].id; //sets first tab in repeater to selected
 */

angular.module('ui.bootstrap.accordion').directive('accordion', function () {
  return {
    restrict:'E',
    transclude:true,
    scope:{},
    controller:'AccordionController',
    templateUrl:'template/accordion/accordion.html'
  };
});

angular.module('ui.bootstrap.accordion').directive('accordionGroup', function () {
  return {
    require:'^accordion',
    restrict:'E',
    transclude:true,
    scope:{
      title:'=',
      selected:'@'
    },
    link:function (scope, element, attrs, accordionCtrl) {

      accordionCtrl.addGroup(scope);
      scope.select = function () {
        accordionCtrl.select(scope);
      };

      scope.$on('$destroy', function (event) {
        accordionCtrl.removeGroup(scope);
      });
    },
    templateUrl:'template/accordion/accordion-group.html',
    replace:true
  };
});
