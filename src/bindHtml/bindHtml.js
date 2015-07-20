angular.module('ui.bootstrap.bindHtml', [])

  .value('$bindHtmlUnsafeSuppressDeprecated', false)

  .directive('bindHtmlUnsafe', ['$log', '$bindHtmlUnsafeSuppressDeprecated', function ($log, $bindHtmlUnsafeSuppressDeprecated) {
    return function (scope, element, attr) {
      if (!$bindHtmlUnsafeSuppressDeprecated) {
        $log.warn('bindHtmlUnsafe is now deprecated. Use ngBindHtml instead');
      }
      element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
      scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
        element.html(value || '');
      });
    };
  }]);