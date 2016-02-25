A lightweight, extensible directive for fancy tooltip creation. The tooltip
directive supports multiple placements, optional transition animation, and more.

__Note to mobile developers__:  Please note that while tooltips may work correctly on mobile devices (including tablets),
  we have made the decision to not officially support such a use-case because it does not make sense from a UX perspective.

There are three versions of the tooltip: `uib-tooltip`, `uib-tooltip-template`, and
`uib-tooltip-html`:

* `uib-tooltip` -
  Takes text only and will escape any HTML provided.
* `uib-tooltip-html`
  <small class="badge">$</small> -
  Takes an expression that evaluates to an HTML string. Note that this HTML is not compiled. If compilation is required, please use the `uib-tooltip-template` attribute option instead. *The user is responsible for ensuring the content is safe to put into the DOM!*
* `uib-tooltip-template`
  <small class="badge">$</small> -
  Takes text that specifies the location of a template to use for the tooltip. Note that this needs to be wrapped in a tag.

### uib-tooltip-* settings

All these settings are available for the three types of tooltips.

* `tooltip-animation`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`, Config: `animation`)_ -
  Should it fade in and out?

* `tooltip-append-to-body`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `false`, Config: `appendToBody`)_ -
  Should the tooltip be appended to '$body' instead of the parent element?

* `tooltip-class` -
  Custom class to be applied to the tooltip.

* `tooltip-enable`
  <small class="badge">$</small>
  _(Default: `true`)_ -
  Is it enabled? It will enable or disable the configured tooltip-trigger.

* `tooltip-is-open`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether to show the tooltip.

* `tooltip-placement`
  <small class="badge">C</small>
  _(Default: `top`, Config: `placement`)_ -
  Passing in 'auto' separated by a space before the placement will enable auto positioning, e.g: "auto bottom-left". The tooltip will attempt to position where it fits in the closest scrollable ancestor. Accepts:

   * `top` - tooltip on top, horizontally centered on host element.
   * `top-left` - tooltip on top, left edge aligned with host element left edge.
   * `top-right` - tooltip on top, right edge aligned with host element right edge.
   * `bottom` - tooltip on bottom, horizontally centered on host element.
   * `bottom-left` - tooltip on bottom, left edge aligned with host element left edge.
   * `bottom-right` - tooltip on bottom, right edge aligned with host element right edge.
   * `left` - tooltip on left, vertically centered on host element.
   * `left-top` - tooltip on left, top edge aligned with host element top edge.
   * `left-bottom` - tooltip on left, bottom edge aligned with host element bottom edge.
   * `right` - tooltip on right, vertically centered on host element.
   * `right-top` - tooltip on right, top edge aligned with host element top edge.
   * `right-bottom` - tooltip on right, bottom edge aligned with host element bottom edge.

* `tooltip-popup-close-delay`
  <small class="badge">C</small>
  _(Default: `0`, Config: `popupCloseDelay`)_ -
  For how long should the tooltip remain open after the close trigger event?

* `tooltip-popup-delay`
  <small class="badge">C</small>
  _(Default: `0`, Config: `popupDelay`)_ -
  Popup delay in milliseconds until it opens.

* `tooltip-trigger`
  _(Default: `mouseenter`)_ -
  What should trigger a show of the tooltip? Supports a space separated list of event names (see below).

**Note:** To configure the tooltips, you need to do it on `$uibTooltipProvider` (also see below).

### Triggers

The following show triggers are supported out of the box, along with their provided hide triggers:

- `mouseenter`: `mouseleave`
- `click`: `click`
- `outsideClick`: `outsideClick`
- `focus`: `blur`
- `none`

The `outsideClick` trigger will cause the tooltip to toggle on click, and hide when anything else is clicked.

For any non-supported value, the trigger will be used to both show and hide the
tooltip. Using the 'none' trigger will disable the internal trigger(s), one can
then use the `tooltip-is-open` attribute exclusively to show and hide the tooltip.

### $uibTooltipProvider

Through the `$uibTooltipProvider`, you can change the way tooltips and popovers
behave by default; the attributes above always take precedence. The following
methods are available:

* `setTriggers(obj)`
  _(Example: `{ 'openTrigger': 'closeTrigger' }`)_ -
  Extends the default trigger mappings mentioned above with mappings of your own.

* `options(obj)` -
  Provide a set of defaults for certain tooltip and popover attributes. Currently supports the ones with the <small class="badge">C</small> badge.

### Known issues

For Safari 7+ support, if you want to use the **focus** `tooltip-trigger`, you need to use an anchor tag with a tab index. For example:

```
<a tabindex="0" uib-tooltip="Test" tooltip-trigger="focus" class="btn btn-default">
  Click Me
</a>
```
