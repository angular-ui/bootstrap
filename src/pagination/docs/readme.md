A lightweight pagination directive that is focused on ... providing pagination & will take care of visualising a pagination bar and enable / disable buttons correctly!

### uib-pagination settings

* `boundary-links`
  <small class="badge">C</small>
  _(Default: `false`)_ -
  Whether to display First / Last buttons.

* `boundary-link-numbers`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `false`)_ -
  Whether to always display the first and last page numbers. If `max-size` is smaller than the number of pages, then the  first and last page numbers are still shown with ellipses in-between as necessary. NOTE: `max-size` refers to the center of the range. This option may add up to 2 more numbers on each side of the displayed range for the end value and what would be an ellipsis but is replaced by a number because it is sequential.

* `direction-links`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Whether to display Previous / Next buttons.
  
* `first-text`
  <small class="badge">C</small>
  _(Default: `First`)_ -
  Text for First button.

* `force-ellipses`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `false`)_ -
  Also displays ellipses when `rotate` is true and `max-size` is smaller than the number of pages.

* `items-per-page`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `10`)_ -
  Maximum number of items per page. A value less than one indicates all items on one page.

* `last-text`
  <small class="badge">C</small>
  _(Default: `Last`)_ -
  Text for Last button.
  
* `max-size`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `null`)_ -
  Limit number for pagination size.
  
* `next-text`
  <small class="badge">C</small>
  _(Default: `Next`)_ -
  Text for Next button.

* `ng-change`
  <small class="badge">$</small> -
  This can be used to call a function whenever the page changes.
  
* `ng-disabled`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Used to disable the pagination component.

* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  Current page number. First page is 1.

* `num-pages`
  <small class="badge">$</small>
  <small class="badge">readonly</small>
  _(Default: `angular.noop`)_ -
  An optional expression assigned the total number of pages to display.

* `previous-text`
  <small class="badge">C</small>
  _(Default: `Previous`)_ -
  Text for Previous button.

* `rotate`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Whether to keep current page in the middle of the visible ones.

* `template-url`
  _(Default: `uib/template/pagination/pagination.html`)_ -
  Override the template for the component with a custom provided template
  
* `total-items`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  Total number of items in all pages.
