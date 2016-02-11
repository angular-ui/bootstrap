A progress bar directive that is focused on providing feedback on the progress of a workflow or action.

It supports multiple (stacked) `<uib-bar>` into the same `<uib-progress>` element or a single `<uib-progressbar>` element with optional `max` attribute and transition animations.

### uib-progressbar settings

* `value`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  The current value of progress completed.

* `type`
  _(Default: `null`)_ -
  Bootstrap style type. Possible values are 'success', 'info', 'warning', and, 'danger' to use Bootstrap's pre-existing styling, or any desired custom suffix.

* `max`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `100`)_ -
  A number that specifies the total value of bars that is required.

* `animate`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Whether bars use transitions to achieve the width change.

* `title`
  _(Default: `progressbar`)_ -
  Title to use as label (for accessibility).
  
### uib-progress settings

* `max`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `100`)_ -
  A number that specifies the total value of bars that is required.

* `animate`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Whether bars use transitions to achieve the width change.

* `title`
  _(Default: `progressbar`)_ -
  Title to use as label (for accessibility).
  
### uib-bar settings

* `value`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  The current value of progress completed.

* `type`
  _(Default: `null`)_ -
  Bootstrap style type. Possible values are 'success', 'info', 'warning', and, 'error' to use Bootstrap's pre-existing styling, or any desired custom suffix.

* `title`
  _(Default: `progressbar`)_ -
  Title to use as label (for accessibility).
