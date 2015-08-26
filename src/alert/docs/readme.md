This directive can be used both to generate alerts from static and dynamic model data (using the `ng-repeat` directive).

### Alert settings

  * `close` (Defaults: none):
    A callback function that gets fired when an `alert` is closed. If the attribute exists, a close button is displayed as well.
  * `dismiss-on-timeout` (Defaults: none)(Optional):
    Takes the number of milliseconds that specify the timeout duration, after which the alert will be closed. This attribute requires the presence of the `close` attribute.
  * `template-url` (Defaults: `template/alert/alert.html`):
    Add the ability to override the template used in the component.
  * `type` (Defaults: `warning`):
    Defines the type of the alert. Go to [bootstrap page](http://getbootstrap.com/components/#alerts) to see the type of alerts available.
