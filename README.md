# Project Status (please read)
Due to [Angular](https://angular.io)'s continued adoption, our creation of [the Angular version of this library](https://ng-bootstrap.github.io), and the the project maintainers' moving on to other things, this project is considered feature-complete and is no longer being maintained.

We thank you for all your contributions over the years and hope you've enjoyed using this library as much as we've had developing and maintaining it.  It would not have been successful without them.

---

### UI Bootstrap - [AngularJS](http://angularjs.org/) directives specific to [Bootstrap](http://getbootstrap.com)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular-ui/bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/angular-ui/bootstrap.svg)](http://travis-ci.org/angular-ui/bootstrap)
[![devDependency Status](https://david-dm.org/angular-ui/bootstrap/dev-status.svg?branch=master)](https://david-dm.org/angular-ui/bootstrap#info=devDependencies)
[![CDNJS](https://img.shields.io/cdnjs/v/angular-ui-bootstrap.svg)](https://cdnjs.com/libraries/angular-ui-bootstrap/)

### Quick links
- [Demo](#demo)
- [Angular 2](#angular-2)
- [Installation](#installation)
    - [NPM](#install-with-npm)
    - [Bower](#install-with-bower)
    - [NuGet](#install-with-nuget)
    - [Custom](#custom-build)
    - [Manual](#manual-download)
- [Webpack / JSPM](#webpack--jspm)
- [Support](#support)
    - [FAQ](#faq)
    - [Code of Conduct](#code-of-conduct)
    - [PREFIX MIGRATION GUIDE](#prefix-migration-guide)
    - [Supported browsers](#supported-browsers)
    - [Need help?](#need-help)
    - [Found a bug?](#found-a-bug)
- [Contributing to the project](#contributing-to-the-project)
- [Development, meeting minutes, roadmap and more.](#development-meeting-minutes-roadmap-and-more)


# Demo

Do you want to see directives in action? Visit https://angular-ui.github.io/bootstrap/!

# Angular 2

Are you interested in Angular 2? We are on our way! Check out [ng-bootstrap](https://github.com/ui-bootstrap/core).

# Installation

Installation is easy as UI Bootstrap has minimal dependencies - only the AngularJS and Twitter Bootstrap's CSS are required.
*Notes:*
* Since version 0.13.0, UI Bootstrap depends on [ngAnimate](https://docs.angularjs.org/api/ngAnimate) for transitions and animations, such as the accordion, carousel, etc. Include `ngAnimate` in the module dependencies for your app in order to enable animation.
* UI Bootstrap depends on [ngTouch](https://docs.angularjs.org/api/ngTouch) for swipe actions. Include `ngTouch` in the module dependencies for your app in order to enable swiping.

## Angular Requirements
* UI Bootstrap 1.0 and higher _requires_ Angular 1.4.x or higher and it has been tested with Angular 1.4.8.
* UI Bootstrap 0.14.3 is the _last_ version that supports Angular 1.3.x.
* UI Bootstrap 0.12.0 is the _last_ version that supports Angular 1.2.x.

## Bootstrap Requirements
* UI Bootstrap requires Bootstrap CSS version 3.x or higher and it has been tested with Bootstrap CSS 3.3.6.
* UI Bootstrap 0.8 is the _last_ version that supports Bootstrap CSS 2.3.x.

#### Install with NPM

```sh
$ npm install angular-ui-bootstrap
```

This will install AngularJS and Bootstrap NPM packages.

#### Install with Bower
```sh
$ bower install angular-bootstrap
```

Note: do not install 'angular-ui-bootstrap'.  A separate repository - [bootstrap-bower](https://github.com/angular-ui/bootstrap-bower) - hosts the compiled javascript file and bower.json.

#### Install with NuGet
To install AngularJS UI Bootstrap, run the following command in the Package Manager Console

```sh
PM> Install-Package Angular.UI.Bootstrap
```

#### Custom build

Head over to https://angular-ui.github.io/bootstrap/ and hit the *Custom build* button to create your own custom UI Bootstrap build, just the way you like it.

#### Manual download

After downloading dependencies (or better yet, referencing them from your favorite CDN) you need to download build version of this project. All the files and their purposes are described here:
https://github.com/angular-ui/bootstrap/tree/gh-pages#build-files
Don't worry, if you are not sure which file to take, opt for `ui-bootstrap-tpls-[version].min.js`.

### Adding dependency to your project

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `ui.bootstrap` AngularJS module:

```js
angular.module('myModule', ['ui.bootstrap']);
```

# Webpack / JSPM

To use this project with webpack, follow the [NPM](#install-with-npm) instructions.
Now, if you want to use only the accordion, you can do:

```js
import accordion from 'angular-ui-bootstrap/src/accordion';

angular.module('myModule', [accordion]);
```

You can import all the pieces you need in the same way:

```js
import accordion from 'angular-ui-bootstrap/src/accordion';
import datepicker from 'angular-ui-bootstrap/src/datepicker';

angular.module('myModule', [accordion, datepicker]);
```

This will load all the dependencies (if any) and also the templates (if any).

Be sure to have a loader able to process `css` files like `css-loader`.

If you would prefer not to load your css through your JavaScript file loader/bundler, you can choose to import the `index-nocss.js` file instead, which is available for the modules:
* carousel
* datepicker
* datepickerPopup
* dropdown
* modal
* popover
* position
* timepicker
* tooltip
* typeahead

The other modules, such as `accordion` in the example below, do not have CSS resources to load, so you should continue to import them as normal:

```js
import accordion from 'angular-ui-bootstrap/src/accordion';
import typeahead from 'angular-ui-bootstrap/src/typeahead/index-nocss.js';

angular.module('myModule', [accordion, typeahead]);
```

# Versioning

Pre-2.0.0 does not follow a particular versioning system. 2.0.0 and onwards follows [semantic versioning](http://semver.org/). All release changes can be viewed on our [changelog](CHANGELOG.md).

# Support

## FAQ

https://github.com/angular-ui/bootstrap/wiki/FAQ

# Code of Conduct

Take a moment to read our [Code of Conduct](CODE_OF_CONDUCT.md)

## PREFIX MIGRATION GUIDE

If you're updating your application to use prefixes, please check the [migration guide](https://github.com/angular-ui/bootstrap/wiki/Migration-guide-for-prefixes).

## Supported browsers

Directives from this repository are automatically tested with the following browsers:
* Chrome (stable and canary channel)
* Firefox
* IE 9 and 10
* Opera
* Safari

Modern mobile browsers should work without problems.

## Need help?
Need help using UI Bootstrap?

* Live help in the IRC (`#angularjs` channel at the `freenode` network). Use this [webchat](https://webchat.freenode.net/) or your own IRC client.
* Ask a question in [StackOverflow](http://stackoverflow.com/) under the [angular-ui-bootstrap](http://stackoverflow.com/questions/tagged/angular-ui-bootstrap) tag.

**Please do not create new issues in this repository to ask questions about using UI Bootstrap**

## Found a bug?
Please take a look at [CONTRIBUTING.md](CONTRIBUTING.md#you-think-youve-found-a-bug) and submit your issue [here](https://github.com/angular-ui/bootstrap/issues/new).


----


# Contributing to the project

We are always looking for the quality contributions! Please check the [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution guidelines.

# Development, meeting minutes, roadmap and more.

Head over to the [Wiki](https://github.com/angular-ui/bootstrap/wiki) for notes on development for UI Bootstrap, meeting minutes from the UI Bootstrap team, roadmap plans, project philosophy and more.
