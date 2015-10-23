The **accordion directive** builds on top of the collapse directive to provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item's header.

The body of each accordion group is transcluded into the body of the collapsible element.

### uib-accordion settings

* `close-others`
  _(Default: `true`)_ -
  Control whether expanding an item will cause the other items to close.
  
* `template-url`
  _(Default: `template/accordion/accordion.html`)_ -
  Add the ability to override the template used on the component.

### uib-accordion-group settings

* `is-disabled`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
   Whether the accordion group is disabled or not.

* `is-open`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether accordion group is open or closed.

* `heading`
  _(Default: `none`)_ -
  The clickable text on the group's header. You need one to be able to click on the header for toggling.

* `panel-class` 
  _(Default: `panel-default`)_ -
  Add ability to use Bootstrap's contextual panel classes (panel-primary, panel-success, panel-info, etc...) or your own.  This must be a string.

* `template-url`
  _(Default: `template/accordion/accordion-group.html`)_ -
  Add the ability to override the template used on the component.
  
### Default settings `uibAccordionConfig`

* `closeOthers`
  _(Default: `true`)_ -
  Control whether expanding an item will cause the other items to close.

### Accordion heading

Instead of the `heading` attribute on the `uib-accordion-group`, you can use an `uib-accordion-heading` element inside a group that will be used as the group's header.
