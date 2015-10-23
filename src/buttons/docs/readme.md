With the buttons directive, we can make a group of buttons behave like a set of checkboxes (`uib-btn-checkbox`) or behave like a set of radio buttons (`uib-btn-radio`).

### uib-btn-checkbox settings

* `ng-model` -
  Model where we set the checkbox status. By default `true` or `false`.
  
* `btn-checkbox-true`
  _(Default: `true`)_ -
  Sets the value for the checked status.

* `btn-checkbox-false`
  _(Default: `false`)_ -
  Sets the value for the unchecked status.

### uib-btn-radio settings

* `uib-btn-radio` -
  Value to assign to the `ng-model` if we check this radio button.

* `ng-model` -
  Model where we set the radio status. All radio buttons in a group should use the same `ng-model`.
  
* `uncheckable`
  _(Boolean attribute)_ -
  Whether a radio button can be unchecked or not.
  
### Default settings `uibButtonConfig`

* `activeClass`
  _(Default: `active`)_ -
  Class to apply to the checked buttons.
  
* `toggleEvent`
  _(Default: `click`)_ -
  Event used to toggle the buttons.
