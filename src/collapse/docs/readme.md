**uib-collapse** provides a simple way to hide and show an element with a css transition

### uib-collapse settings

* `collapsed()`
  <small class="badge">$</small> -
  An optional expression called after the element finished collapsing.

* `collapsing()`
  <small class="badge">$</small> -
  An optional expression called before the element begins collapsing.
  If the expression returns a promise, animation won't start until the promise resolves.
  If the returned promise is rejected, collapsing will be cancelled.

* `expanded()`
  <small class="badge">$</small> -
  An optional expression called after the element finished expanding.

* `expanding()`
  <small class="badge">$</small> -
  An optional expression called before the element begins expanding.
  If the expression returns a promise, animation won't start until the promise resolves.
  If the returned promise is rejected, expanding will be cancelled.

* `uib-collapse`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether the element should be collapsed or not.

