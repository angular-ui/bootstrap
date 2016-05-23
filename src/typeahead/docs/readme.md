Typeahead is a AngularJS version of [Bootstrap v2's typeahead plugin](http://getbootstrap.com/2.3.2/javascript.html#typeahead).
This directive can be used to quickly create elegant typeaheads with any form text input.

It is very well integrated into AngularJS as it uses a subset of the
[select directive](http://docs.angularjs.org/api/ng.directive:select) syntax, which is very flexible. Supported expressions are:

* _label_ for _value_ in _sourceArray_
* _select_ as _label_ for _value_ in _sourceArray_

The `sourceArray` expression can use a special `$viewValue` variable that corresponds to the value entered inside the input.

This directive works with promises, meaning you can retrieve matches using the `$http` service with minimal effort.

### uib-typeahead settings

* `ng-model`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  Assignable angular expression to data-bind to.

* `ng-model-options`
  <small class="badge">$</small> -
  Options for ng-model (see [ng-model-options directive](https://docs.angularjs.org/api/ng/directive/ngModelOptions)). Currently supports the `debounce` and `getterSetter` options.

* `typeahead-append-to`
  <small class="badge">$</small>
  _(Default: `null`)_ -
  Should the typeahead popup be appended to an element instead of the parent element?

* `typeahead-append-to-body`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `false`)_ -
  Should the typeahead popup be appended to $body instead of the parent element?

* `typeahead-editable`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `true`)_ -
  Should it restrict model values to the ones selected from the popup only?

* `typeahead-focus-first`
  <small class="badge">$</small>
  _(Default: `true`)_ -
  Should the first match automatically be focused as you type?

* `typeahead-focus-on-select`
  _(Default: `true`)_ -
  On selection, focus the input element the typeahead directive is associated with.

* `typeahead-input-formatter`
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `undefined`)_ -
  Format the ng-model result after selection.

* `typeahead-is-open`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `angular.noop`)_ -
  Binding to a variable that indicates if the dropdown is open.

* `typeahead-loading`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `angular.noop`)_ -
  Binding to a variable that indicates if matches are being retrieved asynchronously.

* `typeahead-min-length`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `1`)_ -
  Minimal no of characters that needs to be entered before typeahead kicks-in. Must be greater than or equal to 0.

* `typeahead-no-results`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `angular.noop`)_ -
  Binding to a variable that indicates if no matching results were found.

* `typeahead-should-select($event)`
  <small class="badge">$</small>
  _(Default: `null`)_ -
  A callback executed when a `keyup` event that might trigger a selection occurs. Selection will only occur if this function returns true.

* `typeahead-on-select($item, $model, $label, $event)`
  <small class="badge">$</small>
  _(Default: `null`)_ -
  A callback executed when a match is selected. $event can be undefined if selection not triggered from a user event.

* `typeahead-popup-template-url`
  _(Default: `uib/template/typeahead/typeahead-popup.html`)_ -
  Set custom popup template.

* `typeahead-select-on-blur`
  <small class="badge">$</small>
  _(Default: `false`)_ -
  On blur, select the currently highlighted match.

* `typeahead-select-on-exact`
  <small class="badge">$</small>
  _(Default: `false`)_ -
  Automatically select the item when it is the only one that exactly matches the user input.

* `typeahead-show-hint`
  <small class="badge">$</small>
  _(Default: `false`)_ -
  Show hint when the first option matches.

* `typeahead-template-url`
  _(Default: `uib/template/typeahead/typeahead-match.html`)_ -
  Set custom item template.

* `typeahead-wait-ms`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i>
  _(Default: `0`)_ -
  Minimal wait time after last character typed before typeahead kicks-in.

* `uib-typeahead`
  <small class="badge">$</small>
  <i class="glyphicon glyphicon-eye-open"></i> -
  Comprehension Angular expression (see [select directive](http://docs.angularjs.org/api/ng.directive:select)).

**Notes**

If a custom template for the popup is used, the wrapper selector used for the match items is the `uib-typeahead-match` class.
