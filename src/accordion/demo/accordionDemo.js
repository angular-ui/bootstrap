function AccordionDemoCtrl($scope) {
  $scope.staticTitle = "Static Title";

  $scope.groups = [
    { title: "Dynamic Title 1", content: "Dynamic content 1" }, 
    { title: "Dynamic Title 2", content: "Dynamic content 2" }
  ];
}