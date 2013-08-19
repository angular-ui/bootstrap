Rating directive that will take care of visualising a star rating bar.

### Settings ###

#### `<rating>` ####

 * `value` <i class="icon-eye-open"></i>
 	:
 	The current rate.

 * `max`
 	_(Defaults: 5)_ :
 	Changes the number of icons.

 * `readonly`
 	_(Defaults: false)_ :
 	Prevent user's interaction.

 * `on-hover(value)`
 	:
 	An optional expression called when user's mouse is over a particular icon.

 * `on-leave()`
 	:
 	An optional expression called when user's mouse leaves the control altogether.

 * `state-on`
 	_(Defaults: 'icon-star')_ :
 	A variable used in default template to specify the class for selected icons.

 * `state-off`
 	_(Defaults: 'icon-star-empty')_ :
 	A variable used in default template to specify the class for unselected icons.

 * `rating-states`
 	_(Defaults: null)_ :
 	An array of objects defining properties for all icons. In default template, `stateOn` & `stateOff` property is used to specify the icon's class.
