beforeEach(function () {
  this.addMatchers({
    toBeHidden: function () {
      var element = angular.element(this.actual);
      return element.hasClass('ng-hide') ||
        element.css('display') == 'none';
    }
  });
});