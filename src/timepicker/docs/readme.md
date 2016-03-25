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

* `pad-hours`
  <small class="badge">$</small>
  _(Default: true)_ -
  Whether the hours column is padded with a 0.

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

**Notes**

This component makes no claims of absolutely supporting the preservation of dates in all cases, and it is highly recommended that model tracking of dates is encapsulated in a different object. This component should not be used with the same model as the datepicker. This is due to edge cases with situations such as Daylight Savings timezone changes which require a modification of the date in order to prevent an impossible to increment or decrement situation. See [#5485](https://github.com/angular-ui/bootstrap/issues/5485) for details.

If the model value is updated (i.e. via `Date.prototype.setDate`), you must update the model value by breaking the reference by `modelValue = new Date(modelValue)` in order to have the timepicker update.
