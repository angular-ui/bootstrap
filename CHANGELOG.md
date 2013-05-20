# 0.3.0 (2013-04-30)

## Features

- **progressbar:**
  - add progressbar directive ([261f2072](https://github.com/angular-ui/bootstrap/commit/261f2072))
- **rating:**
  - add rating directive ([6b5e6369](https://github.com/angular-ui/bootstrap/commit/6b5e6369))
- **typeahead:**
  - support the editable property ([a40c3fbe](https://github.com/angular-ui/bootstrap/commit/a40c3fbe))
  - support typeahead-loading bindable expression ([b58c9c88](https://github.com/angular-ui/bootstrap/commit/b58c9c88))
- **tooltip:**
  - added popup-delay option ([a79a2ba8](https://github.com/angular-ui/bootstrap/commit/a79a2ba8))
  - added appendToBody to $tooltip ([1ee467f8](https://github.com/angular-ui/bootstrap/commit/1ee467f8))
  - added tooltip-html-unsafe directive ([45ed2805](https://github.com/angular-ui/bootstrap/commit/45ed2805))
  - support for custom triggers ([b1ba821b](https://github.com/angular-ui/bootstrap/commit/b1ba821b))

## Bug Fixes

- **alert:**
  - don't show close button if no close callback specified ([c2645f4a](https://github.com/angular-ui/bootstrap/commit/c2645f4a))
- **carousel:**
  - Hide navigation indicators if only one slide ([aedc0565](https://github.com/angular-ui/bootstrap/commit/aedc0565))
- **collapse:**
  - remove reference to msTransition for IE10 ([55437b16](https://github.com/angular-ui/bootstrap/commit/55437b16))
- **dialog:**
  - set _open to false on init ([dcc9ef31](https://github.com/angular-ui/bootstrap/commit/dcc9ef31))
  - close dialog on location change ([474ce52e](https://github.com/angular-ui/bootstrap/commit/474ce52e))
  - IE8 fix to not set data() against text nodes ([a6c540e5](https://github.com/angular-ui/bootstrap/commit/a6c540e5))
  - fix $apply in progres on $location change ([77e6acb9](https://github.com/angular-ui/bootstrap/commit/77e6acb9))
- **tabs:**
  - remove superfluous href from tabs template ([38c1badd](https://github.com/angular-ui/bootstrap/commit/38c1badd))
- **tooltip:**
  - fix positioning issues in tooltips and popovers ([6458f487](https://github.com/angular-ui/bootstrap/commit/6458f487))
- **typeahead:**
  - close matches popup on click outside typeahead ([acca7dcd](https://github.com/angular-ui/bootstrap/commit/acca7dcd))
  - stop keydown event propagation when ESC pressed to discard matches ([22a00cd0](https://github.com/angular-ui/bootstrap/commit/22a00cd0))
  - correctly render initial model value ([929a46fa](https://github.com/angular-ui/bootstrap/commit/929a46fa))
  - correctly higlight matches if query contains regexp-special chars ([467afcd6](https://github.com/angular-ui/bootstrap/commit/467afcd6))
  - fix matches pop-up positioning issues ([74beecdb](https://github.com/angular-ui/bootstrap/commit/74beecdb))

# 0.2.0 (2013-03-03)

## Features

- **dialog:**
  - Make $dialog 'resolve' property to work the same way of $routeProvider.when ([739f86f](https://github.com/angular-ui/bootstrap/commit/739f86f))
- **modal:**
  - allow global override of modal options ([acaf72b](https://github.com/angular-ui/bootstrap/commit/acaf72b))
- **buttons:**
  - add checkbox and radio buttons ([571ccf4](https://github.com/angular-ui/bootstrap/commit/571ccf4))
- **carousel:**
  - add slide indicators ([3b677ee](https://github.com/angular-ui/bootstrap/commit/3b677ee))
- **typeahead:**
  - add typeahead directive ([6a97da2](https://github.com/angular-ui/bootstrap/commit/6a97da2))
- **accordion:**
  - enable HTML in accordion headings ([3afcaa4](https://github.com/angular-ui/bootstrap/commit/3afcaa4))
- **pagination:**
  - add first/last link & constant congif options ([0ff0454](https://github.com/angular-ui/bootstrap/commit/0ff0454))

## Bug fixes

- **dialog:**
  - update resolve section to new syntax ([1f87486](https://github.com/angular-ui/bootstrap/commit/1f87486))
  - $compile entire modal ([7575b3c](https://github.com/angular-ui/bootstrap/commit/7575b3c))
- **tooltip:**
  - don't show tooltips if there is no content to show ([030901e](https://github.com/angular-ui/bootstrap/commit/030901e))
  - fix placement issues ([a2bbf4d](https://github.com/angular-ui/bootstrap/commit/a2bbf4d))
- **collapse:**
  - Avoids fixed height on collapse ([ff5d119](https://github.com/angular-ui/bootstrap/commit/ff5d119))
- **accordion:**
  - fix minification issues ([f4da4d6](https://github.com/angular-ui/bootstrap/commit/f4da4d6))
- **typeahead:**
  -  update inputs value on mapping where label is not derived from the model ([a5f64de](https://github.com/angular-ui/bootstrap/commit/a5f64de))

# 0.1.0 (2013-02-02)

_Very first, initial release_.

## Features

Version `0.1.0` was released with the following directives:

* accordion
* alert
* carousel
* dialog
* dropdownToggle
* modal
* pagination
* popover
* tabs
* tooltip
