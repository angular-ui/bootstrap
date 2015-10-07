describe('Security concerns', function() {
  var highlightFilter, $sanitize, logSpy;

  beforeEach(module('ui.bootstrap.typeahead', 'ngSanitize'));

  beforeEach(inject(function (uibTypeaheadHighlightFilter, _$sanitize_, $log) {
    highlightFilter = uibTypeaheadHighlightFilter;
    $sanitize = _$sanitize_;
    logSpy = spyOn($log, 'warn');
  }));

  it('should not call the $log service when ngSanitize is present', function() {
    highlightFilter('before <script src="">match</script> after', 'match');
    expect(logSpy).not.toHaveBeenCalled();
  });
});
