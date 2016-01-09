Dropdown is a simple directive which will toggle a dropdown menu on click or programmatically.

This directive is composed by three parts:

* `uib-dropdown` which transforms a node into a dropdown.
* `uib-dropdown-toggle` which allows the dropdown to be toggled via click. This directive is optional.
* `uib-dropdown-menu` which transforms a node into the popup menu.

Each of these parts need to be used as attribute directives.

### uib-dropdown settings

* `auto-close`
  _(Default: `always`)_ -
  Controls the behavior of the menu when clicked.
  * `always` - Automatically closes the dropdown when any of its elements is clicked.
  * `disabled` - Disables the auto close. You can control it manually with `is-open`. It still gets closed if the toggle is clicked, `esc` is pressed or another dropdown is open. It also won't be closed on `$locationchangeSuccess`.
  * `outsideClick` - Closes the dropdown automatically only when the user clicks any element outside the dropdown.

* `dropdown-append-to`
  <small class="badge">$</small>
  _(Default: `null`)_ -
  Appends the inner dropdown-menu to an arbitrary DOM element.

* `dropdown-append-to-body`
  <small class="badge">B</small>
  _(Default: `false`)_ -
  Appends the inner dropdown-menu to the body element.

* `is-open`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Defines whether or not the dropdown-menu is open. The `uib-dropdown-toggle` will toggle this attribute on click.

* `keyboard-nav`:
  <small class="badge">B</small>
  _(Default: `false`)_ -
  Enables navigation of dropdown list elements with the arrow keys.

### uib-dropdown-menu settings

* `template-url`
  _(Default: `none`)_ -
  You may specify a template for the dropdown menu. Check the demos for an example.

### Additional settings `uibDropdownConfig`

* `appendToOpenClass`
  _(Default: `uib-dropdown-open`)_ -
  Class to apply when the dropdown is open and appended to a different DOM element.

* `openClass`
  _(Default: `open`)_ -
  Class to apply when the dropdown is open.

### Known issues

For usage with ngTouch, it is recommended to use the programmatic `is-open` trigger with ng-click - this is due to ngTouch decorating ng-click to prevent propagation of the event.
