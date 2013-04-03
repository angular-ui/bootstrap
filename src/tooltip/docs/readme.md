A lightweight, extensible directive for fancy tooltip creation. The tooltip
directive supports multiple placements, optional transition animation, and more.

There are two versions of the tooltip: `tooltip` and `tooltip-html-unsafe`. The
former takes text only and will escape any HTML provided. The latter takes
whatever HTML is provided and displays it in a tooltip; it called "unsafe"
because the HTML is not sanitized. *The user is responsible for ensuring the
content is safe to put into the DOM!*

The tooltip directives provide several optional attributes to control how they
will display:

- `tooltip-placement`: Where to place it? Defaults to "top", but also accepts
  "bottom", "left", or "right".
- `tooltip-animation`: Should it fade in and out? Defaults to "true".
- `tooltip-popup-delay`: For how long should the user have to have the mouse
  over the element before the tooltip shows (in milliseconds)? Defaults to 0.

