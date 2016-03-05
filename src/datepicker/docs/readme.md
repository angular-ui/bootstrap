Our datepicker is flexible and fully customizable.

You can navigate through days, months and years.

It comes in two formats, an inline `uib-datepicker` and an `uib-datepicker-popup` to be embedded in an input.

The datepicker has 3 modes:

* `day` - In this mode you're presented with a 6-week calendar for a specified month.
* `month` - In this mode you can select a month within a selected year.
* `year` - In this mode you are presented with a range of years (20 by default).

### uib-datepicker settings

* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  The date object. Needs to be a Javascript Date object.

* `ng-model-options`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `{}`)_ -
  Supported [angular ngModelOptions](https://docs.angularjs.org/api/ng/directive/ngModelOptions):
  * allowInvalid
  * timezone
  
* `template-url`
  _(Default: `uib/template/datepicker/datepicker.html`)_ -
  Add the ability to override the template used on the component.
  
Apart from the previous settings, to configure the uib-datepicker you need to create an object in Javascript with all the options and use it on the `datepicker-options` attribute:

* `datepicker-options`
  <small class="badge">$</small> -
  An object to configure the datepicker in one place.

  * `customClass (date, mode)` -
    An optional expression to add classes based on passing a date and current mode.
  
  * `dateDisabled (date, mode)` -
    An optional expression to disable visible options based on passing a date and current mode.
  
  * `datepickerMode`
    <small class="badge">C</small>
    <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `day`)_ -
    Current mode of the datepicker _(day|month|year)_. Can be used to initialize the datepicker in a specific mode.
  
  * `formatDay`
    <small class="badge">C</small>
    _(Default: `dd`)_ -
    Format of day in month.
  
  * `formatMonth`
    <small class="badge">C</small>
    _(Default: `MMMM`)_ -
    Format of month in year.
  
  * `formatYear`
    <small class="badge">C</small>
    _(Default: `yyyy`)_ -
    Format of year in year range.
  
  * `formatDayHeader`
    <small class="badge">C</small>
    _(Default: `EEE`)_ -
    Format of day in week header.
  
  * `formatDayTitle`
    <small class="badge">C</small>
    _(Default: `MMMM yyyy`)_ -
    Format of title when selecting day.
  
  * `formatMonthTitle`
    <small class="badge">C</small>
    _(Default: `yyyy`)_ -
    Format of title when selecting month.
  
  * `initDate`
    <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `null`)_ -
    The initial date view when no model value is specified.
  
  * `maxDate`
    <small class="badge">C</small>
    <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `null`)_ -
    Defines the maximum available date.
  
  * `maxMode`
    <small class="badge">C</small>
      <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `year`)_ -
    Sets an upper limit for mode.
  
  * `minDate`
    <small class="badge">C</small>
    <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `null`)_ -
    Defines the minimum available date.
  
  * `minMode`
    <small class="badge">C</small>
    <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `day`)_ -
    Sets a lower limit for mode.
  
  * `shortcutPropagation`
    <small class="badge">C</small>
    _(Default: `false`)_ -
    An option to disable the propagation of the keydown event.
  
  * `showWeeks`
    <small class="badge">C</small>
    _(Default: `true`)_ -
    Whether to display week numbers.
  
  * `startingDay`
    <small class="badge">C</small>
    *(Default: `$locale.DATETIME_FORMATS.FIRSTDAYOFWEEK`)* -
    Starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday).

  * `yearRows`
    <small class="badge">C</small>
    _(Default: `4`)_ -
    Number of rows displayed in year selection.
  
  * `yearColumns`
    <small class="badge">C</small>
    _(Default: `5`)_ -
  Number of columns displayed in year selection.

### uib-datepicker-popup settings

The popup is a wrapper that you can use in an input to toggle a datepicker. To configure the datepicker, use `datepicker-options`.

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
  _(Default: `uib/template/datepicker/popup.html`)_ -
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

### Keyboard support

Depending on datepicker's current mode, the date may refer either to day, month or year. Accordingly, the term view refers either to a month, year or year range.

 * `Left`: Move focus to the previous date. Will move to the last date of the previous view, if the current date is the first date of a view.
 * `Right`: Move focus to the next date. Will move to the first date of the following view, if the current date is the last date of a view.
 * `Up`: Move focus to the same column of the previous row. Will wrap to the appropriate row in the previous view.
 * `Down`: Move focus to the same column of the following row. Will wrap to the appropriate row in the following view.
 * `PgUp`: Move focus to the same date of the previous view. If that date does not exist, focus is placed on the last date of the month.
 * `PgDn`: Move focus to the same date of the following view. If that date does not exist, focus is placed on the last date of the month.
 * `Home`: Move to the first date of the view.
 * `End`: Move to the last date of the view.
 * `Enter`/`Space`: Select date.
 * `Ctrl`+`Up`: Move to an upper mode.
 * `Ctrl`+`Down`: Move to a lower mode.
 * `Esc`: Will close popup, and move focus to the input.

**Notes**

If the date a user enters falls outside of the min-/max-date range, a `dateDisabled` validation error will show on the form.

If using this directive on input type date, a native browser datepicker could also appear.
