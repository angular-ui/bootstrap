describe('typeahead tests', function () {

  var $scope, $compile, $document, $timeout;
  var changeInputValueTo;

  beforeEach(module('ui.bootstrap.typeahead'));
  beforeEach(module('template/typeahead/typeahead-popup.html'));
  beforeEach(module('template/typeahead/typeahead-match.html'));
  beforeEach(module(function($compileProvider) {
    $compileProvider.directive('formatter', function () {
      return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
          ngModelCtrl.$formatters.unshift(function (viewVal) {
            return 'formatted' + viewVal;
          });
        }
      };
    });
    $compileProvider.directive('childDirective', function () {
      return {
          restrict: 'A',
          require: '^parentDirective',
          link: function(scope, element, attrs, ctrl) {}
      };
    });
  }));
  beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_, $sniffer) {
    $scope = _$rootScope_;
    $scope.source = ['foo', 'bar', 'baz'];
    $scope.states = [
      {code: 'AL', name: 'Alaska'},
      {code: 'CL', name: 'California'}
    ];
    $compile = _$compile_;
    $document = _$document_;
    $timeout = _$timeout_;
    changeInputValueTo = function (element, value) {
      var inputEl = findInput(element);
      inputEl.val(value);
      inputEl.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
      $scope.$digest();
    };
  }));

  //utility functions
  var prepareInputEl = function (inputTpl) {
    var el = $compile(angular.element(inputTpl))($scope);
    $scope.$digest();
    return el;
  };

  var findInput = function (element) {
    return element.find('input');
  };

  var findDropDown = function (element) {
    return element.find('ul.dropdown-menu');
  };

  var findMatches = function (element) {
    return findDropDown(element).find('li');
  };

  var triggerKeyDown = function (element, keyCode) {
    var inputEl = findInput(element);
    var e = $.Event('keydown');
    e.which = keyCode;
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

  afterEach(function () {
    findDropDown($document.find('body')).remove();
  });

  //coarse grained, "integration" tests
  describe('initial state and model changes', function () {

    it('should be closed by default', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source"></div>');
      expect(element).toBeClosed();
    });

    it('should correctly render initial state if the "as" keyword is used', function () {

      $scope.result = $scope.states[0];

      var element = prepareInputEl('<div><input ng-model="result" typeahead="state as state.name for state in states"></div>');
      var inputEl = findInput(element);

      expect(inputEl.val()).toEqual('Alaska');
    });

    it('should default to bound model for initial rendering if there is not enough info to render label', function () {

      $scope.result = $scope.states[0].code;

      var element = prepareInputEl('<div><input ng-model="result" typeahead="state.code as state.name + state.code for state in states"></div>');
      var inputEl = findInput(element);

      expect(inputEl.val()).toEqual('AL');
    });

    it('should not get open on model change', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source"></div>');
      $scope.$apply(function () {
        $scope.result = 'foo';
      });
      expect(element).toBeClosed();
    });
  });

  describe('basic functionality', function () {

    it('should open and close typeahead based on matches', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
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

    it('should allow expressions over multiple lines', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source \n' +
        '| filter:$viewValue"></div>');
      changeInputValueTo(element, 'ba');
      expect(element).toBeOpenWithActive(2, 0);

      changeInputValueTo(element, '');
      expect(element).toBeClosed();
    });

    it('should not open typeahead if input value smaller than a defined threshold', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-min-length="2"></div>');
      changeInputValueTo(element, 'b');
      expect(element).toBeClosed();
    });

    it('should support custom model selecting function', function () {
      $scope.updaterFn = function (selectedItem) {
        return 'prefix' + selectedItem;
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead="updaterFn(item) as item for item in source | filter:$viewValue"></div>');
      changeInputValueTo(element, 'f');
      triggerKeyDown(element, 13);
      expect($scope.result).toEqual('prefixfoo');
    });

    it('should support custom label rendering function', function () {
      $scope.formatterFn = function (sourceItem) {
        return 'prefix' + sourceItem;
      };

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item as formatterFn(item) for item in source | filter:$viewValue"></div>');
      changeInputValueTo(element, 'fo');
      var matchHighlight = findMatches(element).find('a').html();
      expect(matchHighlight).toEqual('prefix<strong>fo</strong>o');
    });

    it('should by default bind view value to model even if not part of matches', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual('not in matches');
    });

    it('should support the editable property to limit model bindings to matches only', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-editable="false"></div>');
      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual(undefined);
    });

    it('should set validation errors for non-editable inputs', function () {

      var element = prepareInputEl(
        '<div><form name="form">' +
          '<input name="input" ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-editable="false">' +
        '</form></div>');

      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual(undefined);
      expect($scope.form.input.$error.editable).toBeTruthy();

      changeInputValueTo(element, 'foo');
      triggerKeyDown(element, 13);
      expect($scope.result).toEqual('foo');
      expect($scope.form.input.$error.editable).toBeFalsy();
    });

    it('should not set editable validation error for empty input', function () {
      var element = prepareInputEl(
        '<div><form name="form">' +
          '<input name="input" ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-editable="false">' +
        '</form></div>');

      changeInputValueTo(element, 'not in matches');
      expect($scope.result).toEqual(undefined);
      expect($scope.form.input.$error.editable).toBeTruthy();
      changeInputValueTo(element, '');
      expect($scope.result).toEqual('');
      expect($scope.form.input.$error.editable).toBeFalsy();
    });

    it('should bind loading indicator expression', inject(function ($timeout) {

      $scope.isLoading = false;
      $scope.loadMatches = function (viewValue) {
        return $timeout(function () {
          return [];
        }, 1000);
      };

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in loadMatches()" typeahead-loading="isLoading"></div>');
      changeInputValueTo(element, 'foo');

      expect($scope.isLoading).toBeTruthy();
      $timeout.flush();
      expect($scope.isLoading).toBeFalsy();
    }));

    it('should support timeout before trying to match $viewValue', inject(function ($timeout) {

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-wait-ms="200"></div>');
      changeInputValueTo(element, 'foo');
      expect(element).toBeClosed();

      $timeout.flush();
      expect(element).toBeOpenWithActive(1, 0);
    }));

    it('should cancel old timeouts when something is typed within waitTime', inject(function ($timeout) {
      var values = [];
      $scope.loadMatches = function(viewValue) {
        values.push(viewValue);
        return $scope.source;
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in loadMatches($viewValue) | filter:$viewValue" typeahead-wait-ms="200"></div>');
      changeInputValueTo(element, 'first');
      changeInputValueTo(element, 'second');

      $timeout.flush();

      expect(values).not.toContain('first');
    }));

    it('should allow timeouts when something is typed after waitTime has passed', inject(function ($timeout) {
      var values = [];

      $scope.loadMatches = function(viewValue) {
        values.push(viewValue);
        return $scope.source;
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in loadMatches($viewValue) | filter:$viewValue" typeahead-wait-ms="200"></div>');

      changeInputValueTo(element, 'first');
      $timeout.flush();

      expect(values).toContain('first');

      changeInputValueTo(element, 'second');
      $timeout.flush();

      expect(values).toContain('second');
    }));

    it('should support custom templates for matched items', inject(function ($templateCache) {

      $templateCache.put('custom.html', '<p>{{ index }} {{ match.label }}</p>');

      var element = prepareInputEl('<div><input ng-model="result" typeahead-template-url="custom.html" typeahead="state as state.name for state in states | filter:$viewValue"></div>');

      changeInputValueTo(element, 'Al');

      expect(findMatches(element).eq(0).find('p').text()).toEqual('0 Alaska');
    }));

    it('should support directives which require controllers in custom templates for matched items', inject(function ($templateCache) {

      $templateCache.put('custom.html', '<p child-directive>{{ index }} {{ match.label }}</p>');

      var element = prepareInputEl('<div><input ng-model="result" typeahead-template-url="custom.html" typeahead="state as state.name for state in states | filter:$viewValue"></div>');

      element.data('$parentDirectiveController', {});

      changeInputValueTo(element, 'Al');

      expect(findMatches(element).eq(0).find('p').text()).toEqual('0 Alaska');
    }));

    it('should throw error on invalid expression', function () {
      var prepareInvalidDir = function () {
        prepareInputEl('<div><input ng-model="result" typeahead="an invalid expression"></div>');
      };
      expect(prepareInvalidDir).toThrow();
    });
  });

  describe('selecting a match', function () {

    it('should select a match on enter', function () {

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      triggerKeyDown(element, 13);

      expect($scope.result).toEqual('bar');
      expect(inputEl.val()).toEqual('bar');
      expect(element).toBeClosed();
    });

    it('should select a match on tab', function () {

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      triggerKeyDown(element, 9);

      expect($scope.result).toEqual('bar');
      expect(inputEl.val()).toEqual('bar');
      expect(element).toBeClosed();
    });

    it('should not select any match on blur without \'select-on-blur=true\' option', function () {

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      inputEl.blur(); // input loses focus

      // no change
      expect($scope.result).toEqual('b');
      expect(inputEl.val()).toEqual('b');
    });

    it('should select a match on blur with \'select-on-blur=true\' option', function () {

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-select-on-blur="true"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      inputEl.blur(); // input loses focus

      // first element should be selected
      expect($scope.result).toEqual('bar');
      expect(inputEl.val()).toEqual('bar');
    });

    it('should select match on click', function () {

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'b');
      var match = $(findMatches(element)[1]).find('a')[0];

      $(match).click();
      $scope.$digest();

      expect($scope.result).toEqual('baz');
      expect(inputEl.val()).toEqual('baz');
      expect(element).toBeClosed();
    });

    it('should invoke select callback on select', function () {

      $scope.onSelect = function ($item, $model, $label) {
        $scope.$item = $item;
        $scope.$model = $model;
        $scope.$label = $label;
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead-on-select="onSelect($item, $model, $label)" typeahead="state.code as state.name for state in states | filter:$viewValue"></div>');

      changeInputValueTo(element, 'Alas');
      triggerKeyDown(element, 13);

      expect($scope.result).toEqual('AL');
      expect($scope.$item).toEqual($scope.states[0]);
      expect($scope.$model).toEqual('AL');
      expect($scope.$label).toEqual('Alaska');
    });

    it('should correctly update inputs value on mapping where label is not derived from the model', function () {

      var element = prepareInputEl('<div><input ng-model="result" typeahead="state.code as state.name for state in states | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'Alas');
      triggerKeyDown(element, 13);

      expect($scope.result).toEqual('AL');
      expect(inputEl.val()).toEqual('AL');
    });
  });

  describe('pop-up interaction', function () {
    var element;

    beforeEach(function () {
      element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
    });

    it('should activate prev/next matches on up/down keys', function () {
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

    it('should close popup on escape key', function () {
      changeInputValueTo(element, 'b');
      expect(element).toBeOpenWithActive(2, 0);

      // Escape key
      triggerKeyDown(element, 27);
      expect(element).toBeClosed();
    });

    it('should highlight match on mouseenter', function () {
      changeInputValueTo(element, 'b');
      expect(element).toBeOpenWithActive(2, 0);

      findMatches(element).eq(1).trigger('mouseenter');
      expect(element).toBeOpenWithActive(2, 1);
    });

  });

  describe('promises', function () {
    var element, deferred;

    beforeEach(inject(function ($q) {
      deferred = $q.defer();
      $scope.source = function () {
        return deferred.promise;
      };
      element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source()"></div>');
    }));

    it('should display matches from promise', function () {
      changeInputValueTo(element, 'c');
      expect(element).toBeClosed();

      deferred.resolve(['good', 'stuff']);
      $scope.$digest();
      expect(element).toBeOpenWithActive(2, 0);
    });

    it('should not display anything when promise is rejected', function () {
      changeInputValueTo(element, 'c');
      expect(element).toBeClosed();

      deferred.reject('fail');
      $scope.$digest();
      expect(element).toBeClosed();
    });

    it('PR #3178, resolves #2999 - should not return property "length" of undefined for undefined matches', function () {
      changeInputValueTo(element, 'c');
      expect(element).toBeClosed();

      deferred.resolve();
      $scope.$digest();
      expect(element).toBeClosed();
    });

  });

  describe('non-regressions tests', function () {

    it('issue 231 - closes matches popup on click outside typeahead', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');

      changeInputValueTo(element, 'b');

      $document.find('body').click();
      $scope.$digest();

      expect(element).toBeClosed();
    });

    it('issue 591 - initial formatting for un-selected match and complex label expression', function () {

      var inputEl = findInput(prepareInputEl('<div><input ng-model="result" typeahead="state as state.name + \' \' + state.code for state in states | filter:$viewValue"></div>'));
      expect(inputEl.val()).toEqual('');
    });

    it('issue 786 - name of internal model should not conflict with scope model name', function () {
      $scope.state = $scope.states[0];
      var element = prepareInputEl('<div><input ng-model="state" typeahead="state as state.name for state in states | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      expect(inputEl.val()).toEqual('Alaska');
    });

    it('issue 863 - it should work correctly with input type="email"', function () {

      $scope.emails = ['foo@host.com', 'bar@host.com'];
      var element = prepareInputEl('<div><input type="email" ng-model="email" typeahead="email for email in emails | filter:$viewValue"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'bar');
      expect(element).toBeOpenWithActive(1, 0);

      triggerKeyDown(element, 13);

      expect($scope.email).toEqual('bar@host.com');
      expect(inputEl.val()).toEqual('bar@host.com');
    });

    it('issue 964 - should not show popup with matches if an element is not focused', function () {

      $scope.items = function(viewValue) {
        return $timeout(function(){
          return [viewValue];
        });
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in items($viewValue)"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'match');
      $scope.$digest();

      inputEl.blur();
      $timeout.flush();

      expect(element).toBeClosed();
    });

    it('should properly update loading callback if an element is not focused', function () {

      $scope.items = function(viewValue) {
        return $timeout(function(){
          return [viewValue];
        });
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead-loading="isLoading" typeahead="item for item in items($viewValue)"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'match');
      $scope.$digest();

      inputEl.blur();
      $timeout.flush();

      expect($scope.isLoading).toBeFalsy();
    });

    it('issue 1140 - should properly update loading callback when deleting characters', function () {

      $scope.items = function(viewValue) {
        return $timeout(function(){
          return [viewValue];
        });
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead-min-length="2" typeahead-loading="isLoading" typeahead="item for item in items($viewValue)"></div>');

      changeInputValueTo(element, 'match');
      $scope.$digest();

      expect($scope.isLoading).toBeTruthy();

      changeInputValueTo(element, 'm');
      $timeout.flush();
      $scope.$digest();

      expect($scope.isLoading).toBeFalsy();
    });

    it('should cancel old timeout when deleting characters', inject(function ($timeout) {
      var values = [];
      $scope.loadMatches = function(viewValue) {
        values.push(viewValue);
        return $scope.source;
      };
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in loadMatches($viewValue) | filter:$viewValue" typeahead-min-length="2" typeahead-wait-ms="200"></div>');
      changeInputValueTo(element, 'match');
      changeInputValueTo(element, 'm');

      $timeout.flush();

      expect(values).not.toContain('match');
    }));

    describe('', function() {
      // Dummy describe to be able to create an after hook for this tests
      var element;

      it('does not close matches popup on click in input', function () {
        element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
        var inputEl = findInput(element);

        // Note that this bug can only be found when element is in the document
        $document.find('body').append(element);

        changeInputValueTo(element, 'b');

        inputEl.click();
        $scope.$digest();

        expect(element).toBeOpenWithActive(2, 0);
      });

      it('issue #1773 - should not trigger an error when used with ng-focus', function () {
        element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" ng-focus="foo()"></div>');
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

    it('issue #1238 - allow names like "query" to be used inside "in" expressions ', function () {

      $scope.query = function() {
        return ['foo', 'bar'];
      };

      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in query($viewValue)"></div>');
      changeInputValueTo(element, 'bar');

      expect(element).toBeOpenWithActive(2, 0);
    });

    it('issue #3318 - should set model validity to true when set manually', function () {

      var element = prepareInputEl(
        '<div><form name="form">' +
          '<input name="input" ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-editable="false">' +
        '</form></div>');

      changeInputValueTo(element, 'not in matches');
      $scope.$apply(function () {
        $scope.result = 'manually set';
      });

      expect($scope.result).toEqual('manually set');
      expect($scope.form.input.$valid).toBeTruthy();
    });

    it('issue #3166 - should set \'parse\' key as valid when selecting a perfect match and not editable', function () {
      var element = prepareInputEl('<div ng-form="test"><input name="typeahead" ng-model="result" typeahead="state as state.name for state in states | filter:$viewValue" typeahead-editable="false"></div>');
      var inputEl = findInput(element);

      changeInputValueTo(element, 'Alaska');
      triggerKeyDown(element, 13);

      expect($scope.test.typeahead.$error.parse).toBeUndefined();
    });
  });

  describe('input formatting', function () {

    it('should co-operate with existing formatters', function () {

      $scope.result = $scope.states[0];

      var element = prepareInputEl('<div><input ng-model="result.name" formatter typeahead="state.name for state in states | filter:$viewValue"></div>'),
      inputEl = findInput(element);

      expect(inputEl.val()).toEqual('formatted' + $scope.result.name);
    });

    it('should support a custom input formatting function', function () {

      $scope.result = $scope.states[0];
      $scope.formatInput = function($model) {
        return $model.code;
      };

      var element = prepareInputEl('<div><input ng-model="result" typeahead-input-formatter="formatInput($model)" typeahead="state as state.name for state in states | filter:$viewValue"></div>'),
      inputEl = findInput(element);

      expect(inputEl.val()).toEqual('AL');
      expect($scope.result).toEqual($scope.states[0]);
    });


  });

  describe('append to body', function () {
    it('append typeahead results to body', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-append-to-body="true"></div>');
      changeInputValueTo(element, 'ba');
      expect($document.find('body')).toBeOpenWithActive(2, 0);
    });

    it('should not append to body when value of the attribute is false', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-append-to-body="false"></div>');
      changeInputValueTo(element, 'ba');
      expect(findDropDown($document.find('body')).length).toEqual(0);
    });

    it('should have right position after scroll', function() {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-append-to-body="true"></div>');
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
      expect(dropdown.css('top') ).toEqual('500px');
    });
  });

  describe('focus first', function () {
    it('should focus the first element by default', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue"></div>');
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

    it('should not focus the first element until keys are pressed', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-focus-first="false"></div>');
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

  it('should not capture enter or tab when an item is not focused', function () {
    $scope.select_count = 0;
    $scope.onSelect = function ($item, $model, $label) {
      $scope.select_count = $scope.select_count + 1;
    };
    var element = prepareInputEl('<div><input ng-model="result" ng-keydown="keyDownEvent = $event" typeahead="item for item in source | filter:$viewValue" typeahead-on-select="onSelect($item, $model, $label)" typeahead-focus-first="false"></div>');
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

  it('should capture enter or tab when an item is focused', function () {
    $scope.select_count = 0;
    $scope.onSelect = function ($item, $model, $label) {
      $scope.select_count = $scope.select_count + 1;
    };
    var element = prepareInputEl('<div><input ng-model="result" ng-keydown="keyDownEvent = $event" typeahead="item for item in source | filter:$viewValue" typeahead-on-select="onSelect($item, $model, $label)" typeahead-focus-first="false"></div>');
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

  describe('minLength set to 0', function () {
    it('should open typeahead if input is changed to empty string if defined threshold is 0', function () {
      var element = prepareInputEl('<div><input ng-model="result" typeahead="item for item in source | filter:$viewValue" typeahead-min-length="0"></div>');
      changeInputValueTo(element, '');

      expect(element).toBeOpenWithActive(3, 0);
    });
  });

});
