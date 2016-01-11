A lightweight & configurable timepicker directive.

### uib-timepicker settings

* `arrowkeys`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Whether user can use up/down arrow keys inside the hours & minutes input to increase or decrease its values.

* `hour-step`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `1`)_ -
  Number of hours to increase or decrease when using a button.
  
* `max`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `undefined`)_ -
  Maximum time a user can select.

* `meridians`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `null`)_ -
  Meridian labels based on locale. To override you must supply an array like `['AM', 'PM']`.

* `min`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `undefined`)_ -
  Minimum time a user can select

* `minute-step`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `1`)_ -
  Number of minutes to increase or decrease when using a button.
  
* `mousewheel`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Whether user can scroll inside the hours & minutes input to increase or decrease its values.

* `ng-disabled`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether or not to disable the component.

* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  Date object that provides the time state.

* `readonly-input`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `false`)_ -
  Whether user can type inside the hours & minutes input.

* `second-step`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `1`)_ -
  Number of seconds to increase or decrease when using a button.

* `show-meridian`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `true`)_ -
  Whether to display 12H or 24H mode.

* `show-seconds`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Show seconds input.

* `show-spinners`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Show spinner arrows above and below the inputs.

* `tabindex`
  _(Defaults: `0`)_ -
  Sets tabindex for each control in the timepicker.

* `template-url`
  <small class="badge">C</small>
  _(Defaults: `uib/template/timepicker/timepicker.html`)_ -
  Add the ability to override the template used on the component.
