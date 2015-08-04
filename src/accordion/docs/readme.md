The **accordion directive** builds on top of the collapse directive to provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item's header.

We can control whether expanding an item will cause the other items to close, using the `close-others` attribute on accordion.

The body of each accordion group is transcluded in to the body of the collapsible element.

### Accordion Settings ###

  * `is-open` <i class="glyphicon glyphicon-eye-open"></i> (Defaults: false) :
    Whether accordion group is open or closed.
  * `template-url` (Defaults: `template/accordion/accordion.html`) :
    Add ability to override the template url used

### Accordion Group Settings ###

  * `template-url` (Defaults: `template/accordion/accordion-group.html`) :
    Add ability to override the template url used. Note that this must be a string
