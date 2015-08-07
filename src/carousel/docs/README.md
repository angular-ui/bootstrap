Carousel creates a carousel similar to bootstrap's image carousel.

The carousel also offers support for touchscreen devices in the form of swiping. To enable swiping, load the `ngTouch` module as a dependency.

Use a `<carousel>` element with `<slide>` elements inside it.  It will automatically cycle through the slides at a given rate, and a current-index variable will be kept in sync with the currently visible slide.

Use the `no-wrap` attribute on a `<carousel>` element to control the looping of slides; setting `no-wrap` to an expression which evaluates to a truthy value will prevent looping

Use the `template-url` attribute on a `<carousel>` or `<slide>` element to specify the url of a custom template to override the default templates
