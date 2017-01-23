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

* `horizontal`
  <small class="badge">$</small> -
  An optional attribute that permit to collapse horizontally.

### Known Issues

When using the `horizontal` attribute with this directive, CSS can reflow as the collapse element goes from `0px` to its desired end width, which can result in height changes. This can cause animations to not appear to run. The best way around this is to set a fixed height via CSS on the horizontal collapse element so that this situation does not occur, and so the animation can run as expected.
