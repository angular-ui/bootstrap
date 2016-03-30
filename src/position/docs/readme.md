The `$uibPosition` service provides a set of DOM utilities used internally to absolute-position an element in relation to another element (tooltips, popovers, typeaheads etc...).

#### getRawNode(element)

Takes a jQuery/jqLite element and converts it to a raw DOM element.

##### parameters

* `element`
  _(Type: `object`)_ -
  The element to convert.

##### returns

* _(Type: `element`)_ -
  A raw DOM element.

#### parseStyle(element)

Parses a numeric style value to a number.  Strips units and will return 0 for invalid (NaN) numbers.

##### parameters

* `value`
  _(Type: `string`)_ -
  The style value to parse.

##### returns

* _(Type: `number`)_ -
  The numeric value of the style property.

#### offsetParent(element)

Gets the closest positioned ancestor.

##### parameters

* `element`
  _(Type: `element`)_ -
  The element to get the offset parent for.

##### returns

* _(Type: `element`)_ -
  The closest positioned ancestor.

#### scrollbarWidth(isBody)

Calculates the browser scrollbar width and caches the result for future calls.  Concept from the TWBS measureScrollbar() function in [modal.js](https://github.com/twbs/bootstrap/blob/master/js/modal.js).

##### parameters

* `isBody`
  _(Type: `boolean`, Default: `false`, optional)_ - Is the requested scrollbar width for the body/html element.  IE and Edge overlay the scrollbar on the body/html element and should be considered 0.

##### returns

* _(Type: `number`)_ -
  The width of the browser scrollbar.

#### scrollbarPadding(element)

Calculates the padding required to replace the scrollbar on an element.

##### parameters

* 'element' _(Type: `element`)_ - The element to calculate the padding on (should be a scrollable element).

##### returns

An object with the following properties:

* `scrollbarWidth`
  _(Type: `number`)_ -
  The width of the scrollbar.

* `widthOverflow`
  _(Type: `boolean`)_ -
  Whether the width is overflowing.

* `right`
  _(Type: `number`)_ -
  The total right padding required to replace the scrollbar.

* `originalRight`
  _(Type: `number`)_ -
  The oringal right padding on the element.

* `heightOverflow`
  _(Type: `boolean`)_ -
  Whether the height is overflowing.

* `bottom`
  _(Type: `number`)_ -
  The total bottom padding required to replace the scrollbar.

* `originalBottom`
  _(Type: `number`)_ -
  The oringal bottom padding on the element.

#### isScrollable(element, includeHidden)

Determines if an element is scrollable.

##### parameters

* `element`
  _(Type: `element`)_ -
  The element to check.

* `includeHidden`
  _(Type: `boolean`, Default: `false`, optional)_ - Should scroll style of 'hidden' be considered.

##### returns

* _(Type: `boolean`)_ -
  Whether the element is scrollable.

#### scrollParent(element, includeHidden, includeSelf)

Gets the closest scrollable ancestor.  Concept from the jQueryUI [scrollParent.js](https://github.com/jquery/jquery-ui/blob/master/ui/scroll-parent.js).

##### parameters

* `element`
  _(Type: `element`)_ -
  The element to get the closest scrollable ancestor for.

* `includeHidden`
  _(Type: `boolean`, Default: `false`, optional)_ - Should scroll style of 'hidden' be considered.

* `includeSelf`
  _(Type: `boolean`, Default: `false`, optional)_ - Should the element passed in be included in the scrollable lookup.

##### returns

* _(Type: `element`)_ -
  The closest scrollable ancestor.

#### position(element, includeMargins)

A read-only equivalent of jQuery's [position](http://api.jquery.com/position/) function, distance to closest positioned ancestor. Does not account for margins by default like jQuery's position.

##### parameters

* `element` _(Type: `element`)_ -
  The element to get the position for.

* `includeMargins` _(Type: `boolean`, Default: `false`, optional)_ -
  Should margins be accounted for.

##### returns

An object with the following properties:

* `width`
  _(Type: `number`)_ -
  The width of the element.

* `height`
  _(Type: `number`)_ -
  The height of the element.

* `top`
  _(Type: `number`)_ -
  Distance to top edge of offset parent.

* `left`
  _(Type: `number`)_ -
  Distance to left edge of offset parent.

#### offset(element)

A read-only equivalent of jQuery's [offset](http://api.jquery.com/offset/) function, distance to viewport.

##### parameters

* `element`
  _(Type: `element`)_ -
  The element to get the offset for.

##### returns

An object with the following properties:

* `width`
  _(Type: `number`)_ -
  The width of the element.

* `height`
  _(Type: `number`)_ -
  The height of the element.

* `top`
  _(Type: `number`)_ -
  Distance to top edge of the viewport.

* `left`
  _(Type: `number`)_ -
  Distance to left edge of the viewport.

#### viewportOffset(element, useDocument, includePadding)

Gets the elements available space relative to the closest scrollable ancestor.  Accounts for padding, border, and scrollbar width.
Right and bottom dimensions represent the distance to the respective edge of the viewport element, not the top and left edge.
If the element edge extends beyond the viewport, a negative value will be reported.

##### parameters

* `element`
  _(Type: `element`)_ -
  The element to get the viewport offset for.

* `useDocument`
  _(Type: `boolean`, Default: `false`, optional)_ -
  Should the viewport be the document element instead of the first scrollable element.

* `includePadding`
  _(Type: `boolean`, Default: `true`, optional)_ -
  Should the padding on the viewport element be accounted for, default is true.

##### returns

An object with the following properties:

* `top`
  _(Type: `number`)_ -
  Distance to top content edge of the viewport.

* `bottom`
  _(Type: `number`)_ -
  Distance to bottom content edge of the viewport.

* `left`
  _(Type: `number`)_ -
  Distance to left content edge of the viewport.

* `right`
  _(Type: `number`)_ -
  Distance to right content edge of the viewport.

#### parsePlacement(placement)

Gets an array of placement values parsed from a placement string. Along with the 'auto' indicator, supported placement strings are:

* top: element on top, horizontally centered on host element.
* top-left: element on top, left edge aligned with host element left edge.
* top-right: element on top, right edge aligned with host element right edge.
* bottom: element on bottom, horizontally centered on host element.
* bottom-left: element on bottom, left edge aligned with host element left edge.
* bottom-right: element on bottom, right edge aligned with host element right edge.
* left: element on left, vertically centered on host element.
* left-top: element on left, top edge aligned with host element top edge.
* left-bottom: element on left, bottom edge aligned with host element bottom edge.
* right: element on right, vertically centered on host element.
* right-top: element on right, top edge aligned with host element top edge.
* right-bottom: element on right, bottom edge aligned with host element bottom edge.

A placement string with an 'auto' indicator is expected to be space separated from the placement, i.e: 'auto bottom-left'.
If the primary and secondary placement values do not match 'top, bottom, left, right' then 'top' will be the primary placement and
'center' will be the secondary placement.  If 'auto' is passed, true will be returned as the 3rd value of the array.

##### parameters

* `placement`
  _(Type: `string`, Example: `auto top-left`)_ -
  The placement string to parse.

##### returns

An array with the following values:

* `[0]`
  _(Type: `string`)_ -
  The primary placement.

* `[1]`
  _(Type: `string`)_ -
  The secondary placement.

* `[2]`
  _(Type: `boolean`)_ -
  Is auto place enabled.

#### positionElements(hostElement, targetElement, placement, appendToBody)

Gets gets coordinates for an element to be positioned relative to another element.

##### parameters

* `hostElement`
  _(Type: `element`)_ -
  The element to position against.

* `targetElement`
  _(Type: `element`)_ -
  The element to position.

* `placement`
  _(Type: `string`, Default: `top`, optional)_ -
  The placement for the target element.  See the parsePlacement() function for available options.  If 'auto' placement is used, the viewportOffset() function is used to decide where the targetElement will fit.

* `appendToBody`
  _(Type: `boolean`, Default: `false`, optional)_ -
  Should the coordinates be cacluated from the body element.

##### returns

An object with the following properties:

* `top`
  _(Type: `number`)_ -
  The targetElement top value.

* `left`
  _(Type: `number`)_ -
  The targetElement left value.

* `right`
  _(Type: `number`)_ -
  The resolved placement with 'auto' removed.

#### positionArrow(element, placement)

Positions the tooltip and popover arrow elements when using placement options beyond the standard top, left, bottom, or right.

##### parameters

* `element`
  _(Type: `element`)_ -
  The element to position the arrow element for.

* `placement`
  _(Type: `string`)_ -
  The placement for the element.
