A lightweight pager directive that is focused on providing previous/next paging functionality

### uib-pager settings

* `align`
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Whether to align each link to the sides.
  
* `items-per-page`
  <small class="badge">$</small>
  <small class="badge">C</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `10`)_ -
  Maximum number of items per page. A value less than one indicates all items on one page.
  
* `next-text`
  <small class="badge">C</small>
  _(Default: `Next »`)_ -
  Text for Next button.
  
* `ng-disabled`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Used to disable the pager component.
  
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
  _(Default: `« Previous`)_ -
  Text for Previous button.

* `template-url`
  _(Default: `template/pagination/pager.html`)_ -
  Override the template for the component with a custom provided template.
  
* `total-items`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  Total number of items in all pages.
