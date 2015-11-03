describe('$$debounce', function() {
  var $$debounce, $timeout, debouncedFunction, i;

  beforeEach(module('ui.bootstrap.debounce'));
  beforeEach(inject(function(_$$debounce_, _$timeout_) {
    $$debounce = _$$debounce_;
    $timeout = _$timeout_;
    i = 0;
    debouncedFunction = $$debounce(function() {
      i++;
    }, 100);
  }));

  it('should function like a $timeout when called once during timeout', function() {
    debouncedFunction();
    $timeout.flush(50);

    expect(i).toBe(0);

    $timeout.flush(50);

    expect(i).toBe(1);
  });

  it('should only execute 100ms after last call when called twice', function() {
    debouncedFunction();
    $timeout.flush(50);

    expect(i).toBe(0);

    debouncedFunction();
    $timeout.flush(50);

    expect(i).toBe(0);

    $timeout.flush(50);

    expect(i).toBe(1);
  });
});
