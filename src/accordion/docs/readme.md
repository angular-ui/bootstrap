The **accordion directive** builds on top of the collapse directive to provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item's header.

The body of each accordion group is transcluded into the body of the collapsible element.

### Accordion Settings

  * `close-others` (Defaults: false) :
    Control whether expanding an item will cause the other items to close
  * `template-url` (Defaults: `template/accordion/accordion.html`) :
    Add the ability to override the template used on the component.

### Accordion Group Settings

  * `is-disabled` <i class="glyphicon glyphicon-eye-open"></i> (Defaults: false) :
    Whether the accordion group is disabled or not.
  * `is-open` <i class="glyphicon glyphicon-eye-open"></i> (Defaults: false) :
    Whether accordion group is open or closed.
  * `heading` (Defaults: none) :
    The clickable text on the group's header. You need one to be able to click on the header for toggling.
  * `panel-class` (Defaults: `panel-default`) :
    Add ability to use Bootstrap's contextual panel classes (panel-primary, panel-success, panel-info, etc...) or your own.  This must be a string.
  * `template-url` (Defaults: `template/accordion/accordion-group.html`) :
    Add the ability to override the template used on the component.

### Accordion heading

Instead of the `heading` attribute on the `accordion-group`, you can use an `accordion-heading` element inside a group that will be used as the group's header.
