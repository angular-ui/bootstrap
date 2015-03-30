// jasmine matcher for expecting an element to have a css class
// https://github.com/angular/angular.js/blob/master/test/matchers.js
beforeEach(function() {
  jasmine.addMatchers({
    toHaveClass: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {
            pass: actual.hasClass(expected)
          };

          if (result.pass) {
            result.message = 'Expected "' + actual + '" not to have the "' + expected + '" class.';
          } else {
            result.message = 'Expected "' + actual + '" to have the "' + expected + '" class.';
          }

          return result;
        }
      }
    },
    toBeHidden: function(util, customEqualityTesters) {
      return {
        compare: function(actual) {
          var result = {
            pass: actual.hasClass('ng-hide') || actual.css('display') === 'none'
          };

          if (result.pass) {
            result.message = 'Expected "' + actual + '" not to be hidden';
          } else {
            result.message = 'Expected "' + actual + '" to be hidden';
          }

          return result;
        }
      }
    },
    toHaveFocus: function(util, customEqualityTesters) {
      return {
        compare: function(actual) {
          var result = {
            pass: document.activeElement === actual[0]
          };

          if (result.pass) {
            result.message = 'Expected "' + actual + '" not to have focus';
          } else {
            result.message = 'Expected "' + actual + '" to have focus';
          }

          return result;
        }
      }
    }
  });
});
