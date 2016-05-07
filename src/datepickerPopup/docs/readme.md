The datepicker popup is meant to be used with an input element. To understand usage of the datepicker, please refer to its documentation [here](https://angular-ui.github.io/bootstrap/#/datepicker).

### uib-datepicker-popup settings

The popup is a wrapper that you can use in an input to toggle a datepicker. To configure the datepicker, use `datepicker-options` as documented in the [inline datepicker](https://angular-ui.github.io/bootstrap/#/datepicker).

* `alt-input-formats`
<small class="badge">$</small>
<small class="badge">C</small>
_(Default: `[]`)_ -
A list of alternate formats acceptable for manual entry.

* `clear-text`
<small class="badge">C</small>
_(Default: `Clear`)_ -
The text to display for the clear button.

* `close-on-date-selection`
<small class="badge">$</small>
<small class="badge">C</small>
_(Default: `true`)_ -
Whether to close calendar when a date is chosen.

* `close-text`
<small class="badge">C</small>
_(Default: `Done`)_ -
The text to display for the close button.

* `current-text`
<small class="badge">C</small>
_(Default: `Today`)_ -
The text to display for the current day button.

* `datepicker-append-to-body`
<small class="badge">$</small>
<small class="badge">C</small>
_(Default: `false`, Config: `appendToBody`)_ -
Append the datepicker popup element to `body`, rather than inserting after `datepicker-popup`.

* `datepicker-options`
<small class="badge">$</small> -
An object with any combination of the datepicker settings (in camelCase) used to configure the wrapped datepicker.

* `datepicker-popup-template-url`
<small class="badge">C</small>
_(Default: `uib/template/datepickerPopup/popup.html`)_ -
Add the ability to override the template used on the component.

* `datepicker-template-url`
<small class="badge">C</small>
_(Default: `uib/template/datepicker/datepicker.html`)_ -
Add the ability to override the template used on the component (inner uib-datepicker).

* `is-open`
<small class="badge">$</small>
<i class="glyphicon glyphicon-eye-open"></i>
_(Default: `false`)_ -
Whether or not to show the datepicker.

* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  The date object. Must be a Javascript `Date` object. You may use the `uibDateParser` service to assist in string-to-object conversion.

* `on-open-focus`
<small class="badge">$</small>
<small class="badge">C</small>
_(Default: `true`)_ -
Whether or not to focus the datepicker popup upon opening.

* `show-button-bar`
<small class="badge">$</small>
<small class="badge">C</small>
_(Default: `true`)_ -
Whether or not to display a button bar underneath the uib-datepicker.

* `type`
<small class="badge">C</small>
_(Default: `text`, Config: `html5Types`)_ -
You can override the input type to be _(date|datetime-local|month)_. That will change the date format of the popup.

* `popup-placement`
 <small class="badge">C</small>
 _(Default: `auto bottom-left`, Config: 'placement')_ -
Passing in 'auto' separated by a space before the placement will enable auto positioning, e.g: "auto bottom-left". The popup will attempt to position where it fits in the closest scrollable ancestor. Accepts:

 * `top` - popup on top, horizontally centered on input element.
 * `top-left` - popup on top, left edge aligned with input element left edge.
 * `top-right` - popup on top, right edge aligned with input element right edge.
 * `bottom` - popup on bottom, horizontally centered on input element.
 * `bottom-left` - popup on bottom, left edge aligned with input element left edge.
 * `bottom-right` - popup on bottom, right edge aligned with input element right edge.
 * `left` - popup on left, vertically centered on input element.
 * `left-top` - popup on left, top edge aligned with input element top edge.
 * `left-bottom` - popup on left, bottom edge aligned with input element bottom edge.
 * `right` - popup on right, vertically centered on input element.
 * `right-top` - popup on right, top edge aligned with input element top edge.
 * `right-bottom` - popup on right, bottom edge aligned with input element bottom edge.

* `uib-datepicker-popup`
<small class="badge">C</small>
_(Default: `yyyy-MM-dd`, Config: `datepickerConfig`)_ -
The format for displayed dates. This string can take string literals by surrounding the value with single quotes, i.e. `yyyy-MM-dd h 'o\'clock'`.

**Notes**

If using this directive on input type date, a native browser datepicker could also appear.
