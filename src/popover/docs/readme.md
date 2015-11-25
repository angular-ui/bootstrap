A lightweight, extensible directive for fancy popover creation. The popover
directive supports multiple placements, optional transition animation, and more.

Like the Bootstrap jQuery plugin, the popover **requires** the tooltip
module.

There are two versions of the popover: `uib-popover` and `uib-popover-template`:

- `uib-popover` takes text only and will escape any HTML provided for the popover
  body.
- `uib-popover-html` takes an expression that evaluates to an html string. *The user is responsible for ensuring the
  content is safe to put into the DOM!*
- `uib-popover-template` a URL representing the location of a template to
  use for the popover body. Note that the contents of this template need to be
  wrapped in a tag, e.g., `<div></div>`.

The popover directives provides several optional attributes to control how it
will display:

- `popover-title`: A string to display as a fancy title.
- `popover-placement`: Where to place it? Defaults to "top". Passing in 'auto' seperated by a space before the placement will
  enable auto positioning, e.g: "auto bottom-left". The popover will attempt to position where it fits in
  the closest scrollable ancestor. Accepts:

   - "top" - popover on top, horizontally centered on host element.
   - "top-left" - popover on top, left edge aligned with host element left edge.
   - "top-right" - popover on top, right edge aligned with host element right edge.
   - "bottom" - popover on bottom, horizontally centered on host element.
   - "bottom-left" - popover on bottom, left edge aligned with host element left edge.
   - "bottom-right" - popover on bottom, right edge aligned with host element right edge.
   - "left" - popover on left, vertically centered on host element.
   - "left-top" - popover on left, top edge aligned with host element top edge.
   - "left-bottom" - popover on left, bottom edge aligned with host element bottom edge.
   - "right" - popover on right, vertically centered on host element.
   - "right-top" - popover on right, top edge aligned with host element top edge.
   - "right-bottom" - popover on right, bottom edge aligned with host element bottom edge.
- `popover-animation`: Should it fade in and out? Defaults to "true".
- `popover-popup-delay`: For how long should the user have to have the mouse
  over the element before the popover shows (in milliseconds)? Defaults to 0.
- `popover-popup-close-delay`: For how long should the popover remain open
  after the close trigger event? Defaults to 0.
- `popover-trigger`: What should trigger the show of the popover? See the
  `tooltip` directive for supported values.
- `popover-append-to-body`_(Default: false)_: Should the popover be appended to `$body` instead of
  the parent element?  Note that the presence of this attribute without a value implies `true`.
- `popover-is-open` <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: false)_:
  Whether to show the popover.

The popover directives require the `$position` service.

The popover directive also supports various default configurations through the
$tooltipProvider. See the [tooltip](#tooltip) section for more information.

**Known issues**

For Safari 7+ support, if you want to use **focus** `popover-trigger`, you need to use an anchor tag with a tab index. For example:

```
<a tabindex="0" uib-popover="Test" popover-trigger="focus" class="btn btn-default">
  Click Me
</a>
```
