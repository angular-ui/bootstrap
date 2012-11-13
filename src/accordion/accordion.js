angular.module('ui.bootstrap.accordion', []);
angular.module('ui.bootstrap.accordion').controller('AccordionController', ['$scope', function ($scope) {

  var groups = $scope.groups = [];

  this.select = function(group) {
    angular.forEach(groups, function (group) {
      group.selected = false;
    });
    group.selected = true;
  };

  this.toggle = function(group) {
    if (group.selected) {
      group.selected = false;
    } else {
      this.select(group);
    }
  };

  this.addGroup = function(group) {
    groups.push(group);
    if(group.selected) {
      this.select(group);
    }
  };

  this.removeGroup = function(group) {
    groups.splice(groups.indexOf(group), 1);
  };

}]);

/* accordion: Bootstrap accordion implementation
 * @example
 <accordion>
   <accordion-group title="sth">Static content</accordion-group>
   <accordion-group title="sth">Static content - is it? {{sth}}</accordion-group>
   <accordion-group title="group.title" ng-repeat="group in groups">{{group.content}}</accordion-group>
 </accordion>
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
      title:'='
    },
    link: function(scope, element, attrs, accordionCtrl) {

      accordionCtrl.addGroup(scope);

      scope.select = function() {
        accordionCtrl.select(scope);
      };

      scope.toggle = function() {
        accordionCtrl.toggle(scope);
      };

      scope.$on('$destroy', function (event) {
        accordionCtrl.removeGroup(scope);
      });
    },
    templateUrl:'template/accordion/accordion-group.html',
    replace:true
  };
});
