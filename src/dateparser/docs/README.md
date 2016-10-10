The `uibDateParser` is what the `uib-datepicker` uses internally to parse the dates. You can use it standalone by injecting the `uibDateParser` service where you need it.

The public API for the dateParser is a single method called `parse`.

Certain format codes support i18n. Check this [guide](https://docs.angularjs.org/guide/i18n) for more information.

### uibDateParser's parse function

##### parameters

* `input`
  _(Type: `string`, Example: `2004/Sep/4`)_ -
  The input date to parse.

* `format`
  _(Type: `string`, Example: `yyyy/MMM/d`)_ -
  The format we want to use. Check all the supported formats below.

* `baseDate`
  _(Type: `Date`, Example: `new Date()`)_ -
  If you want to parse a date but maintain the timezone, you can pass an existing date here.

##### return

* If the specified input matches the format, a new date with the input will be returned, otherwise, it will return undefined.

### uibDateParser's format codes

* `yyyy`
  _(Example: `2015`)_ -
  Parses a 4 digits year.

* `yy`
  _(Example: `15`)_ -
  Parses a 2 digits year.

* `y`
  _(Example: `15`)_ -
  Parses a year with 1, 2, 3, or 4 digits.

* `MMMM`
  _(Example: `February`, i18n support)_ -
  Parses the full name of a month.

* `MMM`
  _(Example: `Feb`, i18n support)_ -
  Parses the short name of a month.

* `MM`
  _(Example: `12`, Leading 0)_ -
  Parses a numeric month.

* `M`
  _(Example: `3`)_ -
  Parses a numeric month.

* `M!`
  _(Example: `3` or `03`)_ -
  Parses a numeric month, but allowing an optional leading zero

* `LLLL`
  _(Example: `February`, i18n support)_ - Stand-alone month in year (January-December). Requires Angular version 1.5.1 or higher.

* `dd`
  _(Example: `05`, Leading 0)_ -
  Parses a numeric day.

* `d`
  _(Example: `5`)_ -
  Parses a numeric day.

* `d!`
  _(Example: `3` or `03`)_ -
  Parses a numeric day, but allowing an optional leading zero

* `EEEE`
  _(Example: `Sunday`, i18n support)_ -
  Parses the full name of a day.

* `EEE`
  _(Example: `Mon`, i18n support)_ -
  Parses the short name of a day.

* `HH`
  _(Example: `14`, Leading 0)_ -
  Parses a 24 hours time.

* `H`
  _(Example: `3`)_ -
  Parses a 24 hours time.

* `hh`
  _(Example: `11`, Leading 0)_ -
  Parses a 12 hours time.

* `h`
  _(Example: `3`)_ -
  Parses a 12 hours time.

* `mm`
  _(Example: `09`, Leading 0)_ -
  Parses the minutes.

* `m`
  _(Example: `3`)_ -
  Parses the minutes.

* `sss`
  _(Example: `094`, Leading 0)_ -
  Parses the milliseconds.

* `ss`
  _(Example: `08`, Leading 0)_ -
  Parses the seconds.

* `s`
  _(Example: `22`)_ -
  Parses the seconds.

* `a`
  _(Example: `10AM`)_ -
  Parses a 12 hours time with AM/PM.

* `Z`
  _(Example: `-0800`)_ -
  Parses the timezone offset in a signed 4 digit representation

* `ww`
  _(Example: `03`, Leading 0)_ -
  Parses the week number

* `w`
  _(Example: `03`)_ -
  Parses the week number

* `G`, `GG`, `GGG`
  _(Example: `AD`)_ -
  Parses the era (`AD` or `BC`)
* `GGGG`
  _(Example: `Anno Domini`)_ -
  Parses the long form of the era (`Anno Domini` or `Before Christ`)

\* The ones marked with `Leading 0`, needs a leading 0 for values less than 10. Exception being milliseconds which needs it for values under 100.

\** It also supports `fullDate|longDate|medium|mediumDate|mediumTime|short|shortDate|shortTime` as the format for parsing.

\*** It supports template literals as a string between the single quote `'` character, i.e. `'The Date is' MM/DD/YYYY`. If one wants the literal single quote character, one must use `''''`.
