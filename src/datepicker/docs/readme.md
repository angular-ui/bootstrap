Our datepicker is flexible and fully customizable.

You can navigate through days, months and years.

The datepicker has 3 modes:

* `day` - In this mode you're presented with a 6-week calendar for a specified month.
* `month` - In this mode you can select a month within a selected year.
* `year` - In this mode you are presented with a range of years (20 by default).

### uib-datepicker settings

* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  The date object. Must be a Javascript `Date` object. You may use the `uibDateParser` service to assist in string-to-object conversion.

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

  * `customClass ({date: date, mode: mode})` -
    An optional expression to add classes based on passing an object with date and current mode properties.

  * `dateDisabled ({date: date, mode: mode})` -
    An optional expression to disable visible options based on passing an object with date and current mode properties.

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
    Defines the maximum available date. Requires a Javascript Date object.

  * `maxMode`
    <small class="badge">C</small>
      <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `year`)_ -
    Sets an upper limit for mode.

  * `minDate`
    <small class="badge">C</small>
    <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `null`)_ -
    Defines the minimum available date. Requires a Javascript Date object.

  * `minMode`
    <small class="badge">C</small>
    <i class="glyphicon glyphicon-eye-open"></i>
    _(Default: `day`)_ -
    Sets a lower limit for mode.

  * `monthColumns`
    <small class="badge">C</small>
    _(Default: `3`)_ -
    Number of columns displayed in month selection.
    
  * `ngModelOptions`
    <small class="badge">C</small>
    _(Default: `null`)_ -
    Sets `ngModelOptions` for datepicker. This can be overridden through attribute usage

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
