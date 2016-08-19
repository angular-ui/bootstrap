`$uibModal` is a service to create modal windows.
Creating modals is straightforward: create a template, a controller and reference them when using `$uibModal`.

The `$uibModal` service has only one method: `open(options)`.

### $uibModal's open function

#### options parameter

* `animation`
  _(Type: `boolean`, Default: `true`)_ -
  Set to false to disable animations on new modal/backdrop. Does not toggle animations for modals/backdrops that are already displayed.

* `appendTo`
  _(Type: `angular.element`, Default: `body`: Example: `$document.find('aside').eq(0)`)_ -
  Appends the modal to a specific element.

* `ariaDescribedBy`
  _(Type: `string`, `my-modal-description`)_ -
  Sets the [`aria-describedby`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-describedby) property on the modal. The value should be an id (without the leading `#`) pointing to the element that describes your modal. Typically, this will be the text on your modal, but does not include something the user would interact with, like buttons or a form. Omitting this option will not impact sighted users but will weaken your accessibility support.

* `ariaLabelledBy`
  _(Type: `string`, `my-modal-title`)_ -
  Sets the [`aria-labelledby`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby) property on the modal. The value should be an id (without the leading `#`) pointing to the element that labels your modal. Typically, this will be a header element. Omitting this option will not impact sighted users but will weaken your accessibility support.

* `backdrop`
  _(Type: `boolean|string`, Default: `true`)_ -
  Controls presence of a backdrop. Allowed values: `true` (default), `false` (no backdrop), `'static'` (disables modal closing by click on the backdrop).

* `backdropClass`
  _(Type: `string`)_ -
  Additional CSS class(es) to be added to a modal backdrop template.

* `bindToController`
  _(Type: `boolean`, Default: `false`)_ -
  When used with `controllerAs` & set to `true`, it will bind the $scope properties onto the controller.

* `component`
  _(Type: `string`, Example: `myComponent`)_ -
  A string reference to the component to be rendered that is registered with Angular's compiler. If using a directive, the directive must have `restrict: 'E'` and a template or templateUrl set.

  It supports these bindings:

  * `close` - A method that can be used to close a modal, passing a result. The result must be passed in this format: `{$value: myResult}`

  * `dismiss` - A method that can be used to dismiss a modal, passing a result. The result must be passed in this format: `{$value: myRejectedResult}`

  * `modalInstance` - The modal instance. This is the same `$uibModalInstance` injectable found when using `controller`.

  * `resolve` - An object of the modal resolve values. See [UI Router resolves](#ui-router-resolves) for details.

* `controller`
  _(Type: `function|string|array`, Example: `MyModalController`)_ -
  A controller for the modal instance, either a controller name as a string, or an inline controller function, optionally wrapped in array notation for dependency injection. Allows the controller-as syntax. Has a special `$uibModalInstance` injectable to access the modal instance.

* `controllerAs`
  _(Type: `string`, Example: `ctrl`)_ -
  An alternative to the controller-as syntax. Requires the `controller` option to be provided as well.

* `keyboard` -
  _(Type: `boolean`, Default: `true`)_ -
  Indicates whether the dialog should be closable by hitting the ESC key.

* `openedClass`
  _(Type: `string`, Default: `modal-open`)_ -
  Class added to the `body` element when the modal is opened.

* `resolve`
  _(Type: `Object`)_ -
  Members that will be resolved and passed to the controller as locals; it is equivalent of the `resolve` property in the router.

* `scope`
  _(Type: `$scope`)_ -
  The parent scope instance to be used for the modal's content. Defaults to `$rootScope`.

* `size`
  _(Type: `string`, Example: `lg`)_ -
  Optional suffix of modal window class. The value used is appended to the `modal-` class, i.e. a value of `sm` gives `modal-sm`.

* `template`
  _(Type: `string`)_ -
  Inline template representing the modal's content.

* `templateUrl`
  _(Type: `string`)_ -
  A path to a template representing modal's content. You need either a `template` or `templateUrl`.

* `windowClass`
  _(Type: `string`)_ -
  Additional CSS class(es) to be added to a modal window template.

* `windowTemplateUrl`
  _(Type: `string`, Default: `uib/template/modal/window.html`)_ -
  A path to a template overriding modal's window template.

* `windowTopClass`
  _(Type: `string`)_ -
  CSS class(es) to be added to the top modal window.

Global defaults may be set for `$uibModal` via `$uibModalProvider.options`.

#### return

The `open` method returns a modal instance, an object with the following properties:

* `close(result)`
  _(Type: `function`)_ -
  Can be used to close a modal, passing a result.

* `dismiss(reason)`
  _(Type: `function`)_ -
  Can be used to dismiss a modal, passing a reason.

* `result`
  _(Type: `promise`)_ -
  Is resolved when a modal is closed and rejected when a modal is dismissed.

* `opened`
  _(Type: `promise`)_ -
  Is resolved when a modal gets opened after downloading content's template and resolving all variables.

* `closed`
  _(Type: `promise`)_ -
  Is resolved when a modal is closed and the animation completes.

* `rendered`
  _(Type: `promise`)_ -
  Is resolved when a modal is rendered.

---

The scope associated with modal's content is augmented with:

* `$close(result)`
  _(Type: `function`)_ -
  A method that can be used to close a modal, passing a result.

* `$dismiss(reason)`
  _(Type: `function`)_ -
  A method that can be used to dismiss a modal, passing a reason.

Those methods make it easy to close a modal window without a need to create a dedicated controller.

Also, when using `bindToController`, you can define an `$onInit` method in the controller that will fire upon initialization.

---

Events fired:

* `$uibUnscheduledDestruction` -
  This event is fired if the $scope is destroyed via unexpected mechanism, such as it being passed in the modal options and a $route/$state transition occurs. The modal will also be dismissed.

* `modal.closing` -
  This event is broadcast to the modal scope before the modal closes. If the listener calls preventDefault() on the event, then the modal will remain open.
  Also, the `$close` and `$dismiss` methods returns true if the event was executed. This event also includes a parameter for the result/reason and a boolean that indicates whether the modal is being closed (true) or dismissed.

##### UI Router resolves

If one wants to have the modal resolve using [UI Router's](https://github.com/angular-ui/ui-router) pre-1.0 resolve mechanism, one can call `$uibResolve.setResolver('$resolve')` in the configuration phase of the application. One can also provide a custom resolver as well, as long as the signature conforms to UI Router's [$resolve](http://angular-ui.github.io/ui-router/site/#/api/ui.router.util.$resolve).

When the modal is opened with a controller, a `$resolve` object is exposed on the template with the resolved values from the resolve object. If using the component option, see details on how to access this object in component section of the modal documentation.
