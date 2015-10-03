A progress bar directive that is focused on providing feedback on the progress of a workflow or action.

It supports multiple (stacked) bars into the same `<uib-progress>` element or a single `<progressbar>` element with optional `max` attribute and transition animations.

### Settings ###

#### `<uib-progressbar>` ####

 * `value` <i class="glyphicon glyphicon-eye-open"></i>
 	:
 	The current value of progress completed.

 * `type`
 	_(Default: null)_ :
 	Style type. Possible values are 'success', 'warning' etc.

 * `max`
 	_(Default: 100)_ :
 	A number that specifies the total value of bars that is required.

 * `animate`
 	_(Default: true)_ :
 	Whether bars use transitions to achieve the width change.

 * `title`
  _(Default: progressbar)_ :
  Title to use as label (for accessibility)

### Stacked ###

Place multiple `<uib-bar>`s into the same `<uib-progress>` element to stack them.
`<uib-progress>` supports `max`, `animate`, and `title` &  `<uib-bar>` supports  `value`, `title`, and `type` attributes.
