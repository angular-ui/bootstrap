The **accordion directive** builds on top of the collapse directive to provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item's header.

The body of each accordion group is transcluded into the body of the collapsible element.

### uib-accordion settings

* `close-others`
  <small class="badge">$</small>
  <small class="badge">C</small>
  _(Default: `true`)_ -
  Control whether expanding an item will cause the other items to close.

* `template-url`
  _(Default: `template/accordion/accordion.html`)_ -
  Add the ability to override the template used on the component.

### uib-accordion-group settings

* `heading`
  _(Default: `none`)_ -
  The clickable text on the group's header. You need one to be able to click on the header for toggling.

* `is-disabled`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
   Whether the accordion group is disabled or not.

* `is-open`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether accordion group is open or closed.

* `panel-class`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `panel-default`)_ -
  Add ability to use Bootstrap's contextual panel classes (panel-primary, panel-success, panel-info, etc...) or your own.  This must be a string.

* `template-url`
  _(Default: `uib/template/accordion/accordion-group.html`)_ -
  Add the ability to override the template used on the component.

### Accordion heading

Instead of the `heading` attribute on the `uib-accordion-group`, you can use an `uib-accordion-heading` element inside a group that will be used as the group's header.

If you're using a custom template for the `uib-accordion-group`, you'll need to have an element for the heading to be transcluded into using `uib-accordion-header` (e.g. `<div uib-accordion-header></div>`).

### Known issues

To use clickable elements within the accordion, you have to override the accordion-group template to use div elements instead of anchor elements, and add `cursor: pointer` in your CSS. This is due to browsers interpreting anchor elements as the target of any click event, which triggers routing when certain elements such as buttons are nested inside the anchor element.

If custom classes on the accordion-group element are desired, one needs to either modify the template to remove the `ng-class` usage in the accordion-group template and use ng-class on the accordion-group element (not recommended), or use an interpolated expression in the class attribute, i.e. `<uib-accordion-group class="{{customClass()}}"></uib-accordion-group>`.
