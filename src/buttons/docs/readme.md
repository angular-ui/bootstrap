With the buttons directive, we can make a group of buttons behave like a set of checkboxes (`uib-btn-checkbox`) or behave like a set of radio buttons (`uib-btn-radio`).

### uib-btn-checkbox settings

* `btn-checkbox-false`
  _(Default: `false`)_ -
  Sets the value for the unchecked status.
  
* `btn-checkbox-true`
  _(Default: `true`)_ -
  Sets the value for the checked status.
  
* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  Model where we set the checkbox status. By default `true` or `false`.

### uib-btn-radio settings

* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  Model where we set the radio status. All radio buttons in a group should use the same `ng-model`.
    
* `uib-btn-radio` -
  <small class="badge">$</small>
  Value to assign to the `ng-model` if we check this radio button.

* `uib-uncheckable`
  <small class="badge">$</small>
  _(Default: `null`)_ -
  An expression that evaluates to a truthy or falsy value that determines whether the `uncheckable` attribute is present.
  
* `uncheckable`
  <small class="badge">B</small> -
  Whether a radio button can be unchecked or not.
  
### Additional settings `uibButtonConfig`

* `activeClass`
  _(Default: `active`)_ -
  Class to apply to the checked buttons.
  
* `toggleEvent`
  _(Default: `click`)_ -
  Event used to toggle the buttons.
