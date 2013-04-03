A lightweight, extensible directive for fancy popover creation. The popover
directive supports multiple placements, optional transition animation, and more.

Like the Twitter Bootstrap jQuery plugin, the popover **requires** the tooltip
module.

The popover directives provides several optional attributes to control how it
will display:

- `popover-title`: A string to display as a fancy title.
- `popover-placement`: Where to place it? Defaults to "top", but also accepts
  "bottom", "left", or "right".
- `popover-animation`: Should it fade in and out? Defaults to "true".
- `popover-popup-delay`: For how long should the user have to have the mouse
  over the element before the popover shows (in milliseconds)? Defaults to 0.

