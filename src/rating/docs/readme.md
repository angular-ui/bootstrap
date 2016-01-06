Rating directive that will take care of visualising a star rating bar.

### uib-rating settings

* `max`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `5`)_ -
  Changes the number of icons.

* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  The current rate.

* `on-hover(value)`
  <small class="badge">$</small> -
  An optional expression called when user's mouse is over a particular icon.

* `on-leave()`
  <small class="badge">$</small> -
  An optional expression called when user's mouse leaves the control altogether.

* `rating-states`
  <small class="badge">$</small>
  _(Default: `null`)_ -
  An array of objects defining properties for all icons. In default template, `stateOn` & `stateOff` property is used to specify the icon's class.

* `readonly`
  <small class="badge">$</small>
  <i class="icon-eye-open"></i>
  _(Default: `false`)_ -
  Prevent user's interaction.

* `titles`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: ['one', 'two', 'three', 'four', 'five']`)_ -
  An array of strings defining titles for all icons.

* `state-off`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `null`)_ -
  A variable used in the template to specify the state for unselected icons.

* `state-on`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `null`)_ -
 	A variable used in the template to specify the state (class, src, etc) for selected icons.
