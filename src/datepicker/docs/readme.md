Our datepicker is flexible and fully customizable.

You can navigate through days, months and years.

It comes in two formats, an inline `uib-datepicker` and an `uib-datepicker-popup` to be embedded in an input.

The datepicker has 3 modes:

* `day` - In this mode you're presented with a 6-week calendar for a specified month.
* `month` - In this mode you can select a month within a selected year.
* `year` - In this mode you are presented with a range of years (20 by default).

### uib-datepicker settings ###

* `custom-class (date, mode)`
  _(Default: `null`)_ -
  An optional expression to add classes based on passing a date and current mode.

* `date-disabled (date, mode)`
  _(Default: `null`)_ -
  An optional expression to disable visible options based on passing a date and current mode.

* `datepicker-mode`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `day`)_ -
  Current mode of the datepicker _(day|month|year)_. Can be used to initialize the datepicker in a specific mode.

* `format-day`
  _(Default: `dd`)_ -
  Format of day in month.

* `format-month`
  _(Default: `MMMM`)_ -
  Format of month in year.

* `format-year`
  _(Default: `yyyy`)_ -
  Format of year in year range.

* `format-day-header`
  _(Default: `EEE`)_ -
  Format of day in week header.

* `format-day-title`
  _(Default: `MMMM yyyy`)_ -
  Format of title when selecting day.

* `format-month-title`
  _(Default: `yyyy`)_ -
  Format of title when selecting month.  

* `init-date`
  _(Default: `null`)_ -
  The initial date view when no model value is specified.

* `max-date`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `null`)_ -
  Defines the maximum available date.

* `max-mode`
  _(Default: `year`)_ -
  Sets an upper limit for mode.

* `min-date`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `null`)_ -
  Defines the minimum available date.

* `min-mode`
  _(Default: `day`)_ -
  Sets a lower limit for mode.

* `ng-model`
  <i class="glyphicon glyphicon-eye-open"></i> -
  The date object. Needs to be a Javascript Date object.

* `shortcut-propagation`
  _(Default: `false`)_ -
  An option to disable the propagation of the keydown event.

* `show-weeks`
  _(Default: `true`)_ -
  Whether to display week numbers.

* `starting-day`
  _(Default: `0`)_ -
  Starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday).

* `template-url`
  _(Default: `uib/template/datepicker/datepicker.html`)_ -
  Add the ability to override the template used on the component.

* `year-range`
  _(Default: `20`)_ -
  Number of years displayed in year selection.

### uib-datepicker-popup settings ###

Options for the uib-datepicker must be passed as JSON using the `datepicker-options` attribute. This list is only for popup settings.

* `clear-text`
  _(Default: `Clear`)_ -
  The text to display for the clear button.

* `close-on-date-selection`
  _(Default: `true`)_ -
  Whether to close calendar when a date is chosen.

* `close-text`
  _(Default: `Done`)_ -
  The text to display for the close button.

* `current-text`
  _(Default: `Today`)_ -
  The text to display for the current day button.

* `datepicker-append-to-body`
  _(Default: `false`)_ -
  Append the datepicker popup element to `body`, rather than inserting after `datepicker-popup`.

* `datepicker-popup-template-url`
  _(Default: `uib/template/datepicker/popup.html`)_ -
  Add the ability to override the template used on the component.

* `datepicker-template-url`
  _(Default: `uib/template/datepicker/datepicker.html`)_ -
  Add the ability to override the template used on the component (inner uib-datepicker).  

* `is-open`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether or not to show the datepicker.

* `on-open-focus`
  _(Default: `true`)_ -
  Whether or not to focus the datepicker popup upon opening.

* `show-button-bar`
  _(Default: `true`)_ -
  Whether or not to display a button bar underneath the uib-datepicker.

* `uib-datepicker-popup`
  _(Default: `yyyy-MM-dd`)_ -
  The format for displayed dates. This string can take string literals by surrounding the value with single quotes, i.e. `yyyy-MM-dd h 'o\'clock'`.

 * `alt-input-formats`
  _(Default: `[]`)_:
  A list of alternate formats acceptable for manual entry.

### Keyboard support ###

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
