function CarouselDemoCtrl($scope) {
  var slides = $scope.slides = [
    {image: 'http://placekitten.com/325/200',text: 'Kitten.'},
    {image: 'http://placekitten.com/275/200',text: 'Kitty!'},
    {image: 'http://placekitten.com/375/200',text: 'Cat.'},
    {image: 'http://placekitten.com/250/200',text: 'Feline!'}
  ];
  $scope.selectSlide = function(i) {
    $scope.selected = i;
  };
  $scope.addSlide = function() {
    slides.push({
      image: 'http://placekitten.com/'+(200+20*slides.length)+'/200',
      text: ['More','Extra','Additional','Surplus'][Math.floor(Math.random()*4)] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cute Things'][Math.floor(Math.random()*4)]
    });
  };
}
