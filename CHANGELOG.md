# 0.7.0 (2013-11-22)

## Features

- **datepicker:** 
  - add i18n support for bar buttons in popup ([c6ba8d7f](http://github.com/angular-ui/bootstrap/commit/c6ba8d7f))  
  - dynamic date format for popup ([aa3eaa91](http://github.com/angular-ui/bootstrap/commit/aa3eaa91))  
  - datepicker-append-to-body attribute ([0cdc4609](http://github.com/angular-ui/bootstrap/commit/0cdc4609))  
- **dropdownToggle:** 
  - disable dropdown when it has the disabled class ([104bdd1b](http://github.com/angular-ui/bootstrap/commit/104bdd1b))  
- **tooltip:** 
  - add ability to enable / disable tooltip ([5d9bd058](http://github.com/angular-ui/bootstrap/commit/5d9bd058))   

## Bug Fixes

- **accordion:** 
  - assign `is-open` to correct scope ([157f614a](http://github.com/angular-ui/bootstrap/commit/157f614a))  
- **collapse:** 
  - remove element height watching ([a72c635c](http://github.com/angular-ui/bootstrap/commit/a72c635c))  
  - add the "in" class for expanded panels ([9eca35a8](http://github.com/angular-ui/bootstrap/commit/9eca35a8))  
- **datepicker:**
  - some IE8 compatibility improvements ([4540476f](http://github.com/angular-ui/bootstrap/commit/4540476f))  
  - set popup initial position in append-to-body case ([78a1e9d7](http://github.com/angular-ui/bootstrap/commit/78a1e9d7))
  - properly handle showWeeks config option ([570dba90](http://github.com/angular-ui/bootstrap/commit/570dba90))  
- **modal:** 
  - correctly close modals with no backdrop ([e55c2de3](http://github.com/angular-ui/bootstrap/commit/e55c2de3))  
- **pagination:** 
  - fix altering of current page caused by totals change ([81164dae](http://github.com/angular-ui/bootstrap/commit/81164dae))  
  - handle extreme values for `total-items` ([8ecf93ed](http://github.com/angular-ui/bootstrap/commit/8ecf93ed))  
- **position:** 
  - correct positioning for SVG elements ([968e5407](http://github.com/angular-ui/bootstrap/commit/968e5407))  
- **tabs:** 
  - initial tab selection ([a08173ec](http://github.com/angular-ui/bootstrap/commit/a08173ec))  
- **timepicker:** 
  - use html5 for input elements ([53709f0f](http://github.com/angular-ui/bootstrap/commit/53709f0f))  
- **tooltip:** 
  - restore html-unsafe compatibility with AngularJS 1.2 ([08d8b21d](http://github.com/angular-ui/bootstrap/commit/08d8b21d))  
  - hide tooltips when content becomes empty ([cf5c27ae](http://github.com/angular-ui/bootstrap/commit/cf5c27ae))  
  - tackle DOM node and event handlers leak ([0d810acd](http://github.com/angular-ui/bootstrap/commit/0d810acd))  
- **typeahead:** 
  - do not set editable error when input is empty ([006986db](http://github.com/angular-ui/bootstrap/commit/006986db))  
  - remove popup flickering ([dde804b6](http://github.com/angular-ui/bootstrap/commit/dde804b6))  
  - don't show matches if an element is not focused ([d1f94530](http://github.com/angular-ui/bootstrap/commit/d1f94530))  
  - fix loading callback when deleting characters ([0149eff6](http://github.com/angular-ui/bootstrap/commit/0149eff6))  
  - prevent accidental form submission on ENTER ([253c49ff](http://github.com/angular-ui/bootstrap/commit/253c49ff))  
  - evaluate matches source against a correct scope ([fd21214d](http://github.com/angular-ui/bootstrap/commit/fd21214d))  
  - support IE8 ([0e9f9980](http://github.com/angular-ui/bootstrap/commit/0e9f9980))   

# 0.6.0 (2013-09-08)

## Features

- **modal:** 
  - rewrite $dialog as $modal ([d7a48523](http://github.com/angular-ui/bootstrap/commit/d7a48523))  
  - add support for custom window settings ([015625d1](http://github.com/angular-ui/bootstrap/commit/015625d1))  
  - expose $close and $dismiss options on modal's scope ([8d153acb](http://github.com/angular-ui/bootstrap/commit/8d153acb))  
- **pagination:** 
  - `total-items` & optional `items-per-page` API ([e55d9063](http://github.com/angular-ui/bootstrap/commit/e55d9063))  
- **rating:** 
  - add support for custom icons per instance ([20ab01ad](http://github.com/angular-ui/bootstrap/commit/20ab01ad))  
- **timepicker:** 
  - plug into `ngModel` controller ([b08e993f](http://github.com/angular-ui/bootstrap/commit/b08e993f))   

## Bug Fixes

- **carousel:** 
  - correct reflow triggering on FFox and Safari ([d34f2de1](http://github.com/angular-ui/bootstrap/commit/d34f2de1))  
- **datepicker:** 
  - correctly manage focus without jQuery present ([d474824b](http://github.com/angular-ui/bootstrap/commit/d474824b))  
  - compatibility with angular 1.1.5 and no jquery ([bf30898d](http://github.com/angular-ui/bootstrap/commit/bf30898d))  
  - use $setViewValue for inner changes ([dd99f35d](http://github.com/angular-ui/bootstrap/commit/dd99f35d))
- **modal:**
  - insert backdrop before modal window ([d870f212](http://github.com/angular-ui/bootstrap/commit/d870f212))
  - ie8 fix after $modal rewrite ([ff9d969e](http://github.com/angular-ui/bootstrap/commit/ff9d969e))
  - opening a modal should not change default options ([82532d1b](http://github.com/angular-ui/bootstrap/commit/82532d1b))
  - backdrop should cover previously opened modals ([7fce2fe8](http://github.com/angular-ui/bootstrap/commit/7fce2fe8))
  - allow replacing object with default options ([8e7fbf06](http://github.com/angular-ui/bootstrap/commit/8e7fbf06))
- **position:**
  - fallback for IE8's scrollTop/Left for offset ([9aecd4ed](http://github.com/angular-ui/bootstrap/commit/9aecd4ed))  
- **tabs:** 
  - add DI array-style annotations ([aac4a0dd](http://github.com/angular-ui/bootstrap/commit/aac4a0dd))  
  - evaluate `vertical` on parent scope ([9af6f96e](http://github.com/angular-ui/bootstrap/commit/9af6f96e))  
- **timepicker:** 
  - add type attribute for meridian button ([1f89fd4b](http://github.com/angular-ui/bootstrap/commit/1f89fd4b))  
- **tooltip:** 
  - remove placement='mouse' option ([17163c22](http://github.com/angular-ui/bootstrap/commit/17163c22))  
- **typeahead:** 
  - fix label rendering for equal model and items names ([5de71216](http://github.com/angular-ui/bootstrap/commit/5de71216))  
  - set validity flag for non-editable inputs ([366e0c8a](http://github.com/angular-ui/bootstrap/commit/366e0c8a))  
  - plug in front of existing parsers ([80cef614](http://github.com/angular-ui/bootstrap/commit/80cef614))  
  - highlight return match if no query ([45dd9be1](http://github.com/angular-ui/bootstrap/commit/45dd9be1))  
  - keep pop-up on clicking input ([5f9e270d](http://github.com/angular-ui/bootstrap/commit/5f9e270d))  
  - remove dependency on ng-bind-html-unsafe ([75893393](http://github.com/angular-ui/bootstrap/commit/75893393))   

## Breaking Changes

- **modal:**

* `$dialog` service was refactored into `$modal`
* `modal` directive was removed - use the `$modal` service instead

Check the documentation for the `$modal` service to migrate from `$dialog`

- **pagination:** 
 API has undergone some changes in order to be easier to use.
 * `current-page` is replaced from `page`.
 * Number of pages is not defined by `num-pages`, but from `total-items` &
  `items-per-page` instead. If `items-per-page` is missing, default is 10.
 * `num-pages` still exists but is just readonly.

  Before:

```html
  <pagination num-pages="10" ...></pagination>
```

  After:

```html
  <pagination total-items="100" ...></pagination>
```

- **tooltip:** 


The placment='mouse' is gone with no equivalent
 
# 0.5.0 (2013-08-04)

## Features

- **buttons:** 
  - support dynamic true / false values in btn-checkbox ([3e30cd94](http://github.com/angular-ui/bootstrap/commit/3e30cd94))  
- **datepicker:** 
  - `ngModelController` plug & new `datepickerPopup` ([dab18336](http://github.com/angular-ui/bootstrap/commit/dab18336))  
- **rating:** 
  - added onHover and onLeave. ([5b1115e3](http://github.com/angular-ui/bootstrap/commit/5b1115e3))  
- **tabs:** 
  - added onDeselect callback, used similarly as onSelect ([fe47c9bb](http://github.com/angular-ui/bootstrap/commit/fe47c9bb))  
  - add the ability to set the direction of the tabs ([220e7b60](http://github.com/angular-ui/bootstrap/commit/220e7b60))  
- **typeahead:** 
  - support custom templates for matched items ([e2238174](http://github.com/angular-ui/bootstrap/commit/e2238174))  
  - expose index to custom templates ([5ffae83d](http://github.com/angular-ui/bootstrap/commit/5ffae83d))   

## Bug Fixes

- **datepicker:** 
  - handle correctly `min`/`max` when cleared ([566bdd16](http://github.com/angular-ui/bootstrap/commit/566bdd16))  
  - add type attribute for buttons ([25caf5fb](http://github.com/angular-ui/bootstrap/commit/25caf5fb))  
- **pagination:** 
  - handle `currentPage` number as string ([b1fa7bb8](http://github.com/angular-ui/bootstrap/commit/b1fa7bb8))  
  - use interpolation for text attributes ([f45815cb](http://github.com/angular-ui/bootstrap/commit/f45815cb))  
- **popover:** 
  - don't unbind event handlers created by other directives ([56f624a2](http://github.com/angular-ui/bootstrap/commit/56f624a2))  
  - correctly position popovers appended to body ([93a82af0](http://github.com/angular-ui/bootstrap/commit/93a82af0))  
- **rating:** 
  - evaluate `max` attribute on parent scope ([60619d51](http://github.com/angular-ui/bootstrap/commit/60619d51))  
- **tabs:** 
  - make tab contents be correctly connected to parent (#524) ([be7ecff0](http://github.com/angular-ui/bootstrap/commit/be7ecff0))  
  - Make tabset template correctly use tabset attributes (#584) ([8868f236](http://github.com/angular-ui/bootstrap/commit/8868f236))  
  - fix tab content compiling wrong (Closes #599, #631, #574) ([224bc2f5](http://github.com/angular-ui/bootstrap/commit/224bc2f5))  
  - make tabs added with active=true be selected ([360cd5ca](http://github.com/angular-ui/bootstrap/commit/360cd5ca))  
  - if tab is active at start, always select it ([ba1f741d](http://github.com/angular-ui/bootstrap/commit/ba1f741d))  
- **timepicker:** 
  - prevent date change ([ee741707](http://github.com/angular-ui/bootstrap/commit/ee741707))  
  - added wheel event to enable mousewheel on Firefox ([8dc92afa](http://github.com/angular-ui/bootstrap/commit/8dc92afa))  
- **tooltip:** 
  - fix positioning inside scrolling element ([63ae7e12](http://github.com/angular-ui/bootstrap/commit/63ae7e12))  
  - triggers should be local to tooltip instances ([58e8ef4f](http://github.com/angular-ui/bootstrap/commit/58e8ef4f))  
  - correctly handle initial events unbinding ([4fd5bf43](http://github.com/angular-ui/bootstrap/commit/4fd5bf43))  
  - bind correct 'hide' event handler ([d50b0547](http://github.com/angular-ui/bootstrap/commit/d50b0547))  
- **typeahead:** 
  - play nicelly with existing formatters ([d2df0b35](http://github.com/angular-ui/bootstrap/commit/d2df0b35))  
  - properly render initial input value ([c4e169cb](http://github.com/angular-ui/bootstrap/commit/c4e169cb))  
  - separate text field rendering and drop down rendering ([ea1e858a](http://github.com/angular-ui/bootstrap/commit/ea1e858a))  
  - fixed waitTime functionality ([90a8aa79](http://github.com/angular-ui/bootstrap/commit/90a8aa79))  
  - correctly close popup on match selection ([624fd5f5](http://github.com/angular-ui/bootstrap/commit/624fd5f5))   

## Breaking Changes

- **pagination:** 
 The 'first-text', 'previous-text', 'next-text' and 'last-text'
  attributes are now interpolated.

  To migrate your code, remove quotes for constant attributes and/or
  interpolate scope variables.

  Before:

```html
  <pagination first-text="'<<'" ...></pagination>
```
  and/or

```html
  $scope.var1 = '<<';
  <pagination first-text="var1" ...></pagination>
```
  After:

```html
  <pagination first-text="<<" ...></pagination>
```
  and/or

```html
  $scope.var1 = '<<';
  <pagination first-text="{{var1}}" ...></pagination>
```

# 0.4.0 (2013-06-24)

## Features

- **buttons:** 
  - support dynamic values in btn-radio ([e8c5b548](http://github.com/angular-ui/bootstrap/commit/e8c5b548))  
- **carousel:** 
  - add option to prevent pause ([5f895c13](http://github.com/angular-ui/bootstrap/commit/5f895c13))  
- **datepicker:** 
  - add datepicker directive ([30a00a07](http://github.com/angular-ui/bootstrap/commit/30a00a07))  
- **pagination:** 
  - option for different mode when maxSize ([a023d082](http://github.com/angular-ui/bootstrap/commit/a023d082))  
  - add pager directive ([d9526475](http://github.com/angular-ui/bootstrap/commit/d9526475))  
- **tabs:** 
  - Change directive name, add features ([c5326595](http://github.com/angular-ui/bootstrap/commit/c5326595))  
  - support disabled state ([2b78dd16](http://github.com/angular-ui/bootstrap/commit/2b78dd16))  
  - add support for vertical option ([88d17a75](http://github.com/angular-ui/bootstrap/commit/88d17a75))  
  - add support for other navigation types, like 'pills' ([53e0a39f](http://github.com/angular-ui/bootstrap/commit/53e0a39f))  
- **timepicker:** 
  - add timepicker directive ([9bc5207b](http://github.com/angular-ui/bootstrap/commit/9bc5207b))  
- **tooltip:** 
  - add mouse placement option ([ace7bc60](http://github.com/angular-ui/bootstrap/commit/ace7bc60))
  - add *-append-to-body attribute ([d0896263](http://github.com/angular-ui/bootstrap/commit/d0896263))  
  - add custom trigger support ([dfa53155](http://github.com/angular-ui/bootstrap/commit/dfa53155))  
- **typeahead:** 
  - support typeahead-on-select callback ([91ac17c9](http://github.com/angular-ui/bootstrap/commit/91ac17c9))  
  - support wait-ms option ([7f35a3f2](http://github.com/angular-ui/bootstrap/commit/7f35a3f2))   

## Bug Fixes

- **accordion:** 
  - allow accordion heading directives as attributes. ([25f6e55c](http://github.com/angular-ui/bootstrap/commit/25f6e55c))
- **carousel:** 
  - do not allow user to change slide if transitioning ([1d19663f](http://github.com/angular-ui/bootstrap/commit/1d19663f))  
  - make slide 'active' binding optional ([17d6c3b5](http://github.com/angular-ui/bootstrap/commit/17d6c3b5))  
  - fix error with deleting multiple slides at once ([3fcb70f0](http://github.com/angular-ui/bootstrap/commit/3fcb70f0))  
- **dialog:** 
  - remove dialogOpenClass to get in line with v2.3 ([f009b23f](http://github.com/angular-ui/bootstrap/commit/f009b23f))  
- **pagination:** 
  - bind *-text attributes ([e1bff6b7](http://github.com/angular-ui/bootstrap/commit/e1bff6b7))  
- **progressbar:** 
  - user `percent` attribute instead of `value`. ([58efec80](http://github.com/angular-ui/bootstrap/commit/58efec80))  
- **tooltip:** 
  - fix positioning error when appendToBody is set to true ([76fee1f9](http://github.com/angular-ui/bootstrap/commit/76fee1f9))  
  - close tooltips appended to body on location change ([041261b5](http://github.com/angular-ui/bootstrap/commit/041261b5))  
  - tooltips will hide on scope.$destroy ([3e5a58e5](http://github.com/angular-ui/bootstrap/commit/3e5a58e5))  
  - support of custom $interpolate.startSymbol ([88c94ee6](http://github.com/angular-ui/bootstrap/commit/88c94ee6))  
  - make sure tooltip scope is evicted from cache ([9246905a](http://github.com/angular-ui/bootstrap/commit/9246905a))  
- **typeahead:** 
  - return focus to the input after selecting a suggestion ([04a21e33](http://github.com/angular-ui/bootstrap/commit/04a21e33))   

## Breaking Changes

- **pagination:** 
 The 'first-text', 'previous-text', 'next-text' and 'last-text'
  attributes are now binded to parent scope.

  To migrate your code, surround the text of these attributes with quotes.

  Before:
      
    ```html
    <pagination first-text="<<"></pagination>
    ```

  After:
    
    ```html
    <pagination first-text="'<<'"></pagination>
    ```

- **progressbar:** 
 The 'value' is replaced by 'percent'.

  Before:
    
    ```html
    <progress value="..."></progress>
    ```

  After:
    
    ```html
    <progress percent="..."></progress>
    ```

- **tabs:** 
 The 'tabs' directive has been renamed to 'tabset', and
 the 'pane' directive has been renamed to 'tab'.

    To migrate your code, follow the example below.

  Before:

    ```html
    <tabs>
      <pane heading="one">
        First Content
      </pane>
      <pane ng-repeat="apple in basket" heading="{{apple.heading}}">
        {{apple.content}}
      </pane>
    </tabs>
    ```

  After:

    ```html
    <tabset>
      <tab heading="one">
        First Content
      </tab>
      <tab ng-repeat="apple in basket" heading="{{apple.heading}}">
        {{apple.content}}
      </tab>
    </tabset>
    ```

 
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
