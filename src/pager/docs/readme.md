A lightweight pager directive that is focused on providing previous/next paging functionality

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
