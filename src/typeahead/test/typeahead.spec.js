describe('typeahead tests', function() {
  var $scope, $compile, $document, $templateCache, $timeout, $window;
  var changeInputValueTo;

  beforeEach(module('ui.bootstrap.typeahead'));
  beforeEach(module('ngSanitize'));
  beforeEach(module('uib/template/typeahead/typeahead-popup.html'));
  beforeEach(module('uib/template/typeahead/typeahead-match.html'));
  beforeEach(module(function($compileProvider) {
    $compileProvider.directive('formatter', function() {
      return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
          ngModelCtrl.$formatters.unshift(function(viewVal) {
            return 'formatted' + viewVal;
          });
        }
      };
    });
    $compileProvider.directive('childDirective', function() {
      return {
          restrict: 'A',
          require: '^parentDirective',
          link: function(scope, element, attrs, ctrl) {}
      };
    });
  }));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$document_, _$templateCache_, _$timeout_, _$window_, $sniffer) {
    $scope = _$rootScope_;
    $scope.source = ['foo', 'bar', 'baz'];
    $scope.states = [
      {code: 'AL', name: 'Alaska'},
      {code: 'CL', name: 'California'}
    ];
    $compile = _$compile_;
    $document = _$document_;
    $templateCache = _$templateCache_;
    $timeout = _$timeout_;
    $window = _$window_;
    changeInputValueTo = function(element, value) {
      var inputEl = findInput(element);
      inputEl.val(value);
      inputEl.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
      $scope.$digest();
    };
  }));

  //utility functions
  var prepareInputEl = function(inputTpl) {
    var el = $compile(angular.element(inputTpl))($scope);
    $scope.$digest();
    return el;
  };

  var findInput = function(element) {
    return element.find('input');
  };

  var findDropDown = function(element) {
    return element.find('ul.dropdown-menu');
  };

  var findMatches = function(element) {
    return findDropDown(element).find('li');
  };

  var triggerKeyDown = function(element, keyCode, options) {
    options = options || {};
    var inputEl = findInput(element);
    var e = $.Event('keydown');
    e.which = keyCode;
    if (options.shiftKey) {
      e.shiftKey = true;
    }
    inputEl.trigger(e);
  };

  //custom matchers
  beforeEach(function () {
    jasmine.addMatchers({
      toBeClosed: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            var typeaheadEl = findDropDown(actual);

            var result = {
              pass: util.equals(typeaheadEl.hasClass('ng-hide'), true, customEqualityTesters)
            };

            if (result.pass) {
              result.message = 'Expected "' + angular.mock.dump(typeaheadEl) + '" not to be closed.';
            } else {
              result.message = 'Expected "' + angular.mock.dump(typeaheadEl) + '" to be closed.';
            }

            return result;
          }
        };
      },
      toBeOpenWithActive: function(util, customEqualityTesters) {
        return {
          compare: function(actual, noOfMatches, activeIdx) {
            var typeaheadEl = findDropDown(actual);
            var liEls = findMatches(actual);

            var result = {
              pass: util.equals(typeaheadEl.length, 1, customEqualityTesters) &&
                    util.equals(typeaheadEl.hasClass('ng-hide'), false, customEqualityTesters) &&
                    util.equals(liEls.length, noOfMatches, customEqualityTesters) &&
                    activeIdx === -1 ? !$(liEls).hasClass('active') : $(liEls[activeIdx]).hasClass('active')
            };

            if (result.pass) {
              result.message = 'Expected "' + actual + '" not to be opened.';
            } else {
              result.message = 'Expected "' + actual + '" to be opened.';
            }

            return result;
          }
        };
      }
    });
  });

  afterEach(function() {
    findDropDown($document.find('body')).remove();
  });

  //coarse grained, "integration" tests
  describe('initial state and model changes', function() {
    it('should be closed by default', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source"></div>');
      expect(element).toBeClosed();
    });

    it('should correctly render initial state if the "as" keyword is used', function() {
      $scope.result = $scope.states[0];

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="state as state.name for state in states"></div>');
      var inputEl = findInput(element);

      expect(inputEl.val()).toEqual('Alaska');
    });

    it('should default to bound model for initial rendering if there is not enough info to render label', function() {
      $scope.result = $scope.states[0].code;

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="state.code as state.name + state.code for state in states"></div>');
      var inputEl = findInput(element);

      expect(inputEl.val()).toEqual('AL');
    });

    it('should not get open on model change', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source"></div>');
      $scope.$apply(function () {
        $scope.result = 'foo';
      });
      expect(element).toBeClosed();
    });
  });

  describe('basic functionality', function() {
    it('should open and close typeahead based on matches', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);
      var ownsId = inputEl.attr('aria-owns');

      expect(inputEl.attr('aria-expanded')).toBe('false');
      expect(inputEl.attr('aria-activedescendant')).toBeUndefined();

      changeInputValueTo(element, 'ba');
      expect(element).toBeOpenWithActive(2, 0);
      expect(findDropDown(element).attr('id')).toBe(ownsId);
      expect(inputEl.attr('aria-expanded')).toBe('true');
      var activeOptionId = ownsId + '-option-0';
      expect(inputEl.attr('aria-activedescendant')).toBe(activeOptionId);
      expect(findDropDown(element).find('li.active').attr('id')).toBe(activeOptionId);

      changeInputValueTo(element, '');
      expect(element).toBeClosed();
      expect(inputEl.attr('aria-expanded')).toBe('false');
      expect(inputEl.attr('aria-activedescendant')).toBeUndefined();
    });

    it('should allow expressions over multiple lines', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source \n' +
        '| filter:$viewValue"></div>');
      changeInputValueTo(element, 'ba');
      expect(element).toBeOpenWithActive(2, 0);

      changeInputValueTo(element, '');
      expect(element).toBeClosed();
    });

    it('should not open typeahead if input value smaller than a defined threshold', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-min-length="2"></div>');
      changeInputValueTo(element, 'b');
      expect(element).toBeClosed();
    });


    it('should support changing min-length', function() {
        $scope.typeAheadMinLength = 2;	
        var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-min-length="typeAheadMinLength"></div>');

        changeInputValueTo(element, 'b');

        expect(element).toBeClosed();

        $scope.typeAheadMinLength = 0;
        $scope.$digest();
        changeInputValueTo(element, '');

        expect(element).toBeOpenWithActive(3, 0);

        $scope.typeAheadMinLength = 2;
        $scope.$digest();
        changeInputValueTo(element, 'b');

        expect(element).toBeClosed();
    });



    it('should support custom model selecting function', function() {
      $scope.updaterFn = function(selectedItem) {
        return 'prefix' + selectedItem;
      };
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="updaterFn(item) as item for item in source | filter:$viewValue"></div>');
      changeInputValueTo(element, 'f');
      triggerKeyDown(element, 13);
      expect($scope.result).toEqual('prefixfoo');
    });

    it('should support custom label rendering function', function() {
      $scope.formatterFn = function(sourceItem) {
        return 'prefix' + sourceItem;
      };

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item as formatterFn(item) for item in source | filter:$viewValue"></div>');
      changeInputValueTo(element, 'fo');
      var matchHighlight = findMatches(element).find('a').html();
      expect(matchHighlight).toEqual('prefix<strong>fo</strong>o');
    });

    it('should by default bind view value to model even if not part of matches', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual('not in matches');
    });

    it('should support the editable property to limit model bindings to matches only', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="false"></div>');
      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual(undefined);
    });

    it('should set validation errors for non-editable inputs', function() {
      var element = prepareInputEl(
        '<div><form name="form">' +
          '<input name="input" ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="false">' +
        '</form></div>');

      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual(undefined);
      expect($scope.form.input.$error.editable).toBeTruthy();

      changeInputValueTo(element, 'foo');
      triggerKeyDown(element, 13);
      expect($scope.result).toEqual('foo');
      expect($scope.form.input.$error.editable).toBeFalsy();
    });

    it('should not set editable validation error for empty input', function() {
      var element = prepareInputEl(
        '<div><form name="form">' +
          '<input name="input" ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="false">' +
        '</form></div>');

      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual(undefined);
      expect($scope.form.input.$error.editable).toBeTruthy();
      changeInputValueTo(element, '');
      expect($scope.result).toEqual(null);
      expect($scope.form.input.$error.editable).toBeFalsy();
    });

    it('should clear view value after blur for typeahead-editable="false"', function () {
        var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="false"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'not in matches');
        expect($scope.result).toEqual(undefined);
        expect(inputEl.val()).toEqual('not in matches');
        inputEl.blur(); // input loses focus
        expect($scope.result).toEqual(undefined);
        expect(inputEl.val()).toEqual('');
    });

    it('should clear view value when no value selected for typeahead-editable="false" typeahead-select-on-blur="false"', function () {
        var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="false" typeahead-select-on-blur="false"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'b');
        expect($scope.result).toEqual(undefined);
        expect(inputEl.val()).toEqual('b');
        inputEl.blur(); // input loses focus
        expect($scope.result).toEqual(undefined);
        expect(inputEl.val()).toEqual('');
    });

    it('should not clear view value when there is match but no value selected for typeahead-editable="false" typeahead-select-on-blur="true"', function () {
        var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="false" typeahead-select-on-blur="true"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'b');
        expect($scope.result).toEqual(undefined);
        expect(inputEl.val()).toEqual('b');
        inputEl.blur(); // input loses focus
        expect($scope.result).toEqual('bar');
        expect(inputEl.val()).toEqual('bar');
    });

    it('should support changing the editable property to limit model bindings to matches only', function() {
      $scope.isEditable = true;
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="isEditable"></div>');
      $scope.isEditable = false;
      $scope.$digest();
      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual(undefined);
    });

    it('should support changing the editable property to bind view value to model even if not part of matches', function() {
      $scope.isEditable = false;
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="isEditable"></div>');
      $scope.isEditable = true;
      $scope.$digest();
      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual('not in matches');
    });

    it('should bind loading indicator expression', inject(function($timeout) {
      $scope.isLoading = false;
      $scope.loadMatches = function(viewValue) {
        return $timeout(function() {
          return [];
        }, 1000);
      };

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in loadMatches()" typeahead-loading="isLoading"></div>');
      changeInputValueTo(element, 'foo');

      expect($scope.isLoading).toBeTruthy();
      $timeout.flush();
      expect($scope.isLoading).toBeFalsy();
    }));

    it('should support timeout before trying to match $viewValue', inject(function($timeout) {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-wait-ms="200"></div>');
      changeInputValueTo(element, 'foo');
      expect(element).toBeClosed();

      $timeout.flush();
      expect(element).toBeOpenWithActive(1, 0);
    }));

    it('should cancel old timeouts when something is typed within waitTime', inject(function($timeout) {
      var values = [];
      $scope.loadMatches = function(viewValue) {
        values.push(viewValue);
        return $scope.source;
      };
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in loadMatches($viewValue) | filter:$viewValue" typeahead-wait-ms="200"></div>');
      changeInputValueTo(element, 'first');
      changeInputValueTo(element, 'second');

      $timeout.flush();

      expect(values).not.toContain('first');
    }));

    it('should allow timeouts when something is typed after waitTime has passed', inject(function($timeout) {
      var values = [];

      $scope.loadMatches = function(viewValue) {
        values.push(viewValue);
        return $scope.source;
      };
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in loadMatches($viewValue) | filter:$viewValue" typeahead-wait-ms="200"></div>');

      changeInputValueTo(element, 'first');
      $timeout.flush();

      expect(values).toContain('first');

      changeInputValueTo(element, 'second');
      $timeout.flush();

      expect(values).toContain('second');
    }));

    it('should support custom popup templates', function() {
      $templateCache.put('custom.html', '<div class="custom">foo</div>');

      var element = prepareInputEl('<div><input ng-model="result" typeahead-popup-template-url="custom.html" uib-typeahead="state as state.name for state in states | filter:$viewValue"></div>');

      changeInputValueTo(element, 'Al');

      expect(element.find('.custom').text()).toBe('foo');
    });

    it('should support custom templates for matched items', function() {
      $templateCache.put('custom.html', '<p>{{ index }} {{ match.label }}</p>');

      var element = prepareInputEl('<div><input ng-model="result" typeahead-template-url="custom.html" uib-typeahead="state as state.name for state in states | filter:$viewValue"></div>');

      changeInputValueTo(element, 'Al');

      expect(findMatches(element).eq(0).find('p').text()).toEqual('0 Alaska');
    });

    it('should support directives which require controllers in custom templates for matched items', function() {
      $templateCache.put('custom.html', '<p child-directive>{{ index }} {{ match.label }}</p>');

      var element = prepareInputEl('<div><input ng-model="result" typeahead-template-url="custom.html" uib-typeahead="state as state.name for state in states | filter:$viewValue"></div>');

      element.data('$parentDirectiveController', {});

      changeInputValueTo(element, 'Al');

      expect(findMatches(element).eq(0).find('p').text()).toEqual('0 Alaska');
    });

    it('should throw error on invalid expression', function() {
      var prepareInvalidDir = function() {
        prepareInputEl('<div><input ng-model="result" uib-typeahead="an invalid expression"></div>');
      };
      expect(prepareInvalidDir).toThrow();
    });
  });

  describe('selecting a match', function() {
    it('should select a match on enter', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      triggerKeyDown(element, 13);

      expect($scope.result).toEqual('bar');
      expect(inputEl.val()).toEqual('bar');
      expect(element).toBeClosed();
    });

    it('should select a match on tab', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      triggerKeyDown(element, 9);

      expect($scope.result).toEqual('bar');
      expect(inputEl.val()).toEqual('bar');
      expect(element).toBeClosed();
    });

    it('should not select any match on blur without \'select-on-blur=true\' option', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      inputEl.blur(); // input loses focus

      // no change
      expect($scope.result).toEqual('b');
      expect(inputEl.val()).toEqual('b');
    });

    it('should select a match on blur with \'select-on-blur=true\' option', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-select-on-blur="true"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      inputEl.blur(); // input loses focus

      // first element should be selected
      expect($scope.result).toEqual('bar');
      expect(inputEl.val()).toEqual('bar');
    });

    it('should select match on click', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      var match = $(findMatches(element)[1]).find('a')[0];

      $(match).click();
      $scope.$digest();

      expect($scope.result).toEqual('baz');
      expect(inputEl.val()).toEqual('baz');
      expect(element).toBeClosed();
    });

    it('should invoke select callback on select', function() {
      $scope.onSelect = function($item, $model, $label, $event) {
        $scope.$item = $item;
        $scope.$model = $model;
        $scope.$label = $label;
        $scope.$event = $event;
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead-on-select="onSelect($item, $model, $label, $event)" uib-typeahead="state.code as state.name for state in states | filter:$viewValue"></div>');

      changeInputValueTo(element, 'Alas');
      triggerKeyDown(element, 13);

      expect($scope.result).toEqual('AL');
      expect($scope.$item).toEqual($scope.states[0]);
      expect($scope.$model).toEqual('AL');
      expect($scope.$label).toEqual('Alaska');
      expect($scope.$event.type).toEqual("keydown");
    });

    it('should correctly update inputs value on mapping where label is not derived from the model', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="state.code as state.name for state in states | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'Alas');
      triggerKeyDown(element, 13);

      expect($scope.result).toEqual('AL');
      expect(inputEl.val()).toEqual('AL');
    });

    it('should bind no results indicator as true when no matches returned', inject(function($timeout) {
      $scope.isNoResults = false;
      $scope.loadMatches = function(viewValue) {
        return $timeout(function() {
          return [];
        }, 1000);
      };

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in loadMatches()" typeahead-no-results="isNoResults"></div>');
      changeInputValueTo(element, 'foo');

      expect($scope.isNoResults).toBeFalsy();
      $timeout.flush();
      expect($scope.isNoResults).toBeTruthy();
    }));

    it('should bind no results indicator as false when matches are returned', inject(function($timeout) {
      $scope.isNoResults = false;
      $scope.loadMatches = function(viewValue) {
        return $timeout(function() {
          return [viewValue];
        }, 1000);
      };

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in loadMatches()" typeahead-no-results="isNoResults"></div>');
      changeInputValueTo(element, 'foo');

      expect($scope.isNoResults).toBeFalsy();
      $timeout.flush();
      expect($scope.isNoResults).toBeFalsy();
    }));

    it('should not focus the input if `typeahead-focus-on-select` is false', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-focus-on-select="false"></div>');
      $document.find('body').append(element);
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      var match = $(findMatches(element)[1]).find('a')[0];

      $(match).click();
      $scope.$digest();
      $timeout.flush();

      expect(document.activeElement).not.toBe(inputEl[0]);
      expect($scope.result).toEqual('baz');
    });
  });

  describe('select on exact match', function() {
    it('should select on an exact match when set', function() {
      $scope.onSelect = jasmine.createSpy('onSelect');
      var element = prepareInputEl('<div><input ng-model="result" typeahead-editable="false" typeahead-on-select="onSelect()" uib-typeahead="item for item in source | filter:$viewValue" typeahead-select-on-exact="true"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'bar');

      expect($scope.result).toEqual('bar');
      expect(inputEl.val()).toEqual('bar');
      expect(element).toBeClosed();
      expect($scope.onSelect).toHaveBeenCalled();
    });

    it('should not select on an exact match by default', function() {
      $scope.onSelect = jasmine.createSpy('onSelect');
      var element = prepareInputEl('<div><input ng-model="result" typeahead-editable="false" typeahead-on-select="onSelect()" uib-typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'bar');

      expect($scope.result).toBeUndefined();
      expect(inputEl.val()).toEqual('bar');
      expect($scope.onSelect.calls.any()).toBe(false);
    });

    it('should not be case sensitive when select on an exact match', function() {
      $scope.onSelect = jasmine.createSpy('onSelect');
      var element = prepareInputEl('<div><input ng-model="result" typeahead-editable="false" typeahead-on-select="onSelect()" uib-typeahead="item for item in source | filter:$viewValue" typeahead-select-on-exact="true"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'BaR');

      expect($scope.result).toEqual('bar');
      expect(inputEl.val()).toEqual('bar');
      expect(element).toBeClosed();
      expect($scope.onSelect).toHaveBeenCalled();
    });

    it('should not auto select when not a match with one potential result left', function() {
      $scope.onSelect = jasmine.createSpy('onSelect');
      var element = prepareInputEl('<div><input ng-model="result" typeahead-editable="false" typeahead-on-select="onSelect()" uib-typeahead="item for item in source | filter:$viewValue" typeahead-select-on-exact="true"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'fo');

      expect($scope.result).toBeUndefined();
      expect(inputEl.val()).toEqual('fo');
      expect($scope.onSelect.calls.any()).toBe(false);
    });
  });

  describe('is-open indicator', function () {
      var element;

      beforeEach(function () {
          element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-is-open="isOpen"></div>');
      });

      it('should bind is-open indicator as true when matches are returned', function () {
          expect($scope.isOpen).toBeFalsy();
          changeInputValueTo(element, 'b');
          expect($scope.isOpen).toBeTruthy();
      });

      it('should bind is-open indicator as false when no matches returned', function () {
          expect($scope.isOpen).toBeFalsy();
          changeInputValueTo(element, 'b');
          expect($scope.isOpen).toBeTruthy();
          changeInputValueTo(element, 'not match');
          expect($scope.isOpen).toBeFalsy();
      });

      it('should bind is-open indicator as false when a match is clicked', function () {
          expect($scope.isOpen).toBeFalsy();
          changeInputValueTo(element, 'b');
          expect($scope.isOpen).toBeTruthy();
          var match = findMatches(element).find('a').eq(0);

          match.click();
          $scope.$digest();
          expect($scope.isOpen).toBeFalsy();
      });
      it('should bind is-open indicator as false when click outside', function () {
          expect($scope.isOpen).toBeFalsy();
          changeInputValueTo(element, 'b');
          expect($scope.isOpen).toBeTruthy();
          $document.find('body').click();
          $scope.$digest();
          expect($scope.isOpen).toBeFalsy();
      });

      it('should bind is-open indicator as false on enter', function () {
          expect($scope.isOpen).toBeFalsy();
          changeInputValueTo(element, 'b');
          expect($scope.isOpen).toBeTruthy();
          triggerKeyDown(element, 13);
          expect($scope.isOpen).toBeFalsy();
      });

      it('should bind is-open indicator as false on tab', function () {
          expect($scope.isOpen).toBeFalsy();
          changeInputValueTo(element, 'b');
          expect($scope.isOpen).toBeTruthy();
          triggerKeyDown(element, 9);
          expect($scope.isOpen).toBeFalsy();
      });

      it('should bind is-open indicator as false on escape key', function () {
          expect($scope.isOpen).toBeFalsy();
          changeInputValueTo(element, 'b');
          expect($scope.isOpen).toBeTruthy();
          triggerKeyDown(element, 27);
          expect($scope.isOpen).toBeFalsy();
      });

      it('should bind is-open indicator as false input value smaller than a defined threshold', function () {
          var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-is-open="isToggled" typeahead-min-length="2"></div>');
          expect($scope.isToggled).toBeFalsy();
          changeInputValueTo(element, 'b');
          expect($scope.isToggled).toBeFalsy();
      });
  });

  describe('pop-up interaction', function() {
    var element;

    beforeEach(function() {
      element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
    });

    it('should activate prev/next matches on up/down keys', function() {
      changeInputValueTo(element, 'b');
      var parentNode = element.find('ul').eq(0)[0];
      var liIndex;

      liIndex = 0;
      expect(element).toBeOpenWithActive(2, liIndex);
      expect(parentNode.scrollTop).toEqual(element.find('li').eq(liIndex)[0].offsetTop);

      // Down arrow key
      triggerKeyDown(element, 40);
      liIndex = 1;
      expect(element).toBeOpenWithActive(2, liIndex);
      expect(parentNode.scrollTop).toEqual(element.find('li').eq(liIndex)[0].offsetTop);

      // Down arrow key goes back to first element
      triggerKeyDown(element, 40);
      liIndex = 0;
      expect(element).toBeOpenWithActive(2, liIndex);
      expect(parentNode.scrollTop).toEqual(element.find('li').eq(liIndex)[0].offsetTop);

      // Up arrow key goes back to last element
      triggerKeyDown(element, 38);
      liIndex = 1;
      expect(element).toBeOpenWithActive(2, liIndex);
      expect(parentNode.scrollTop).toEqual(element.find('li').eq(liIndex)[0].offsetTop);

      // Up arrow key goes back to first element
      triggerKeyDown(element, 38);
      liIndex = 0;
      expect(parentNode.scrollTop).toEqual(element.find('li').eq(liIndex)[0].offsetTop);
      expect(element).toBeOpenWithActive(2, liIndex);
    });

    it('should close popup on escape key', function() {
      changeInputValueTo(element, 'b');
      expect(element).toBeOpenWithActive(2, 0);

      // Escape key
      triggerKeyDown(element, 27);
      expect(element).toBeClosed();
    });

    it('should highlight match on mouseenter', function() {
      changeInputValueTo(element, 'b');
      expect(element).toBeOpenWithActive(2, 0);

      findMatches(element).eq(1).trigger('mouseenter');
      expect(element).toBeOpenWithActive(2, 1);
    });
  });

  describe('promises', function() {
    var element, deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      $scope.source = function() {
        return deferred.promise;
      };
      element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source()"></div>');
    }));

    it('should display matches from promise', function() {
      changeInputValueTo(element, 'c');
      expect(element).toBeClosed();

      deferred.resolve(['good', 'stuff']);
      $scope.$digest();
      expect(element).toBeOpenWithActive(2, 0);
    });

    it('should not display anything when promise is rejected', function() {
      changeInputValueTo(element, 'c');
      expect(element).toBeClosed();

      deferred.reject('fail');
      $scope.$digest();
      expect(element).toBeClosed();
    });

    it('PR #3178, resolves #2999 - should not return property "length" of undefined for undefined matches', function() {
      changeInputValueTo(element, 'c');
      expect(element).toBeClosed();

      deferred.resolve();
      $scope.$digest();
      expect(element).toBeClosed();
    });
  });

  describe('non-regressions tests', function() {

    it('issue 231 - closes matches popup on click outside typeahead', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');

      changeInputValueTo(element, 'b');

      $document.find('body').click();
      $scope.$digest();

      expect(element).toBeClosed();
    });

    it('issue 591 - initial formatting for un-selected match and complex label expression', function() {
      var inputEl = findInput(prepareInputEl('<div><input ng-model="result" uib-typeahead="state as state.name + \' \' + state.code for state in states | filter:$viewValue"></div>'));
      expect(inputEl.val()).toEqual('');
    });

    it('issue 786 - name of internal model should not conflict with scope model name', function() {
      $scope.state = $scope.states[0];
      var element = prepareInputEl('<div><input ng-model="state" uib-typeahead="state as state.name for state in states | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      expect(inputEl.val()).toEqual('Alaska');
    });

    it('issue 863 - it should work correctly with input type="email"', function() {
      $scope.emails = ['foo@host.com', 'bar@host.com'];
      var element = prepareInputEl('<div><input type="email" ng-model="email" uib-typeahead="email for email in emails | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'bar');
      expect(element).toBeOpenWithActive(1, 0);

      triggerKeyDown(element, 13);

      expect($scope.email).toEqual('bar@host.com');
      expect(inputEl.val()).toEqual('bar@host.com');
    });

    it('issue 964 - should not show popup with matches if an element is not focused', function() {
      $scope.items = function(viewValue) {
        return $timeout(function() {
          return [viewValue];
        });
      };
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in items($viewValue)"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'match');
      $scope.$digest();

      inputEl.blur();
      $timeout.flush();

      expect(element).toBeClosed();
    });

    it('should properly update loading callback if an element is not focused', function() {
      $scope.items = function(viewValue) {
        return $timeout(function(){
          return [viewValue];
        });
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead-loading="isLoading" uib-typeahead="item for item in items($viewValue)"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'match');
      $scope.$digest();

      inputEl.blur();
      $timeout.flush();

      expect($scope.isLoading).toBeFalsy();
    });

    it('issue 1140 - should properly update loading callback when deleting characters', function() {
      $scope.items = function(viewValue) {
        return $timeout(function() {
          return [viewValue];
        });
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead-min-length="2" typeahead-loading="isLoading" uib-typeahead="item for item in items($viewValue)"></div>');

      changeInputValueTo(element, 'match');
      $scope.$digest();

      expect($scope.isLoading).toBeTruthy();

      changeInputValueTo(element, 'm');
      $timeout.flush();
      $scope.$digest();

      expect($scope.isLoading).toBeFalsy();
    });

    it('should cancel old timeout when deleting characters', inject(function($timeout) {
      var values = [];
      $scope.loadMatches = function(viewValue) {
        values.push(viewValue);
        return $scope.source;
      };
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in loadMatches($viewValue) | filter:$viewValue" typeahead-min-length="2" typeahead-wait-ms="200"></div>');
      changeInputValueTo(element, 'match');
      changeInputValueTo(element, 'm');

      $timeout.flush();

      expect(values).not.toContain('match');
    }));

    describe('', function() {
      // Dummy describe to be able to create an after hook for this tests
      var element;

      it('does not close matches popup on click in input', function() {
        element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
        var inputEl = findInput(element);

        // Note that this bug can only be found when element is in the document
        $document.find('body').append(element);

        changeInputValueTo(element, 'b');

        inputEl.click();
        $scope.$digest();

        expect(element).toBeOpenWithActive(2, 0);
      });

      it('issue #1773 - should not trigger an error when used with ng-focus', function() {
        element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" ng-focus="foo()"></div>');
        var inputEl = findInput(element);

        // Note that this bug can only be found when element is in the document
        $document.find('body').append(element);

        changeInputValueTo(element, 'b');
        var match = $(findMatches(element)[1]).find('a')[0];

        $(match).click();
        $scope.$digest();
      });

      afterEach(function() {
        element.remove();
      });
    });

    it('issue #1238 - allow names like "query" to be used inside "in" expressions ', function() {
      $scope.query = function() {
        return ['foo', 'bar'];
      };

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in query($viewValue)"></div>');
      changeInputValueTo(element, 'bar');

      expect(element).toBeOpenWithActive(2, 0);
    });

    it('issue #3318 - should set model validity to true when set manually', function() {
      var element = prepareInputEl(
        '<div><form name="form">' +
          '<input name="input" ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-editable="false">' +
        '</form></div>');

      changeInputValueTo(element, 'not in matches');
      $scope.$apply(function() {
        $scope.result = 'manually set';
      });

      expect($scope.result).toEqual('manually set');
      expect($scope.form.input.$valid).toBeTruthy();
    });

    it('issue #3166 - should set \'parse\' key as valid when selecting a perfect match and not editable', function() {
      var element = prepareInputEl('<div ng-form="test"><input name="typeahead" ng-model="result" uib-typeahead="state as state.name for state in states | filter:$viewValue" typeahead-editable="false"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'Alaska');
      triggerKeyDown(element, 13);

      expect($scope.test.typeahead.$error.parse).toBeUndefined();
    });
  });

  describe('ng-model-options', function() {
    it('should support getterSetter', function() {
      function resultSetter(state) {
        return state;
      }
      $scope.result = resultSetter;
      var element = prepareInputEl('<div><input name="typeahead" ng-model="result" ng-model-options="{getterSetter: true}" uib-typeahead="state as state.name for state in states | filter:$viewValue" typeahead-editable="false"></div>');

      changeInputValueTo(element, 'Alaska');
      triggerKeyDown(element, 13);

      expect($scope.result).toBe(resultSetter);
    });

    describe('debounce as a number', function() {
      it('should work with selecting via keyboard', function() {
        element = prepareInputEl('<div><input name="typeahead" ng-model="result" ng-model-options="{debounce: 400}" uib-typeahead="state as state.name for state in states | filter:$viewvalue"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'Alaska');
        triggerKeyDown(element, 13);

        expect($scope.result).not.toBe('Alaska');

        $timeout.flush(400);

        expect($scope.result).toBe('Alaska');
      });

      it('should work with select on exact', function() {
        element = prepareInputEl('<div><input name="typeahead" ng-model="result" ng-model-options="{debounce: 400}" uib-typeahead="state as state.name for state in states | filter:$viewvalue" typeahead-select-on-exact="true"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'Alaska');

        expect($scope.result).not.toBe('Alaska');

        $timeout.flush(400);

        expect($scope.result).toBe('Alaska');
      });

      it('should work with selecting a match via click', function() {
        element = prepareInputEl('<div><input name="typeahead" ng-model="result" ng-model-options="{debounce: 400}" uib-typeahead="state as state.name for state in states | filter:$viewvalue"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'Alaska');
        var match = $(findMatches(element)[0]).find('a')[0];

        $(match).click();
        $scope.$digest();

        expect($scope.result).not.toBe('Alaska');

        $timeout.flush(400);

        expect($scope.result).toBe('Alaska');
      });
    });

    describe('debounce as an object', function() {
      it('should work with selecting via keyboard', function() {
        element = prepareInputEl('<div><input name="typeahead" ng-model="result" ng-model-options="{debounce: {default: 400, blur: 500}}" uib-typeahead="state as state.name for state in states | filter:$viewvalue"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'Alaska');
        triggerKeyDown(element, 13);

        expect($scope.result).not.toBe('Alaska');

        $timeout.flush(400);

        expect($scope.result).toBe('Alaska');
      });

      it('should work with select on exact', function() {
        element = prepareInputEl('<div><input name="typeahead" ng-model="result" ng-model-options="{debounce: {default: 400, blur: 500}}" uib-typeahead="state as state.name for state in states | filter:$viewvalue" typeahead-select-on-exact="true"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'Alaska');

        expect($scope.result).not.toBe('Alaska');

        $timeout.flush(400);

        expect($scope.result).toBe('Alaska');
      });

      it('should work with selecting a match via click', function() {
        element = prepareInputEl('<div><input name="typeahead" ng-model="result" ng-model-options="{debounce: {default: 400, blur: 500}}" uib-typeahead="state as state.name for state in states | filter:$viewvalue"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'Alaska');
        var match = $(findMatches(element)[0]).find('a')[0];

        $(match).click();
        $scope.$digest();

        expect($scope.result).not.toBe('Alaska');

        $timeout.flush(400);

        expect($scope.result).toBe('Alaska');
      });

      it('should work when blurring and select on blur', function() {
        element = prepareInputEl('<div><input name="typeahead" ng-model="result" ng-model-options="{debounce: {default: 400, blur: 500}}" uib-typeahead="state as state.name for state in states | filter:$viewvalue" typeahead-select-on-blur="true"></div>');
        var inputEl = findInput(element);

        changeInputValueTo(element, 'Alaska');
        element.blur();
        $scope.$digest();

        expect($scope.result).not.toBe('Alaska');

        $timeout.flush(500);

        expect($scope.result).toBe('Alaska');
      });
    });
  });

  describe('input formatting', function() {
    it('should co-operate with existing formatters', function() {
      $scope.result = $scope.states[0];

      var element = prepareInputEl('<div><input ng-model="result.name" formatter uib-typeahead="state.name for state in states | filter:$viewValue"></div>'),
      inputEl = findInput(element);

      expect(inputEl.val()).toEqual('formatted' + $scope.result.name);
    });

    it('should support a custom input formatting function', function() {
      $scope.result = $scope.states[0];
      $scope.formatInput = function($model) {
        return $model.code;
      };

      var element = prepareInputEl('<div><input ng-model="result" typeahead-input-formatter="formatInput($model)" uib-typeahead="state as state.name for state in states | filter:$viewValue"></div>'),
      inputEl = findInput(element);

      expect(inputEl.val()).toEqual('AL');
      expect($scope.result).toEqual($scope.states[0]);
    });
  });

  describe('input hint', function() {
    var element;

    beforeEach(function() {
      element = prepareInputEl('<div><input ng-model="result" uib-typeahead="state.name for state in states| filter:$viewValue" typeahead-show-hint="true"></div>');
    });

    it('should show hint when input matches first match', function() {
      var hintEl = findInput(element);

      expect(hintEl.val()).toEqual('');
      changeInputValueTo(element, 'Alas');
      expect(hintEl.val()).toEqual('Alaska');
    });

    it('should not show hint when input does not match first match', function() {
      var hintEl = findInput(element);

      expect(hintEl.val()).toEqual('');
      changeInputValueTo(element, 'las');
      expect(hintEl.val()).toEqual('');
    });

    it('should reset hint when a match is clicked', function() {
      var hintEl = findInput(element);

      expect(hintEl.val()).toEqual('');
      changeInputValueTo(element, 'Alas');
      expect(hintEl.val()).toEqual('Alaska');

      var match = findMatches(element).find('a').eq(0);
      match.click();
      $scope.$digest();
      expect(hintEl.val()).toEqual('');
    });

    it('should reset hint when click outside', function() {
      var hintEl = findInput(element);

      expect(hintEl.val()).toEqual('');
      changeInputValueTo(element, 'Alas');
      expect(hintEl.val()).toEqual('Alaska');

      $document.find('body').click();
      $scope.$digest();
      expect(hintEl.val()).toEqual('');
    });

    it('should reset hint on enter', function() {
      var hintEl = findInput(element);

      expect(hintEl.val()).toEqual('');
      changeInputValueTo(element, 'Alas');
      expect(hintEl.val()).toEqual('Alaska');
      triggerKeyDown(element, 13);
      expect(hintEl.val()).toEqual('');
    });

    it('should reset hint on tab', function() {
      var hintEl = findInput(element);

      expect(hintEl.val()).toEqual('');
      changeInputValueTo(element, 'Alas');
      expect(hintEl.val()).toEqual('Alaska');
      triggerKeyDown(element, 9);
      expect(hintEl.val()).toEqual('');
    });

    it('should reset hint on escape key', function() {
      var hintEl = findInput(element);

      expect(hintEl.val()).toEqual('');
      changeInputValueTo(element, 'Alas');
      expect(hintEl.val()).toEqual('Alaska');
      triggerKeyDown(element, 27);
      expect(hintEl.val()).toEqual('');
    });

    it("should set tab index on hint input element", function(){
      var hintEl = findInput(element);
      expect(hintEl.attr('tabindex')).toEqual('-1');
    });
  });

  describe('append to', function() {
    it('append typeahead results to element', function() {
      $document.find('body').append('<div id="myElement"></div>');
      $scope.myElement = $document.find('#myElement');
      var element = prepareInputEl('<div><input name="input" ng-model="result" uib-typeahead="item for item in states | filter:$viewValue" typeahead-append-to="myElement"></div>');
      changeInputValueTo(element, 'al');
      expect($document.find('#myElement')).toBeOpenWithActive(2, 0);
      $document.find('#myElement').remove();
    });
  });

  describe('append to body', function() {
    afterEach(function() {
      angular.element($window).off('resize');
      $document.find('body').off('scroll');
    });

    it('append typeahead results to body', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-append-to-body="true"></div>');
      changeInputValueTo(element, 'ba');
      expect($document.find('body')).toBeOpenWithActive(2, 0);
    });

    it('should not append to body when value of the attribute is false', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-append-to-body="false"></div>');
      changeInputValueTo(element, 'ba');
      expect(findDropDown($document.find('body')).length).toEqual(0);
    });

    it('should have right position after scroll', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-append-to-body="true"></div>');
      var dropdown = findDropDown($document.find('body'));
      var body = angular.element(document.body);

      // Set body height to allow scrolling
      body.css({height:'10000px'});

      // Scroll top
      window.scroll(0, 1000);

      // Set input value to show dropdown
      changeInputValueTo(element, 'ba');

      // Init position of dropdown must be 1000px
      expect(dropdown.css('top') ).toEqual('1000px');

      // After scroll, must have new position
      window.scroll(0, 500);
      body.triggerHandler('scroll');
      $timeout.flush();
      expect(dropdown.css('top')).toEqual('500px');
    });
  });

  describe('focus first', function() {
    it('should focus the first element by default', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue"></div>');
      changeInputValueTo(element, 'b');
      expect(element).toBeOpenWithActive(2, 0);

      // Down arrow key
      triggerKeyDown(element, 40);
      expect(element).toBeOpenWithActive(2, 1);

      // Down arrow key goes back to first element
      triggerKeyDown(element, 40);
      expect(element).toBeOpenWithActive(2, 0);

      // Up arrow key goes back to last element
      triggerKeyDown(element, 38);
      expect(element).toBeOpenWithActive(2, 1);

      // Up arrow key goes back to first element
      triggerKeyDown(element, 38);
      expect(element).toBeOpenWithActive(2, 0);
    });

    it('should not focus the first element until keys are pressed', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-focus-first="false"></div>');
      changeInputValueTo(element, 'b');
      expect(element).toBeOpenWithActive(2, -1);

      // Down arrow key goes to first element
      triggerKeyDown(element, 40);
      expect(element).toBeOpenWithActive(2, 0);

      // Down arrow key goes to second element
      triggerKeyDown(element, 40);
      expect(element).toBeOpenWithActive(2, 1);

      // Down arrow key goes back to first element
      triggerKeyDown(element, 40);
      expect(element).toBeOpenWithActive(2, 0);

      // Up arrow key goes back to last element
      triggerKeyDown(element, 38);
      expect(element).toBeOpenWithActive(2, 1);

      // Up arrow key goes back to first element
      triggerKeyDown(element, 38);
      expect(element).toBeOpenWithActive(2, 0);

      // New input goes back to no focus
      changeInputValueTo(element, 'a');
      changeInputValueTo(element, 'b');
      expect(element).toBeOpenWithActive(2, -1);

      // Up arrow key goes to last element
      triggerKeyDown(element, 38);
      expect(element).toBeOpenWithActive(2, 1);
    });
  });

  it('should not capture enter or tab when an item is not focused', function() {
    $scope.select_count = 0;
    $scope.onSelect = function($item, $model, $label) {
      $scope.select_count = $scope.select_count + 1;
    };
    var element = prepareInputEl('<div><input ng-model="result" ng-keydown="keyDownEvent = $event" uib-typeahead="item for item in source | filter:$viewValue" typeahead-on-select="onSelect($item, $model, $label)" typeahead-focus-first="false"></div>');
    changeInputValueTo(element, 'b');

    // enter key should not be captured when nothing is focused
    triggerKeyDown(element, 13);
    expect($scope.keyDownEvent.isDefaultPrevented()).toBeFalsy();
    expect($scope.select_count).toEqual(0);

    // tab key should close the dropdown when nothing is focused
    triggerKeyDown(element, 9);
    expect($scope.keyDownEvent.isDefaultPrevented()).toBeFalsy();
    expect($scope.select_count).toEqual(0);
    expect(element).toBeClosed();
  });

  it("should not capture tab when shift key is pressed", function(){
    $scope.select_count = 0;
    $scope.onSelect = function($item, $model, $label) {
      $scope.select_count = $scope.select_count + 1;
    };
    var element = prepareInputEl('<div><input ng-model="result" ng-keydown="keyDownEvent = $event" uib-typeahead="item for item in source | filter:$viewValue" typeahead-on-select="onSelect($item, $model, $label)" typeahead-focus-first="false"></div>');
    changeInputValueTo(element, 'b');

    // down key should be captured and focus first element
    triggerKeyDown(element, 40);

    triggerKeyDown(element, 9, {shiftKey: true});
    expect($scope.keyDownEvent.isDefaultPrevented()).toBeFalsy();
    expect($scope.select_count).toEqual(0);
    expect(element).toBeClosed();
  });

  it('should capture enter or tab when an item is focused', function() {
    $scope.select_count = 0;
    $scope.onSelect = function($item, $model, $label) {
      $scope.select_count = $scope.select_count + 1;
    };
    var element = prepareInputEl('<div><input ng-model="result" ng-keydown="keyDownEvent = $event" uib-typeahead="item for item in source | filter:$viewValue" typeahead-on-select="onSelect($item, $model, $label)" typeahead-focus-first="false"></div>');
    changeInputValueTo(element, 'b');

    // down key should be captured and focus first element
    triggerKeyDown(element, 40);
    expect($scope.keyDownEvent.isDefaultPrevented()).toBeTruthy();
    expect(element).toBeOpenWithActive(2, 0);

    // enter key should be captured now that something is focused
    triggerKeyDown(element, 13);
    expect($scope.keyDownEvent.isDefaultPrevented()).toBeTruthy();
    expect($scope.select_count).toEqual(1);
  });

  describe('minLength set to 0', function() {
    it('should open typeahead if input is changed to empty string if defined threshold is 0', function() {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-min-length="0"></div>');
      changeInputValueTo(element, '');
      expect(element).toBeOpenWithActive(3, 0);
    });

    it('should open typeahead when input is focused and value is empty if defined threshold is 0', function () {
      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-min-length="0"></div>');
      var inputEl = findInput(element);
      inputEl.focus();
      $timeout.flush();
      $scope.$digest();
      expect(element).toBeOpenWithActive(3, 0);
    });
  });

  describe('event listeners', function() {
    afterEach(function() {
      angular.element($window).off('resize');
      $document.find('body').off('scroll');
    });

    it('should register event listeners when attached to body', function() {
      spyOn(window, 'addEventListener');
      spyOn(document.body, 'addEventListener');

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-append-to-body="true"></div>');

      expect(window.addEventListener).toHaveBeenCalledWith('resize', jasmine.any(Function), false);
      expect(document.body.addEventListener).toHaveBeenCalledWith('scroll', jasmine.any(Function), false);
    });

    it('should remove event listeners when attached to body', function() {
      spyOn(window, 'removeEventListener');
      spyOn(document.body, 'removeEventListener');

      var element = prepareInputEl('<div><input ng-model="result" uib-typeahead="item for item in source | filter:$viewValue" typeahead-append-to-body="true"></div>');
      $scope.$destroy();

      expect(window.removeEventListener).toHaveBeenCalledWith('resize', jasmine.any(Function), false);
      expect(document.body.removeEventListener).toHaveBeenCalledWith('scroll', jasmine.any(Function), false);
    });
  });
});

describe('typeahead tests', function() {
  it('should allow directives in template to require parent controller', function() {
    module('ui.bootstrap.typeahead');
    module('ngSanitize');
    module('uib/template/typeahead/typeahead-popup.html');
    module(function($compileProvider) {
      $compileProvider
        .directive('uibCustomParent', function() {
          return {
            controller: function() {
              this.text = 'foo';
            }
          };
        })
        .directive('uibCustomDirective', function() {
          return {
            require: '^uibCustomParent',
            link: function(scope, element, attrs, ctrl) {
              scope.text = ctrl.text;
            }
          };
        });
    });

    inject(function($compile, $rootScope, $sniffer, $templateCache) {
      var element;
      var $scope = $rootScope.$new();
      $templateCache.put('uib/template/typeahead/typeahead-match.html', '<div uib-custom-directive>{{text}}</div>');
      $scope.states = [
        {code: 'AL', name: 'Alaska'},
        {code: 'CL', name: 'California'}
      ];

      element = $compile('<div uib-custom-parent><input ng-model="result" uib-typeahead="state.code as state.name + state.code for state in states"></div>')($scope);
      $rootScope.$digest();

      var inputEl = element.find('input');
      inputEl.val('Al');
      inputEl.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
      $scope.$digest();

      expect(element.find('ul.dropdown-menu li').eq(0).find('[uib-custom-directive]').text()).toEqual('foo');
    });
  });
});
