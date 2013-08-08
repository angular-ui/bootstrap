Typeahead is a AngularJS version of [Twitter Bootstrap typeahead plugin](http://twitter.github.com/bootstrap/javascript.html#typeahead).
This directive can be used to quickly create elegant typeheads with any form text input.

It is very well integrated into the AngularJS as it uses subset of the
[select directive](http://docs.angularjs.org/api/ng.directive:select) syntax, which is very flexible. Supported expressions:

* _label_ for _value_ in _sourceArray_
* _select_ as _label_ for _value_ in _sourceArray_

The `sourceArray` expression can use a special `$viewValue` variable that corresponds to a value entered inside input by a user.

Also this directive works with promises and it means that you can retrieve matches using the `$http` service with minimal effort.

The typeahead directives provide several attributes:

* `ng-model` <i class="icon-eye-open"></i>
   :
   Assignable angular expression to data-bind to

* `typeahead` <i class="icon-eye-open"></i>
   :
   Comprehension Angular expression (see [select directive](http://docs.angularjs.org/api/ng.directive:select))

* `typeahead-editable` <i class="icon-eye-open"></i>
   _(Defaults: true)_ :
   Should it restrict model values to the ones selected from the popup only ?

* `typeahead-input-formatter` <i class="icon-eye-open"></i>
   _(Defaults: undefined)_ :
   Format the ng-model result after selection

* `typeahead-loading` <i class="icon-eye-open"></i>
   _(Defaults: angular.noop)_ :
   Binding to a variable that indicates if matches are being retrieved asynchronously

* `typeahead-min-length` <i class="icon-eye-open"></i>
   _(Defaults: 1)_ :
   Minimal no of characters that needs to be entered before typeahead kicks-in

* `typeahead-on-select` <i class="icon-eye-open"></i>
   _(Defaults: null)_ :
   A callback executed when a match is selected

* `typeahead-template-url` <i class="icon-eye-open"></i>
   :
   Set custom item template

* `typeahead-wait-ms` <i class="icon-eye-open"></i>
   _(Defaults: 0)_ :
   Minimal wait time after last character typed before typehead kicks-in
