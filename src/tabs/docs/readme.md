AngularJS version of the tabs directive.

### uib-tabset settings

* `active`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `Index of first tab`)_ -
  Active index of tab. Setting this to an existing tab index will make that tab active.

* `justified`
  <small class="badge">$</small>
  _(Default: `false`)_ -
  Whether tabs fill the container and have a consistent width.

  * `template-url`
  _(Default: `uib/template/tabs/tabset.html`)_ -
  A URL representing the location of a template to use for the main component.

* `type`
  _(Defaults: `tabs`)_ -
  Navigation type. Possible values are 'tabs' and 'pills'.

* `vertical`
  <small class="badge">$</small>
  _(Default: `false`)_ -
  Whether tabs appear vertically stacked.

### uib-tab settings

* `classes`
  <small class="badge">$</small> -
   An optional string of space-separated CSS classes.

* `deselect()`
  <small class="badge">$</small> -
  An optional expression called when tab is deactivated. Supports $event in template for expression. You may call `$event.preventDefault()` in this event handler to prevent a tab change from occurring.

* `disable`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether tab is clickable and can be activated.

* `heading` -
  Heading text.

* `index` -
  Tab index. Must be unique.

* `select()`
  <small class="badge">$</small> -
  An optional expression called when tab is activated. Supports $event in template for expression.

* `template-url`
  _(Default: `uib/template/tabs/tab.html`)_ -
  A URL representing the location of a template to use for the tab heading.

### Tabset heading

Instead of the `heading` attribute on the `uib-tabset`, you can use an `uib-tab-heading` element inside a tabset that will be used as the tabset's header. There you can use HTML as well.

### Known issues

To use clickable elements within the tab, you have override the tab template to use div elements instead of anchor elements, and replicate the desired styles from Bootstrap's CSS. This is due to browsers interpreting anchor elements as the target of any click event, which triggers routing when certain elements such as buttons are nested inside the anchor element.
