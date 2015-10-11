A lightweight & configurable timepicker directive.

### Settings ###

All settings can be provided as attributes in the `<uib-timepicker>` or globally configured through the `uibTimepickerConfig`.

 * `ng-model` <i class="glyphicon glyphicon-eye-open"></i>
 	:
 	The Date object that provides the time state.

  * `template-url` (Defaults: `template/timepicker/timepicker.html`) :
    Add the ability to override the template used on the component.

 * `hour-step` <i class="glyphicon glyphicon-eye-open"></i>
 	_(Defaults: 1)_ :
 	 Number of hours to increase or decrease when using a button.

 * `minute-step` <i class="glyphicon glyphicon-eye-open"></i>
 	_(Defaults: 1)_ :
 	 Number of minutes to increase or decrease when using a button.

 * `show-meridian` <i class="glyphicon glyphicon-eye-open"></i>
 	_(Defaults: true)_ :
 	Whether to display 12H or 24H mode.

 * `meridians`
 	_(Defaults: null)_ :
 	 Meridian labels based on locale. To override you must supply an array like ['AM', 'PM'].

 * `readonly-input`
 	_(Defaults: false)_ :
 	 Whether user can type inside the hours & minutes input.

 * `mousewheel`
    _(Defaults: true)_ :
     Whether user can scroll inside the hours & minutes input to increase or decrease it's values.

 * `arrowkeys`
    _(Defaults: true)_ :
     Whether user can use up/down arrowkeys inside the hours & minutes input to increase or decrease it's values.

 * `show-spinners`
    _(Defaults: true)_ :
     Shows spinner arrows above and below the inputs

 * `min`
    _(Defaults: undefined)_ :
     Minimum time a user can select

 * `max`
    _(Defaults: undefined)_ :
     Maximum time a user can select

 * `tabindex`
    _(Defaults: 0)_ :
     Sets tabindex for each control in timepicker