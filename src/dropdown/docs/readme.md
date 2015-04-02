
Dropdown is a simple directive which will toggle a dropdown menu on click or programmatically.
You can either use `is-open` to toggle or add inside a `<a dropdown-toggle>` element to toggle it when is clicked.
There is also the `on-toggle(open)` optional expression fired when dropdown changes state.

Add `dropdown-append-to-body` to the `dropdown` element to append to the inner `dropdown-menu` to the body.
This is useful when the dropdown button is inside a div with `overflow: hidden`, and the menu would otherwise be hidden.

By default the dropdown will automatically close if any of its elements is clicked, you can change this behavior by setting the `auto-close` option as follows:

  * `always` - (Default) automatically closes the dropdown when any of its elements is clicked.
  * `outsideClick` - closes the dropdown automatically only when the user clicks any element outside the dropdown.
  * `disabled` - disables the auto close. You can then control the open/close status of the dropdown manually, by using `is-open`. Please notice that the dropdown will still close if the toggle is clicked, the `esc` key is pressed or another dropdown is open.

