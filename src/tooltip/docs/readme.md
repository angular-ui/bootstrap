A lightweight, extensible directive for fancy tooltip creation. The tooltip
directive supports multiple placements, optional transition animation, and more.

There are three versions of the tooltip: `uib-tooltip`, `uib-tooltip-template`, and
`uib-tooltip-html-unsafe`:

- `uib-tooltip` takes text only and will escape any HTML provided.
- `uib-tooltip-template` takes text that specifies the location of a template to
  use for the tooltip. Note that this needs to be wrapped in a tag.
- `uib-tooltip-html` takes
  whatever HTML is provided and displays it in a tooltip; *The user is responsible for ensuring the
  content is safe to put into the DOM!*
- `uib-tooltip-html-unsafe` -- deprecated in favour of `tooltip-html`

The tooltip directives provide several optional attributes to control how they
will display:

- `tooltip-placement`: Where to place it? Defaults to "top", but also accepts
  "bottom", "left", "right".
- `tooltip-animation`: Should it fade in and out? Defaults to "true".
- `tooltip-popup-delay`: For how long should the user have to have the mouse
  over the element before the tooltip shows (in milliseconds)? Defaults to 0.
- `tooltip-close-popup-delay`: For how long should the tooltip remain open
  after the close trigger event? Defaults to 0.
- `tooltip-trigger`: What should trigger a show of the tooltip? Supports a space separated list of event names.
  Note: this attribute is no longer observable. See `tooltip-enable`.
- `tooltip-enable`: Is it enabled? It will enable or disable the configured
  `tooltip-trigger`.
- `tooltip-append-to-body`: Should the tooltip be appended to `$body` instead of
  the parent element?
- `tooltip-class`: Custom class to be applied to the tooltip.
- `tooltip-is-open` <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: false)_:
  Whether to show the tooltip.

The tooltip directives require the `$position` service.

**Triggers**

The following show triggers are supported out of the box, along with their
provided hide triggers:

- `mouseenter`: `mouseleave`
- `click`: `click`
- `focus`: `blur`
- `none`: ``

For any non-supported value, the trigger will be used to both show and hide the
tooltip. Using the 'none' trigger will disable the internal trigger(s), one can
then use the `tooltip-is-open` attribute exclusively to show and hide the tooltip.

**$uibTooltipProvider**

Through the `$uibTooltipProvider`, you can change the way tooltips and popovers
behave by default; the attributes above always take precedence. The following
methods are available:

- `setTriggers(obj)`: Extends the default trigger mappings mentioned above
  with mappings of your own. E.g. `{ 'openTrigger': 'closeTrigger' }`.
- `options(obj)`: Provide a set of defaults for certain tooltip and popover
  attributes. Currently supports 'placement', 'animation', 'popupDelay', and
  `appendToBody`. Here are the defaults:

  <pre>
  placement: 'top',
  animation: true,
  popupDelay: 0,
  popupCloseDelay: 500,
  appendToBody: false
  </pre>

**Known issues**

For Safari 7+ support, if you want to use the **focus** `tooltip-trigger`, you need to use an anchor tag with a tab index. For example:

```
<a tabindex="0" uib-tooltip="Test" tooltip-trigger="focus" class="btn btn-default">
  Click Me
</a>
```
