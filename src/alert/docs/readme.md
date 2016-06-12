This directive can be used both to generate alerts from static and dynamic model data (using the `ng-repeat` directive).

### uib-alert settings

* `close()`
  <small class="badge">$</small> -
  A callback function that gets fired when an `alert` is closed. If the attribute exists, a close button is displayed as well.

* `dismiss-on-timeout`
  _(Default: `none`)_ -
  Takes the number of milliseconds that specify the timeout duration, after which the alert will be closed. This attribute requires the presence of the `close` attribute.

* `template-url`
  _(Default: `uib/template/alert/alert.html`)_ -
  Add the ability to override the template used in the component.
