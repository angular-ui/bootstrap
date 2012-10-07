angular.module('ui.bootstrap').directive('bsModal', ['$parse',function($parse) {
  var backdropEl;
  var defaultOpts = {
    backdrop: true,
    escape: true
  };
  return {
    restrict: 'ECA',
    link: function(scope, elm, attrs) {
      var opts = angular.extend(defaultOpts, scope.$eval(attrs.uiOptions || attrs.bsOptions || attrs.options));
      var shownAttr = attrs.bsModal || attrs.ngModel || attrs.ngShow || attrs.uiShow;
      var model = $parse(shownAttr);
      elm.addClass('modal');

      if (opts.backdrop && !backdropEl) {
        backdropEl = angular.element('<div class="modal-backdrop"></div>');
        backdropEl.css('display','none');
        angular.element(document.getElementsByTagName('body')[0]).append(backdropEl);
      }
      
      function setShown(shown) {
        scope.$apply(function() {
          model.assign(scope, shown);
        });
      }

      function escapeClose(evt) {
        if (evt.which === 27) { setShown(false); }
      }
      function clickClose() { 
        setShown(false); 
      }
      
      function close() {
        if (opts.escape) { body.unbind('keyup', escapeClose); console.log('escp'); }
        if (opts.backdrop) {
          backdropEl.css('display', 'none');
          backdropEl.unbind('click', clickClose);
        }
        elm.css('display', 'none');
      }
      function open() {
        if (opts.escape) { body.bind('keyup', escapeClose); }
        if (opts.backdrop) {
          backdropEl.css('display', 'block');
          backdropEl.bind('click', clickClose);
        }
        elm.css('display', 'block');
      }

      scope.$watch(shownAttr, function(isShown, oldShown) {
        if (isShown !== oldShown) {
          if (isShown) {
            open();
          } else {
            close();
          }
        }
      });
    }
  };
}]);
