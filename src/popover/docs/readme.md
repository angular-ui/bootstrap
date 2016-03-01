A lightweight, extensible directive for fancy popover creation. The popover
directive supports multiple placements, optional transition animation, and more.

Like the Bootstrap jQuery plugin, the popover **requires** the tooltip
module.

__Note to mobile developers__:  Please note that while popovers may work correctly on mobile devices (including tablets),
  we have made the decision to not officially support such a use-case because it does not make sense from a UX perspective.

There are three versions of the popover: `uib-popover` and `uib-popover-template`, and `uib-tooltip-html`:

* `uib-popover` -
  Takes text only and will escape any HTML provided for the popover body.
* `uib-popover-html`
  <small class="badge">$</small> -
  Takes an expression that evaluates to an HTML string. Note that this HTML is not compiled. If compilation is required, please use the `uib-popover-template` attribute option instead.  *The user is responsible for ensuring the content is safe to put into the DOM!*
* `uib-popover-template`
  <small class="badge">$</small> -
  A URL representing the location of a template to use for the popover body. Note that the contents of this template need to be wrapped in a tag, e.g., `<div></div>`.

### uib-popover-* settings

All these settings are available for the three types of popovers.

* `popover-animation`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`, Config: `animation`)_ -
  Should it fade in and out?
  
* `popover-append-to-body`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `false`, Config: `appendToBody`)_ -
  Should the popover be appended to '$body' instead of the parent element?
  
* `popover-is-open`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether to show the popover.

* `popover-placement`
  <small class="badge">C</small>
  _(Default: `top`, Config: `placement`)_ -
  Passing in 'auto' separated by a space before the placement will enable auto positioning, e.g: "auto bottom-left". The popover will attempt to position where it fits in the closest scrollable ancestor. Accepts:
  
   * `top` - popover on top, horizontally centered on host element.
   * `top-left` - popover on top, left edge aligned with host element left edge.
   * `top-right` - popover on top, right edge aligned with host element right edge.
   * `bottom` - popover on bottom, horizontally centered on host element.
   * `bottom-left` - popover on bottom, left edge aligned with host element left edge.
   * `bottom-right` - popover on bottom, right edge aligned with host element right edge.
   * `left` - popover on left, vertically centered on host element.
   * `left-top` - popover on left, top edge aligned with host element top edge.
   * `left-bottom` - popover on left, bottom edge aligned with host element bottom edge.
   * `right` - popover on right, vertically centered on host element.
   * `right-top` - popover on right, top edge aligned with host element top edge.
   * `right-bottom` - popover on right, bottom edge aligned with host element bottom edge.
   
* `popover-popup-close-delay`
  <small class="badge">C</small>
  _(Default: `0`, Config: `popupCloseDelay`)_ -
  For how long should the popover remain open after the close trigger event?

* `popover-popup-delay`
  <small class="badge">C</small>
  _(Default: `0`, Config: `popupDelay`)_ -
  Popup delay in milliseconds until it opens.

* `popover-title` -
   A string to display as a fancy title.
   
* `popover-trigger`
  _(Default: `click`)_ -
  What should trigger a show of the popover? Supports a space separated list of event names (see below).

**Note:** To configure the tooltips, you need to do it on `$uibTooltipProvider` (also see below).

### Triggers

The following show triggers are supported out of the box, along with their provided hide triggers:

- `mouseenter`: `mouseleave`
- `click`: `click`
- `outsideClick`: `outsideClick`
- `focus`: `blur`
- `none`

The `outsideClick` trigger will cause the popover to toggle on click, and hide when anything else is clicked.

For any non-supported value, the trigger will be used to both show and hide the
popover. Using the 'none' trigger will disable the internal trigger(s), one can
then use the `popover-is-open` attribute exclusively to show and hide the popover.

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

For Safari 7+ support, if you want to use **focus** `popover-trigger`, you need to use an anchor tag with a tab index. For example:

```
<a tabindex="0" uib-popover="Test" popover-trigger="focus" class="btn btn-default">
  Click Me
</a>
```
