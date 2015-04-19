
A lightweight pagination directive that is focused on ... providing pagination & will take care of visualising a pagination bar and enable / disable buttons correctly!

### Pagination Settings ###

Settings can be provided as attributes in the `<uib-pagination>` or globally configured through the `uibPaginationConfig`.

 * `ng-change`
 	:
 	`ng-change` can be used together with `ng-model` to call a function whenever the page changes.

 * `ng-model` <i class="glyphicon glyphicon-eye-open"></i>
 	:
 	Current page number. First page is 1.

 * `ng-disabled` <i class="glyphicon glyphicon-eye-open"></i>
  :
  Used to disable the pagination component

 * `total-items` <i class="glyphicon glyphicon-eye-open"></i>
 	:
 	Total number of items in all pages.

 * `items-per-page` <i class="glyphicon glyphicon-eye-open"></i>
 	_(Defaults: 10)_ :
 	Maximum number of items per page. A value less than one indicates all items on one page.

 * `max-size` <i class="glyphicon glyphicon-eye-open"></i>
 	_(Defaults: null)_ :
 	Limit number for pagination size.

 * `num-pages` <small class="badge">readonly</small>
 	_(Defaults: angular.noop)_ :
 	An optional expression assigned the total number of pages to display.

 * `rotate`
 	_(Defaults: true)_ :
 	Whether to keep current page in the middle of the visible ones.
 	
 * `force-ellipses`
 	_(Defaults: false)_ :
 	Also displays ellipses when `rotate` is true and `max-size` is smaller than the number of pages.

 * `direction-links`
 	_(Default: true)_ :
 	Whether to display Previous / Next buttons.

 * `previous-text`
 	_(Default: 'Previous')_ :
 	Text for Previous button.

 * `next-text`
 	_(Default: 'Next')_ :
 	Text for Next button.

 * `boundary-links`
 	_(Default: false)_ :
 	Whether to display First / Last buttons.

 * `first-text`
 	_(Default: 'First')_ :
 	Text for First button.

 * `last-text`
 	_(Default: 'Last')_ :
 	Text for Last button.
 	
 * `boundary-link-numbers`
 	_(Default: false)_ :
 	Whether to always display the first and last page numbers. If `max-size` is smaller than the number of pages, then the  first and last page numbers are still shown with ellipses in-between as necessary. NOTE: `max-size` refers to the center of the range. This option may add up to 2 more numbers on each side of the displayed range for the end value and what would be an ellipsis but is replaced by a number because it is sequential. 

 * `template-url`
  _(Default: 'template/pagination/pagination.html')_ :
  Override the template for the component with a custom provided template

### Pager Settings ###

Settings can be provided as attributes in the `<uib-pager>` or globally configured through the `uibPagerConfig`.  
For `ng-model`, `total-items`, `items-per-page` and `num-pages` see pagination settings. Other settings are:

 * `align`
 	_(Default: true)_ :
 	Whether to align each link to the sides.

 * `previous-text`
 	_(Default: '« Previous')_ :
 	Text for Previous button.

 * `next-text`
 	_(Default: 'Next »')_ :
 	Text for Next button.

 * `template-url`
  _(Default: 'template/pagination/pager.html') :
  Override the template for the component with a custom provided template

 * `ng-disabled` <i class="glyphicon glyphicon-eye-open"></i>
  :
  Used to disable the pager component
