Carousel creates a carousel similar to bootstrap's image carousel.

The carousel also offers support for touchscreen devices in the form of swiping. To enable swiping, load the `ngTouch` module as a dependency.

Use a `<uib-carousel>` element with `<uib-slide>` elements inside it.

### uib-carousel settings

* `active`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `Index of first slide`)_ -
  Index of current active slide.

* `interval`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `none`)_ -
  Sets an interval to cycle through the slides. You need a number bigger than 0 to make the interval work.

* `no-pause`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  The interval pauses on mouseover. Setting this to truthy, disables this pause.

* `no-transition`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Whether to disable the transition animation between slides. Setting this to truthy, disables this transition.

* `no-wrap`
  <small class="badge">$</small>
  _(Default: `false`)_ -
  Disables the looping of slides. Setting `no-wrap` to an expression which evaluates to a truthy value will prevent looping.

* `template-url`
  _(Default: `uib/template/carousel/carousel.html`)_ -
  Add the ability to override the template used on the component.

### uib-slide settings

* `actual`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `none`)_ -
  Use this attribute to bind the slide model (or any object of interest) onto the slide scope, which makes it available for customization in the carousel template.

* `index`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `none`)_ -
  The index of the slide. Must be unique.

* `template-url`
  _(Default: `uib/template/carousel/slide.html`)_ -
  Add the ability to override the template used on the component.
