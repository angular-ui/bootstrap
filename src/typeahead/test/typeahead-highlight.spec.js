describe('typeaheadHighlight', function () {

  var highlightFilter, $log, $sce, logSpy;

  beforeEach(module('ui.bootstrap.typeahead'));

  beforeEach(inject(function(_$log_, _$sce_) {
    $log = _$log_;
    $sce = _$sce_;
    logSpy = spyOn($log, 'warn');
  }));

  beforeEach(inject(function(typeaheadHighlightFilter) {
    highlightFilter = typeaheadHighlightFilter;
  }));

  it('should higlight a match', function() {
    expect($sce.getTrustedHtml(highlightFilter('before match after', 'match'))).toEqual('before <strong>match</strong> after');
  });

  it('should higlight a match with mixed case', function() {
    expect($sce.getTrustedHtml(highlightFilter('before MaTch after', 'match'))).toEqual('before <strong>MaTch</strong> after');
  });

  it('should higlight all matches', function() {
    expect($sce.getTrustedHtml(highlightFilter('before MaTch after match', 'match'))).toEqual('before <strong>MaTch</strong> after <strong>match</strong>');
  });

  it('should do nothing if no match', function() {
    expect($sce.getTrustedHtml(highlightFilter('before match after', 'nomatch'))).toEqual('before match after');
  });

  it('should do nothing if no or empty query', function() {
    expect($sce.getTrustedHtml(highlightFilter('before match after', ''))).toEqual('before match after');
    expect($sce.getTrustedHtml(highlightFilter('before match after', null))).toEqual('before match after');
    expect($sce.getTrustedHtml(highlightFilter('before match after', undefined))).toEqual('before match after');
  });

  it('issue 316 - should work correctly for regexp reserved words', function() {
    expect($sce.getTrustedHtml(highlightFilter('before (match after', '(match'))).toEqual('before <strong>(match</strong> after');
  });

  it('issue 1777 - should work correctly with numeric values', function() {
    expect($sce.getTrustedHtml(highlightFilter(123, '2'))).toEqual('1<strong>2</strong>3');
  });

  it('should show a warning when this component is being used unsafely', function() {
    highlightFilter('<i>before</i> match after', 'match');
    expect(logSpy).toHaveBeenCalled();
  });
});
