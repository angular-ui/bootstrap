function CarouselDemoCtrl($scope) {
  $scope.slides = [
    {image: 'http://placekitten.com/325/200',text: 'Kitten.'},
    {image: 'http://placekitten.com/275/200',text: 'Kitty!'},
    {image: 'http://placekitten.com/375/200',text: 'Cat.'},
    {image: 'http://placekitten.com/250/200',text: 'Feline!'}
  ];
  $scope.selectSlide = function(i) {
    $scope.selected = i;
  };
}
