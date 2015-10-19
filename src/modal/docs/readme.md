`$uibModal` is a service to quickly create AngularJS-powered modal windows.
Creating custom modals is straightforward: create a partial view, its controller and reference them when using the service.

The `$uibModal` service has only one method: `open(options)` where available options are like follows:

* `templateUrl` - a path to a template representing modal's content
* `template` - inline template representing the modal's content
* `scope` - a scope instance to be used for the modal's content (actually the `$uibModal` service is going to create a child scope of a provided scope). Defaults to `$rootScope`
* `controller` - a controller for a modal instance - it can initialize scope used by modal. Accepts the "controller-as" syntax in the form 'SomeCtrl as myctrl'; can be injected with `$uibModalInstance`
* `controllerAs` - an alternative to the controller-as syntax, matching the API of directive definitions. Requires the `controller` option to be provided as well
* `bindToController` - when used with `controllerAs` & set to `true`, it will bind the $scope properties onto the controller directly
* `resolve` - members that will be resolved and passed to the controller as locals; it is equivalent of the `resolve` property for AngularJS routes
* `animation` - set to false to disable animations on new modal/backdrop. Does not toggle animations for modals/backdrops that are already displayed.
* `backdrop` - controls presence of a backdrop. Allowed values: true (default), false (no backdrop), `'static'` - backdrop is present but modal window is not closed when clicking outside of the modal window.
* `keyboard` - indicates whether the dialog should be closable by hitting the ESC key, defaults to true
* `backdropClass` - additional CSS class(es) to be added to a modal backdrop template
* `windowClass` - additional CSS class(es) to be added to a modal window template
* `windowTopClass` - CSS class(es) to be added to the top modal window
* `windowTemplateUrl` - a path to a template overriding modal's window template
* `size` - optional suffix of modal window class. The value used is appended to the `modal-` class, i.e. a value of `sm` gives `modal-sm`
* `openedClass` - class added to the `body` element when the modal is opened. Defaults to `modal-open`

Global defaults may be set for `$uibModal` via `$uibModalProvider.options`.

The `open` method returns a modal instance, an object with the following properties:

* `close(result)` - a method that can be used to close a modal, passing a result
* `dismiss(reason)` - a method that can be used to dismiss a modal, passing a reason
* `result` - a promise that is resolved when a modal is closed and rejected when a modal is dismissed
* `opened` - a promise that is resolved when a modal gets opened after downloading content's template and resolving all variables
* `rendered` - a promise that is resolved when a modal is rendered. 

In addition the scope associated with modal's content is augmented with 2 methods:

* `$close(result)`
* `$dismiss(reason)`

Those methods make it easy to close a modal window without a need to create a dedicated controller.

If the $scope is destroyed via unexpected mechanism, such as it being passed in the modal options and a $route/$state transition occurs, the modal will be dismissed with the value `$uibUnscheduledDestruction`.

Finally, a `modal.closing` event is broadcast to the modal scope before the modal closes.  If the listener calls 
preventDefault on the event, then the modal will remain open.  The $close and $dismiss methods return true if the 
event was allowed.  The event itself includes a parameter for the result/reason and a boolean parameter that indicates
whether the modal is being closed (true) or dismissed.
