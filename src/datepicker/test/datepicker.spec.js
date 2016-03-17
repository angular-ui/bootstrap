describe('datepicker', function() {
  var $rootScope, $compile, $templateCache, element;
  beforeEach(module('ui.bootstrap.datepicker'));
  beforeEach(module('uib/template/datepicker/datepicker.html'));
  beforeEach(module('uib/template/datepicker/day.html'));
  beforeEach(module('uib/template/datepicker/month.html'));
  beforeEach(module('uib/template/datepicker/year.html'));
  beforeEach(module('uib/template/datepicker/popup.html'));
  beforeEach(module(function($compileProvider) {
    $compileProvider.directive('dateModel', function() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, modelController) {
          modelController.$formatters.push(function(object) {
            return new Date(object.date);
          });

          modelController.$parsers.push(function(date) {
            return {
              type: 'date',
              date: date.toUTCString()
            };
          });
        }
      };
    });
  }));

  function getTitleButton() {
    return element.find('th').eq(1).find('button').first();
  }

  function getTitle() {
    return getTitleButton().text();
  }

  function clickTitleButton() {
    getTitleButton().click();
  }

  function clickPreviousButton(times) {
    var el = element.find('th').eq(0).find('button').eq(0);
    for (var i = 0, n = times || 1; i < n; i++) {
      el.click();
    }
  }

  function clickNextButton() {
    element.find('th').eq(2).find('button').eq(0).click();
  }

  function getLabelsRow() {
    return element.find('thead').find('tr').eq(1);
  }

  function getLabels(dayMode) {
    var els = getLabelsRow().find('th'),
        labels = [];
    for (var i = dayMode ? 1 : 0, n = els.length; i < n; i++) {
      labels.push(els.eq(i).text());
    }
    return labels;
  }

  function getWeeks() {
    var rows = element.find('tbody').find('tr'),
        weeks = [];
    for (var i = 0, n = rows.length; i < n; i++) {
      weeks.push(rows.eq(i).find('td').eq(0).first().text());
    }
    return weeks;
  }

  function getOptions(dayMode) {
    var tr = element.find('tbody').find('tr');
    var rows = [];

    for (var j = 0, numRows = tr.length; j < numRows; j++) {
      var cols = tr.eq(j).find('td'), days = [];
      for (var i = dayMode ? 1 : 0, n = cols.length; i < n; i++) {
        days.push(cols.eq(i).find('button').text());
      }
      rows.push(days);
    }
    return rows;
  }

  function clickOption(index) {
    getAllOptionsEl().eq(index).click();
  }

  function getAllOptionsEl(dayMode) {
    return element.find('tbody').find('button');
  }

  function selectedElementIndex() {
    var buttons = getAllOptionsEl();
    for (var i = 0; i < buttons.length; i++) {
      if (angular.element(buttons[i]).hasClass('btn-info')) {
        return i;
      }
    }
  }

  function expectSelectedElement(index) {
    var buttons = getAllOptionsEl();
    angular.forEach( buttons, function(button, idx) {
      expect(angular.element(button).hasClass('btn-info')).toBe(idx === index);
    });
  }

  function getSelectedElement(index) {
    var buttons = getAllOptionsEl();
    var el = $.grep(buttons, function(button, idx) {
      return angular.element(button).hasClass('btn-info');
    })[0];
    return angular.element(el);
  }

  function triggerKeyDown(element, key, ctrl) {
    var keyCodes = {
      'enter': 13,
      'space': 32,
      'pageup': 33,
      'pagedown': 34,
      'end': 35,
      'home': 36,
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
      'esc': 27
    };
    var e = $.Event('keydown');
    e.which = keyCodes[key];
    if (ctrl) {
      e.ctrlKey = true;
    }
    element.trigger(e);
  }

  describe('$datepickerSuppressError', function() {
    var $compile,
        $log,
        $scope;

    it('should not suppress log error message for ng-model date error by default', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      spyOn($log, 'error');
      element = $compile('<uib-datepicker ng-model="locals.date"></uib-datepicker>')($scope);

      $scope.locals = {
        date: 'lalala'
      };
      $scope.$digest();
      expect($log.error).toHaveBeenCalled();
    });

    it('should not suppress log error message for ng-model date error when false', function() {
      module(function($provide) {
        $provide.value('$datepickerSuppressError', false);
      });

      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      spyOn($log, 'error');
      element = $compile('<uib-datepicker ng-model="locals.date"></uib-datepicker>')($scope);

      $scope.locals = {
        date: 'lalala'
      };
      $scope.$digest();
      expect($log.error).toHaveBeenCalled();
    });

    it('should suppress log error message for ng-model date error when true', function() {
      module(function($provide) {
        $provide.value('$datepickerSuppressError', true);
      });

      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });
      spyOn($log, 'error');

      element = $compile('<uib-datepicker ng-model="locals.date"></uib-datepicker>')($scope);

      $scope.locals = {
        date: 'lalala'
      };
      $scope.$digest();
      expect($log.error).not.toHaveBeenCalled();
    });
  });

  // TODO: Remove on next minor release
  describe('uibDatepickerAttributeWarning', function() {
    var $compile,
      $log,
      $scope;

    it('should not log warning for datepickerOptions usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.opts = {};
      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" datepicker-options="opts"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for customClass attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date(),
        customClass: 'none'
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" custom-class="locals.customClass"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker customClass attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for customClass attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date(),
        customClass: 'none'
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" custom-class="locals.customClass"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for dateDisabled attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date(),
        dateDisabled: false
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" date-disabled="locals.dateDisabled"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker dateDisabled attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for dateDisabled attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date(),
        dateDisabled: false
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" date-disabled="locals.dateDisabled"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for datepickerMode attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date(),
        mode: 'day'
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" datepicker-mode="mode"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker datepickerMode attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for datepickerMode attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date(),
        mode: 'day'
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" datepicker-mode="mode"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatDay attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-day="dd"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker formatDay attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatDay attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-day="dd"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatMonth attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-month="MMMM"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker formatMonth attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatMonth attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-month="MMMM"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatYear attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-year="yyyy"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker formatYear attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatYear attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-year="yyyy"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatDayHeader attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-day-header="EEE"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker formatDayHeader attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatDayHeader attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-day-header="EEE"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatDayTitle attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-day-title="MMMM yyyy"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker formatDayTitle attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatDayTitle attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-day-title="MMMM yyyy"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatMonthTitle attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-month-title="yyyy"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker formatMonthTitle attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatMonthTitle attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" format-month-title="yyyy"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for showWeeks attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" show-weeks="true"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker showWeeks attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for showWeeks attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" show-weeks="true"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for shortcutPropagation attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" shortcut-propagation="false"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker shortcutPropagation attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for shortcutPropagation attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" shortcut-propagation="false"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for yearColumns attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" year-columns="5"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker yearColumns attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for yearColumns attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" year-columns="5"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for yearRows attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" year-rows="4"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker yearRows attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for yearRows attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" year-rows="5"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for minDate attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };
      $scope.minDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" min-date="minDate"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker minDate attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for minDate attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };
      $scope.minDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" min-date="minDate"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for maxDate attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };
      $scope.maxDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" max-date="maxDate"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker maxDate attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for maxDate attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };
      $scope.maxDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" max-date="maxDate"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for minMode attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" min-mode="year"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker minMode attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for minMode attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" min-mode="year"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for maxMode attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" max-mode="day"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker maxMode attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for maxMode attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" max-mode="day"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for initDate attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };
      $scope.initDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" init-date="initDate"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker initDate attribute usage is deprecated, use datepicker-options attribute instead');
    });

    it('should suppress warning for initDate attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.locals = {
        date: new Date()
      };
      $scope.initDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<uib-datepicker ng-model="locals.date" init-date="initDate"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });
  });

  // TODO: Remove on next minor release
  describe('uibDatepickerPopupAttributeWarning', function() {
    var $compile,
      $log,
      $scope;

    it('should not log warning for datepickerOptions usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();
      $scope.opts = {};

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="opts"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for customClass attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup custom-class="true"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for customClass attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup custom-class="true"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for dateDisabled attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup date-disabled="true"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for dateDisabled attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup date-disabled="true"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for minMode attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup min-mode="year"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for minMode attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup min-mode="year"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for maxMode attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup max-mode="day"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for maxMode attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup max-mode="day"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for shortcutPropagation attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup shortcut-propagation="false"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for shortcutPropagation attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup shortcut-propagation="false"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for minDate attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();
      $scope.minDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup min-date="minDate"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for minDate attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();
      $scope.minDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup min-date="minDate"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for maxDate attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();
      $scope.maxDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup max-date="maxDate"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for maxDate attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();
      $scope.maxDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup max-date="maxDate"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for initDate attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();
      $scope.initDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup init-date="initDate"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for initDate attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();
      $scope.initDate = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup init-date="initDate"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatDay attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-day="dd"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatDay attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-day="dd"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatMonth attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-month="MMMM"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatMonth attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-month="MMMM"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatYear attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-year="yyyy"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatYear attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-year="yyyy"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatDayHeader attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-day-header="EEE"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatDayHeader attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-day-header="EEE"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatDayTitle attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-day-title="MMMM"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatDayTitle attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-day-title="MMMM"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for formatMonthTitle attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-month-title="MMMM yyyy"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for formatMonthTitle attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup format-month-title="MMMM yyyy"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for showWeeks attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup show-weeks="true"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for showWeeks attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup show-weeks="true"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for startingDay attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup starting-day="0"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for startingDay attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup starting-day="0"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for yearColumns attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup year-columns="4"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for yearColumns attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup year-columns="4"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should log warning for yearRows attribute usage', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup year-rows="5"></div>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('uib-datepicker settings via uib-datepicker-popup attributes are deprecated and will be removed in UI Bootstrap 1.3, use datepicker-options attribute instead');
    });

    it('should suppress warning for yearRows attribute usage', function() {
      module(function($provide) {
        $provide.value('uibDatepickerPopupAttributeWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      $scope.date = new Date();

      spyOn($log, 'warn');
      element = $compile('<div><input ng-model="date" uib-datepicker-popup year-rows="5"></div>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });
  });

  describe('', function() {
    beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $rootScope.date = new Date('September 30, 2010 15:30:00');
      $templateCache = _$templateCache_;
    }));

    describe('with no initial date', function() {
      beforeEach(function() {
        jasmine.clock().install();
      });

      afterEach(function() {
        jasmine.clock().uninstall();
      });

      it('should have an active date equal to the current date', function() {
        var baseTime = new Date(2015, 2, 23);
        jasmine.clock().mockDate(baseTime);

        element = $compile('<uib-datepicker ng-model="fooDate"></uib-datepicker')($rootScope);
        $rootScope.$digest();

        expect(element.controller('uibDatepicker').activeDate.getTime()).toEqual(baseTime.getTime());
      });
    });

    it('should support custom templates', function() {
      $templateCache.put('foo/bar.html', '<div>baz</div>');

      element = $compile('<uib-datepicker ng-model="date" template-url="foo/bar.html"></uib-datepicker>')($rootScope);
      $rootScope.$digest();

      expect(element.html()).toBe('baz');
    });

    it('should support custom day, month and year templates', function() {
      $templateCache.put('foo/day.html', '<div>day</div>');
      $templateCache.put('foo/month.html', '<div>month</div>');
      $templateCache.put('foo/year.html', '<div>year</div>');

      $templateCache.put('foo/bar.html', '<div>' +
        '<uib-daypicker template-url="foo/day.html"></uib-daypicker>' +
        '<uib-monthpicker template-url="foo/month.html"></uib-monthpicker>' +
        '<uib-yearpicker template-url="foo/year.html"></uib-yearpicker>' +
      '</div>');

      element = $compile('<uib-datepicker ng-model="date" template-url="foo/bar.html"></uib-datepicker>')($rootScope);
      $rootScope.$digest();

      var expectedHtml = '<div template-url="foo/day.html">day</div><div template-url="foo/month.html">month</div><div template-url="foo/year.html">year</div>';

      expect(element.html()).toBe(expectedHtml);
    });

    it('should expose the controller in the template', function() {
      $templateCache.put('uib/template/datepicker/datepicker.html', '<div>{{datepicker.text}}</div>');

      element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
      $rootScope.$digest();

      var ctrl = element.controller('uib-datepicker');
      expect(ctrl).toBeDefined();
      expect(element.html()).toBe('');

      ctrl.text = 'baz';
      $rootScope.$digest();

      expect(element.html()).toBe('baz');
    });

    describe('basic functionality', function() {
      beforeEach(function() {
        element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('is has a `<table>` element', function() {
        expect(element.find('table').length).toBe(1);
      });

      it('shows the correct title', function() {
        expect(getTitle()).toBe('September 2010');
      });

      it('shows the label row & the correct day labels', function() {
        expect(getLabelsRow().css('display')).not.toBe('none');
        expect(getLabels(true)).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
      });

      it('renders the calendar days correctly', function() {
        expect(getOptions(true)).toEqual([
          ['29', '30', '31', '01', '02', '03', '04'],
          ['05', '06', '07', '08', '09', '10', '11'],
          ['12', '13', '14', '15', '16', '17', '18'],
          ['19', '20', '21', '22', '23', '24', '25'],
          ['26', '27', '28', '29', '30', '01', '02'],
          ['03', '04', '05', '06', '07', '08', '09']
        ]);
      });

      it('renders the week numbers based on ISO 8601', function() {
        expect(getWeeks()).toEqual(['35', '36', '37', '38', '39', '40']);
      });

      it('value is correct', function() {
        expect($rootScope.date).toEqual(new Date('September 30, 2010 15:30:00'));
      });

      it('has activeDate value of model', function() {
        expect(element.controller('uibDatepicker').activeDate).toEqual(new Date('September 30, 2010 15:30:00'));
      });

      it('has `selected` only the correct day', function() {
        expectSelectedElement(32);
      });

      it('has no `selected` day when model is cleared', function() {
        $rootScope.date = null;
        $rootScope.$digest();

        expect($rootScope.date).toBe(null);
        expectSelectedElement(null);
      });

      it('does not change current view when model is cleared', function() {
        $rootScope.date = null;
        $rootScope.$digest();

        expect($rootScope.date).toBe(null);
        expect(getTitle()).toBe('September 2010');
      });

      it('`disables` visible dates from other months', function() {
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).find('span').hasClass('text-muted')).toBe( index < 3 || index > 32 );
        });
      });

      it('updates the model when a day is clicked', function() {
        clickOption(17);
        expect($rootScope.date).toEqual(new Date('September 15, 2010 15:30:00'));
      });

      it('moves to the previous month & renders correctly when `previous` button is clicked', function() {
        clickPreviousButton();

        expect(getTitle()).toBe('August 2010');
        expect(getLabels(true)).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        expect(getOptions(true)).toEqual([
          ['01', '02', '03', '04', '05', '06', '07'],
          ['08', '09', '10', '11', '12', '13', '14'],
          ['15', '16', '17', '18', '19', '20', '21'],
          ['22', '23', '24', '25', '26', '27', '28'],
          ['29', '30', '31', '01', '02', '03', '04'],
          ['05', '06', '07', '08', '09', '10', '11']
        ]);

        expectSelectedElement(null, null);
      });

      it('updates the model only when a day is clicked in the `previous` month', function() {
        clickPreviousButton();
        expect($rootScope.date).toEqual(new Date('September 30, 2010 15:30:00'));

        clickOption(17);
        expect($rootScope.date).toEqual(new Date('August 18, 2010 15:30:00'));
      });

      it('moves to the next month & renders correctly when `next` button is clicked', function() {
        clickNextButton();

        expect(getTitle()).toBe('October 2010');
        expect(getLabels(true)).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        expect(getOptions(true)).toEqual([
          ['26', '27', '28', '29', '30', '01', '02'],
          ['03', '04', '05', '06', '07', '08', '09'],
          ['10', '11', '12', '13', '14', '15', '16'],
          ['17', '18', '19', '20', '21', '22', '23'],
          ['24', '25', '26', '27', '28', '29', '30'],
          ['31', '01', '02', '03', '04', '05', '06']
        ]);

        expectSelectedElement(4);
      });

      it('updates the model only when a day is clicked in the `next` month', function() {
        clickNextButton();
        expect($rootScope.date).toEqual(new Date('September 30, 2010 15:30:00'));

        clickOption(17);
        expect($rootScope.date).toEqual(new Date('October 13, 2010 15:30:00'));
      });

      it('updates the calendar when a day of another month is selected', function() {
        clickOption(33);
        expect($rootScope.date).toEqual(new Date('October 01, 2010 15:30:00'));
        expect(getTitle()).toBe('October 2010');
        expect(getLabels(true)).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        expect(getOptions(true)).toEqual([
          ['26', '27', '28', '29', '30', '01', '02'],
          ['03', '04', '05', '06', '07', '08', '09'],
          ['10', '11', '12', '13', '14', '15', '16'],
          ['17', '18', '19', '20', '21', '22', '23'],
          ['24', '25', '26', '27', '28', '29', '30'],
          ['31', '01', '02', '03', '04', '05', '06']
        ]);

        expectSelectedElement(5);
      });

      // issue #1697
      it('should not "jump" months', function() {
        $rootScope.date = new Date('January 30, 2014');
        $rootScope.$digest();
        clickNextButton();
        expect(getTitle()).toBe('February 2014');
        clickPreviousButton();
        expect(getTitle()).toBe('January 2014');
      });

      it('should not change model when going to next month - #5441', function() {
        $rootScope.date = new Date('January 30, 2014');
        $rootScope.$digest();
        clickNextButton();
        expect($rootScope.date).toEqual(new Date('January 30, 2014'));
      });

      describe('when `model` changes', function() {
        function testCalendar() {
          expect(getTitle()).toBe('November 2005');
          expect(getOptions(true)).toEqual([
            ['30', '31', '01', '02', '03', '04', '05'],
            ['06', '07', '08', '09', '10', '11', '12'],
            ['13', '14', '15', '16', '17', '18', '19'],
            ['20', '21', '22', '23', '24', '25', '26'],
            ['27', '28', '29', '30', '01', '02', '03'],
            ['04', '05', '06', '07', '08', '09', '10']
          ]);

          expectSelectedElement(8);
        }

        describe('to a Date object', function() {
          it('updates', function() {
            $rootScope.date = new Date('November 7, 2005 23:30:00');
            $rootScope.$digest();
            testCalendar();
            expect(angular.isDate($rootScope.date)).toBe(true);
          });

          it('to a date that is invalid, it doesn\`t update', function() {
            $rootScope.date = new Date('pizza');
            $rootScope.$digest();
            expect(getTitle()).toBe('September 2010');
            expect(angular.isDate($rootScope.date)).toBe(true);
            expect(isNaN($rootScope.date)).toBe(true);
          });
        });

        describe('not to a Date object', function() {
          it('to a Number, it updates calendar', function() {
            $rootScope.date = parseInt((new Date('November 7, 2005 23:30:00')).getTime(), 10);
            $rootScope.$digest();
            testCalendar();
            expect(angular.isNumber($rootScope.date)).toBe(true);
          });

          it('to a string that can be parsed by Date, it updates calendar', function() {
            $rootScope.date = 'November 7, 2005 23:30:00';
            $rootScope.$digest();
            testCalendar();
            expect(angular.isString($rootScope.date)).toBe(true);
          });

          it('to a string that cannot be parsed by Date, it doesn\'t update', function() {
            $rootScope.date = 'pizza';
            $rootScope.$digest();
            expect(getTitle()).toBe('September 2010');
            expect($rootScope.date).toBe('pizza');
          });
        });
      });

      it('does not loop between after max mode', function() {
        expect(getTitle()).toBe('September 2010');

        clickTitleButton();
        expect(getTitle()).toBe('2010');

        clickTitleButton();
        expect(getTitle()).toBe('2001 - 2020');

        clickTitleButton();
        expect(getTitle()).toBe('2001 - 2020');
      });

      describe('month selection mode', function() {
        beforeEach(function() {
          clickTitleButton();
        });

        it('shows the year as title', function() {
          expect(getTitle()).toBe('2010');
        });

        it('shows months as options', function() {
          expect(getOptions()).toEqual([
            ['January', 'February', 'March'],
            ['April', 'May', 'June'],
            ['July', 'August', 'September'],
            ['October', 'November', 'December']
          ]);
        });

        it('does not change the model', function() {
          expect($rootScope.date).toEqual(new Date('September 30, 2010 15:30:00'));
        });

        it('has `selected` only the correct month', function() {
          expectSelectedElement(8);
        });

        it('moves to the previous year when `previous` button is clicked', function() {
          clickPreviousButton();

          expect(getTitle()).toBe('2009');
          expect(getOptions()).toEqual([
            ['January', 'February', 'March'],
            ['April', 'May', 'June'],
            ['July', 'August', 'September'],
            ['October', 'November', 'December']
          ]);

          expectSelectedElement(null);
        });

        it('moves to the next year when `next` button is clicked', function() {
          clickNextButton();

          expect(getTitle()).toBe('2011');
          expect(getOptions()).toEqual([
            ['January', 'February', 'March'],
            ['April', 'May', 'June'],
            ['July', 'August', 'September'],
            ['October', 'November', 'December']
          ]);

          expectSelectedElement(null);
        });

        it('renders correctly when a month is clicked', function() {
          clickPreviousButton(5);
          expect(getTitle()).toBe('2005');

          clickOption(10);
          expect($rootScope.date).toEqual(new Date('September 30, 2010 15:30:00'));
          expect(getTitle()).toBe('November 2005');
          expect(getOptions(true)).toEqual([
            ['30', '31', '01', '02', '03', '04', '05'],
            ['06', '07', '08', '09', '10', '11', '12'],
            ['13', '14', '15', '16', '17', '18', '19'],
            ['20', '21', '22', '23', '24', '25', '26'],
            ['27', '28', '29', '30', '01', '02', '03'],
            ['04', '05', '06', '07', '08', '09', '10']
          ]);

          clickOption(17);
          expect($rootScope.date).toEqual(new Date('November 16, 2005 15:30:00'));
        });
      });

      describe('year selection mode', function() {
        beforeEach(function() {
          clickTitleButton();
          clickTitleButton();
        });

        it('shows the year range as title', function() {
          expect(getTitle()).toBe('2001 - 2020');
        });

        it('shows years as options', function() {
          expect(getOptions()).toEqual([
            ['2001', '2002', '2003', '2004', '2005'],
            ['2006', '2007', '2008', '2009', '2010'],
            ['2011', '2012', '2013', '2014', '2015'],
            ['2016', '2017', '2018', '2019', '2020']
          ]);
        });

        it('does not change the model', function() {
          expect($rootScope.date).toEqual(new Date('September 30, 2010 15:30:00'));
        });

        it('has `selected` only the selected year', function() {
          expectSelectedElement(9);
        });

        it('moves to the previous year set when `previous` button is clicked', function() {
          clickPreviousButton();

          expect(getTitle()).toBe('1981 - 2000');
          expect(getOptions()).toEqual([
            ['1981', '1982', '1983', '1984', '1985'],
            ['1986', '1987', '1988', '1989', '1990'],
            ['1991', '1992', '1993', '1994', '1995'],
            ['1996', '1997', '1998', '1999', '2000']
          ]);
          expectSelectedElement(null);
        });

        it('moves to the next year set when `next` button is clicked', function() {
          clickNextButton();

          expect(getTitle()).toBe('2021 - 2040');
          expect(getOptions()).toEqual([
            ['2021', '2022', '2023', '2024', '2025'],
            ['2026', '2027', '2028', '2029', '2030'],
            ['2031', '2032', '2033', '2034', '2035'],
            ['2036', '2037', '2038', '2039', '2040']
          ]);

          expectSelectedElement(null);
        });
      });

      describe('keyboard navigation', function() {
        function getActiveLabel() {
          return element.find('.active').eq(0).text();
        }

        describe('day mode', function() {
          it('will be able to activate previous day', function() {
            triggerKeyDown(element, 'left');
            expect(getActiveLabel()).toBe('29');
          });

          it('will be able to select with enter', function() {
            triggerKeyDown(element, 'left');
            triggerKeyDown(element, 'enter');
            expect($rootScope.date).toEqual(new Date('September 29, 2010 15:30:00'));
          });

          it('will be able to select with space', function() {
            triggerKeyDown(element, 'left');
            triggerKeyDown(element, 'space');
            expect($rootScope.date).toEqual(new Date('September 29, 2010 15:30:00'));
          });

          it('will be able to activate next day', function() {
            triggerKeyDown(element, 'right');
            expect(getActiveLabel()).toBe('01');
            expect(getTitle()).toBe('October 2010');
          });

          it('will be able to activate same day in previous week', function() {
            triggerKeyDown(element, 'up');
            expect(getActiveLabel()).toBe('23');
          });

          it('will be able to activate same day in next week', function() {
            triggerKeyDown(element, 'down');
            expect(getActiveLabel()).toBe('07');
            expect(getTitle()).toBe('October 2010');
          });

          it('will be able to activate same date in previous month', function() {
            triggerKeyDown(element, 'pageup');
            expect(getActiveLabel()).toBe('30');
            expect(getTitle()).toBe('August 2010');
          });

          it('will be able to activate same date in next month', function() {
            triggerKeyDown(element, 'pagedown');
            expect(getActiveLabel()).toBe('30');
            expect(getTitle()).toBe('October 2010');
          });

          it('will be able to activate first day of the month', function() {
            triggerKeyDown(element, 'home');
            expect(getActiveLabel()).toBe('01');
            expect(getTitle()).toBe('September 2010');
          });

          it('will be able to activate last day of the month', function() {
            $rootScope.date = new Date('September 1, 2010 15:30:00');
            $rootScope.$digest();

            triggerKeyDown(element, 'end');
            expect(getActiveLabel()).toBe('30');
            expect(getTitle()).toBe('September 2010');
          });

          it('will be able to move to month mode', function() {
            triggerKeyDown(element, 'up', true);
            expect(getActiveLabel()).toBe('September');
            expect(getTitle()).toBe('2010');
          });

          it('will not respond when trying to move to lower mode', function() {
            triggerKeyDown(element, 'down', true);
            expect(getActiveLabel()).toBe('30');
            expect(getTitle()).toBe('September 2010');
          });
        });

        describe('month mode', function() {
          beforeEach(function() {
            triggerKeyDown(element, 'up', true);
          });

          it('will be able to activate previous month', function() {
            triggerKeyDown(element, 'left');
            expect(getActiveLabel()).toBe('August');
          });

          it('will be able to activate next month', function() {
            triggerKeyDown(element, 'right');
            expect(getActiveLabel()).toBe('October');
          });

          it('will be able to activate same month in previous row', function() {
            triggerKeyDown(element, 'up');
            expect(getActiveLabel()).toBe('June');
          });

          it('will be able to activate same month in next row', function() {
            triggerKeyDown(element, 'down');
            expect(getActiveLabel()).toBe('December');
          });

          it('will be able to activate same date in previous year', function() {
            triggerKeyDown(element, 'pageup');
            expect(getActiveLabel()).toBe('September');
            expect(getTitle()).toBe('2009');
          });

          it('will be able to activate same date in next year', function() {
            triggerKeyDown(element, 'pagedown');
            expect(getActiveLabel()).toBe('September');
            expect(getTitle()).toBe('2011');
          });

          it('will be able to activate first month of the year', function() {
            triggerKeyDown(element, 'home');
            expect(getActiveLabel()).toBe('January');
            expect(getTitle()).toBe('2010');
          });

          it('will be able to activate last month of the year', function() {
            triggerKeyDown(element, 'end');
            expect(getActiveLabel()).toBe('December');
            expect(getTitle()).toBe('2010');
          });

          it('will be able to move to year mode', function() {
            triggerKeyDown(element, 'up', true);
            expect(getActiveLabel()).toBe('2010');
            expect(getTitle()).toBe('2001 - 2020');
          });

          it('will be able to move to day mode', function() {
            triggerKeyDown(element, 'down', true);
            expect(getActiveLabel()).toBe('30');
            expect(getTitle()).toBe('September 2010');
          });

          it('will move to day mode when selecting', function() {
            triggerKeyDown(element, 'left', true);
            triggerKeyDown(element, 'enter', true);
            expect(getActiveLabel()).toBe('30');
            expect(getTitle()).toBe('August 2010');
            expect($rootScope.date).toEqual(new Date('September 30, 2010 15:30:00'));
          });
        });

        describe('year mode', function() {
          beforeEach(function() {
            triggerKeyDown(element, 'up', true);
            triggerKeyDown(element, 'up', true);
          });

          it('will be able to activate previous year', function() {
            triggerKeyDown(element, 'left');
            expect(getActiveLabel()).toBe('2009');
          });

          it('will be able to activate next year', function() {
            triggerKeyDown(element, 'right');
            expect(getActiveLabel()).toBe('2011');
          });

          it('will be able to activate same year in previous row', function() {
            triggerKeyDown(element, 'up');
            expect(getActiveLabel()).toBe('2005');
          });

          it('will be able to activate same year in next row', function() {
            triggerKeyDown(element, 'down');
            expect(getActiveLabel()).toBe('2015');
          });

          it('will be able to activate same date in previous view', function() {
            triggerKeyDown(element, 'pageup');
            expect(getActiveLabel()).toBe('1990');
          });

          it('will be able to activate same date in next view', function() {
            triggerKeyDown(element, 'pagedown');
            expect(getActiveLabel()).toBe('2030');
          });

          it('will be able to activate first year of the year', function() {
            triggerKeyDown(element, 'home');
            expect(getActiveLabel()).toBe('2001');
          });

          it('will be able to activate last year of the year', function() {
            triggerKeyDown(element, 'end');
            expect(getActiveLabel()).toBe('2020');
          });

          it('will not respond when trying to move to upper mode', function() {
            triggerKeyDown(element, 'up', true);
            expect(getTitle()).toBe('2001 - 2020');
          });

          it('will be able to move to month mode', function() {
            triggerKeyDown(element, 'down', true);
            expect(getActiveLabel()).toBe('September');
            expect(getTitle()).toBe('2010');
          });

          it('will move to month mode when selecting', function() {
            triggerKeyDown(element, 'left', true);
            triggerKeyDown(element, 'enter', true);
            expect(getActiveLabel()).toBe('September');
            expect(getTitle()).toBe('2009');
            expect($rootScope.date).toEqual(new Date('September 30, 2010 15:30:00'));
          });
        });

        describe('`aria-activedescendant`', function() {
          function checkActivedescendant() {
            var activeId = element.find('table').attr('aria-activedescendant');
            expect(element.find('#' + activeId + ' > button')).toHaveClass('active');
          }

          it('updates correctly', function() {
            triggerKeyDown(element, 'left');
            checkActivedescendant();

            triggerKeyDown(element, 'down');
            checkActivedescendant();

            triggerKeyDown(element, 'up', true);
            checkActivedescendant();

            triggerKeyDown(element, 'up', true);
            checkActivedescendant();
          });
        });
      });
    });

    describe('attribute `datepicker-options`', function() {
      describe('startingDay', function() {
        beforeEach(function() {
          $rootScope.datepickerOptions = {
            startingDay: 1
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="datepickerOptions"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('shows the day labels rotated', function() {
          expect(getLabels(true)).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
        });

        it('renders the calendar days correctly', function() {
          expect(getOptions(true)).toEqual([
            ['30', '31', '01', '02', '03', '04', '05'],
            ['06', '07', '08', '09', '10', '11', '12'],
            ['13', '14', '15', '16', '17', '18', '19'],
            ['20', '21', '22', '23', '24', '25', '26'],
            ['27', '28', '29', '30', '01', '02', '03'],
            ['04', '05', '06', '07', '08', '09', '10']
          ]);
        });

        it('renders the week numbers correctly', function() {
          expect(getWeeks()).toEqual(['35', '36', '37', '38', '39', '40']);
        });
      });

      describe('showWeeks', function() {
        beforeEach(function() {
          $rootScope.datepickerOptions = {
            showWeeks: false
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="datepickerOptions"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('hides week numbers based on variable', function() {
          expect(getLabelsRow().find('th').length).toEqual(7);
          var tr = element.find('tbody').find('tr');
          for (var i = 0; i < 5; i++) {
            expect(tr.eq(i).find('td').length).toEqual(7);
          }
        });
      });

      describe('minDate', function() {
        beforeEach(function() {
          $rootScope.datepickerOptions = {
            minDate: new Date('September 12, 2010')
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="datepickerOptions"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('disables appropriate days in current month', function() {
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index < 14);
          });
        });

        it('disables appropriate days when min date changes', function() {
          $rootScope.datepickerOptions.minDate = new Date('September 5, 2010');
          $rootScope.$digest();

          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index < 7);
          });
        });

        it('invalidates when model is a disabled date', function() {
          $rootScope.datepickerOptions.minDate = new Date('September 5, 2010');
          $rootScope.date = new Date('September 2, 2010');
          $rootScope.$digest();
          expect(element.hasClass('ng-invalid')).toBeTruthy();
          expect(element.hasClass('ng-invalid-date-disabled')).toBeTruthy();
        });

        it('disables all days in previous month', function() {
          clickPreviousButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(true);
          });
        });

        it('disables no days in next month', function() {
          clickNextButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });
        });

        it('disables appropriate months in current year', function() {
          clickTitleButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index < 8);
          });
        });

        it('disables all months in previous year', function() {
          clickTitleButton();
          clickPreviousButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(true);
          });
        });

        it('disables no months in next year', function() {
          clickTitleButton();
          clickNextButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });
        });

        it('enables everything before if it is cleared', function() {
          $rootScope.datepickerOptions.minDate = null;
          $rootScope.date = new Date('December 20, 1949');
          $rootScope.$digest();

          clickTitleButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });
        });

        it('accepts literals, \'yyyy-MM-dd\' case', function() {
          $rootScope.datepickerOptions.minDate = '2010-09-05';
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="datepickerOptions"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index < 7);
          });
        });
      });

      describe('maxDate', function() {
        beforeEach(function() {
          $rootScope.datepickerOptions = {
            maxDate: new Date('September 25, 2010')
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="datepickerOptions"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('disables appropriate days in current month', function() {
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index > 27);
          });
        });

        it('disables appropriate days when max date changes', function() {
          $rootScope.datepickerOptions.maxDate = new Date('September 18, 2010');
          $rootScope.$digest();

          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index > 20);
          });
        });

        it('invalidates when model is a disabled date', function() {
          $rootScope.datepickerOptions.maxDate = new Date('September 18, 2010');
          $rootScope.$digest();
          expect(element.hasClass('ng-invalid')).toBeTruthy();
          expect(element.hasClass('ng-invalid-date-disabled')).toBeTruthy();
        });

        it('disables no days in previous month', function() {
          clickPreviousButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });
        });

        it('disables all days in next month', function() {
          clickNextButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(true);
          });
        });

        it('disables appropriate months in current year', function() {
          clickTitleButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index > 8);
          });
        });

        it('disables no months in previous year', function() {
          clickTitleButton();
          clickPreviousButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });
        });

        it('disables all months in next year', function() {
          clickTitleButton();
          clickNextButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(true);
          });
        });

        it('enables everything after if it is cleared', function() {
          $rootScope.datepickerOptions.maxDate = null;
          $rootScope.$digest();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });
        });
      });

      describe('formatting', function() {
        beforeEach(function() {
          $rootScope.datepickerOptions = {
            formatDay: 'd',
            formatDayHeader: 'EEEE',
            formatDayTitle: 'MMMM, yy',
            formatMonth: 'MMM',
            formatMonthTitle: 'yy',
            formatYear: 'yy',
            yearColumns: 4,
            yearRows: 3
          };
          element = $compile('<uib-datepicker ng-model="date"' +
            'datepicker-options="datepickerOptions"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('changes the title format in `day` mode', function() {
          expect(getTitle()).toBe('September, 10');
        });

        it('changes the title & months format in `month` mode', function() {
          clickTitleButton();

          expect(getTitle()).toBe('10');
          expect(getOptions()).toEqual([
            ['Jan', 'Feb', 'Mar'],
            ['Apr', 'May', 'Jun'],
            ['Jul', 'Aug', 'Sep'],
            ['Oct', 'Nov', 'Dec']
          ]);
        });

        it('changes the title, year format & range in `year` mode', function() {
          clickTitleButton();
          clickTitleButton();

          expect(getTitle()).toBe('05 - 16');
          expect(getOptions()).toEqual([
            ['05', '06', '07', '08'],
            ['09', '10', '11', '12'],
            ['13', '14', '15', '16']
          ]);
        });

        it('shows day labels', function() {
          expect(getLabels(true)).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
        });

        it('changes the day format', function() {
          expect(getOptions(true)).toEqual([
            ['29', '30', '31', '1', '2', '3', '4'],
            ['5', '6', '7', '8', '9', '10', '11'],
            ['12', '13', '14', '15', '16', '17', '18'],
            ['19', '20', '21', '22', '23', '24', '25'],
            ['26', '27', '28', '29', '30', '1', '2'],
            ['3', '4', '5', '6', '7', '8', '9']
          ]);
        });
      });
    });

    describe('attribute `starting-day`', function() {
      beforeEach(function() {
        $rootScope.startingDay = 1;
        element = $compile('<uib-datepicker ng-model="date" starting-day="startingDay"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('shows the day labels rotated', function() {
        expect(getLabels(true)).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
      });

      it('renders the calendar days correctly', function() {
        expect(getOptions(true)).toEqual([
          ['30', '31', '01', '02', '03', '04', '05'],
          ['06', '07', '08', '09', '10', '11', '12'],
          ['13', '14', '15', '16', '17', '18', '19'],
          ['20', '21', '22', '23', '24', '25', '26'],
          ['27', '28', '29', '30', '01', '02', '03'],
          ['04', '05', '06', '07', '08', '09', '10']
        ]);
      });

      it('renders the week numbers correctly', function() {
        expect(getWeeks()).toEqual(['35', '36', '37', '38', '39', '40']);
      });
    });

    describe('attribute `show-weeks`', function() {
      beforeEach(function() {
        $rootScope.showWeeks = false;
        element = $compile('<uib-datepicker ng-model="date" show-weeks="showWeeks"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('hides week numbers based on variable', function() {
        expect(getLabelsRow().find('th').length).toEqual(7);
        var tr = element.find('tbody').find('tr');
        for (var i = 0; i < 5; i++) {
          expect(tr.eq(i).find('td').length).toEqual(7);
        }
      });
    });

    describe('`min-date` attribute', function() {
      beforeEach(function() {
        $rootScope.mindate = new Date('September 12, 2010');
        element = $compile('<uib-datepicker ng-model="date" min-date="mindate"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('disables appropriate days in current month', function() {
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(index < 14);
        });
      });

      it('disables appropriate days when min date changes', function() {
        $rootScope.mindate = new Date('September 5, 2010');
        $rootScope.$digest();

        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(index < 7);
        });
      });

      it('invalidates when model is a disabled date', function() {
        $rootScope.mindate = new Date('September 5, 2010');
        $rootScope.date = new Date('September 2, 2010');
        $rootScope.$digest();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
        expect(element.hasClass('ng-invalid-date-disabled')).toBeTruthy();
      });

      it('disables all days in previous month', function() {
        clickPreviousButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(true);
        });
      });

      it('disables no days in next month', function() {
        clickNextButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(false);
        });
      });

      it('disables appropriate months in current year', function() {
        clickTitleButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(index < 8);
        });
      });

      it('disables all months in previous year', function() {
        clickTitleButton();
        clickPreviousButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(true);
        });
      });

      it('disables no months in next year', function() {
        clickTitleButton();
        clickNextButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(false);
        });
      });

      it('enables everything before if it is cleared', function() {
        $rootScope.mindate = null;
        $rootScope.date = new Date('December 20, 1949');
        $rootScope.$digest();

        clickTitleButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(false);
        });
      });

      it('accepts literals, \'yyyy-MM-dd\' case', function() {
        element = $compile('<uib-datepicker ng-model="date" min-date="\'2010-09-05\'"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(index < 7);
        });
      });
    });

    describe('`max-date` attribute', function() {
      beforeEach(function() {
        $rootScope.maxdate = new Date('September 25, 2010');
        element = $compile('<uib-datepicker ng-model="date" max-date="maxdate"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('disables appropriate days in current month', function() {
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(index > 27);
        });
      });

      it('disables appropriate days when max date changes', function() {
        $rootScope.maxdate = new Date('September 18, 2010');
        $rootScope.$digest();

        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(index > 20);
        });
      });

      it('invalidates when model is a disabled date', function() {
        $rootScope.maxdate = new Date('September 18, 2010');
        $rootScope.$digest();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
        expect(element.hasClass('ng-invalid-date-disabled')).toBeTruthy();
      });

      it('disables no days in previous month', function() {
        clickPreviousButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(false);
        });
      });

      it('disables all days in next month', function() {
        clickNextButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(true);
        });
      });

      it('disables appropriate months in current year', function() {
        clickTitleButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(index > 8);
        });
      });

      it('disables no months in previous year', function() {
        clickTitleButton();
        clickPreviousButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(false);
        });
      });

      it('disables all months in next year', function() {
        clickTitleButton();
        clickNextButton();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(true);
        });
      });

      it('enables everything after if it is cleared', function() {
        $rootScope.maxdate = null;
        $rootScope.$digest();
        var buttons = getAllOptionsEl();
        angular.forEach(buttons, function(button, index) {
          expect(angular.element(button).prop('disabled')).toBe(false);
        });
      });
    });

    describe('date-disabled expression', function() {
      beforeEach(function() {
        $rootScope.options = {
          dateDisabled: jasmine.createSpy('dateDisabled')
        };
        element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('executes the dateDisabled expression for each visible day plus one for validation', function() {
        expect($rootScope.options.dateDisabled.calls.count()).toEqual(42 + 1);
      });

      it('executes the dateDisabled expression for each visible month plus one for validation', function() {
        $rootScope.options.dateDisabled.calls.reset();
        clickTitleButton();
        expect($rootScope.options.dateDisabled.calls.count()).toEqual(12 + 1);
      });

      it('executes the dateDisabled expression for each visible year plus one for validation', function() {
        clickTitleButton();
        $rootScope.options.dateDisabled.calls.reset();
        clickTitleButton();
        expect($rootScope.options.dateDisabled.calls.count()).toEqual(20 + 1);
      });
    });

    describe('custom-class expression', function() {
      beforeEach(function() {
        $rootScope.options = {
          customClass: jasmine.createSpy('customClass')
        };
        element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('executes the customClass expression for each visible day plus one for validation', function() {
        expect($rootScope.options.customClass.calls.count()).toEqual(42);
      });

      it('executes the customClass expression for each visible month plus one for validation', function() {
        $rootScope.options.customClass.calls.reset();
        clickTitleButton();
        expect($rootScope.options.customClass.calls.count()).toEqual(12);
      });

      it('executes the customClass expression for each visible year plus one for validation', function() {
        clickTitleButton();
        $rootScope.options.customClass.calls.reset();
        clickTitleButton();
        expect($rootScope.options.customClass.calls.count()).toEqual(20);
      });
    });

    describe('formatting', function() {
      beforeEach(function() {
        $rootScope.dayTitle = 'MMMM, yy';
        element = $compile('<uib-datepicker ng-model="date"' +
          'format-day="d"' +
          'format-day-header="EEEE"' +
          'format-day-title="{{dayTitle}}"' +
          'format-month="MMM"' +
          'format-month-title="yy"' +
          'format-year="yy"' +
          'year-rows="3"' +
          'year-columns="4"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('changes the title format in `day` mode', function() {
        expect(getTitle()).toBe('September, 10');
      });

      it('changes the title & months format in `month` mode', function() {
        clickTitleButton();

        expect(getTitle()).toBe('10');
        expect(getOptions()).toEqual([
          ['Jan', 'Feb', 'Mar'],
          ['Apr', 'May', 'Jun'],
          ['Jul', 'Aug', 'Sep'],
          ['Oct', 'Nov', 'Dec']
        ]);
      });

      it('changes the title, year format & range in `year` mode', function() {
        clickTitleButton();
        clickTitleButton();

        expect(getTitle()).toBe('05 - 16');
        expect(getOptions()).toEqual([
          ['05', '06', '07', '08'],
          ['09', '10', '11', '12'],
          ['13', '14', '15', '16']
        ]);
      });

      it('shows day labels', function() {
        expect(getLabels(true)).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
      });

      it('changes the day format', function() {
        expect(getOptions(true)).toEqual([
          ['29', '30', '31', '1', '2', '3', '4'],
          ['5', '6', '7', '8', '9', '10', '11'],
          ['12', '13', '14', '15', '16', '17', '18'],
          ['19', '20', '21', '22', '23', '24', '25'],
          ['26', '27', '28', '29', '30', '1', '2'],
          ['3', '4', '5', '6', '7', '8', '9']
        ]);
      });
    });

    describe('gc', function() {
      var datepickerScope;
      beforeEach(function() {
        $rootScope.minDate = new Date();
        $rootScope.maxDate = new Date();
        $rootScope.maxDate.setDate($rootScope.maxDate.getDate() + 1);
        $rootScope.minMode = 'day';
        $rootScope.maxMode = 'year';
        $rootScope.initDate = new Date();
        element = $compile('<uib-datepicker ng-model="date" min-date="minDate" max-date="maxDate" min-mode="minMode" max-mode="maxMode" init-date="initDate"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
        datepickerScope = element.isolateScope();
      });

      it('should appropriately clean up $watch expressions', function() {
        expect($rootScope.$$watchers.length).toBe(6);
        ['minDate', 'maxDate', 'minMode', 'maxMode', 'initDate'].forEach(function(prop) {
          var $$watcher;
          $rootScope.$$watchers.forEach(function($$watch) {
            if ($$watch.exp === prop) {
              $$watcher = $$watch;
            }
          });
          expect(angular.isObject($$watcher)).toBe(true);
        });

        datepickerScope.$destroy();

        expect($rootScope.$$watchers.length).toBe(1);
      });
    });

    describe('setting datepickerConfig', function() {
      var originalConfig = {};
      beforeEach(inject(function(uibDatepickerConfig) {
        angular.extend(originalConfig, uibDatepickerConfig);
        uibDatepickerConfig.formatDay = 'd';
        uibDatepickerConfig.formatMonth = 'MMM';
        uibDatepickerConfig.formatYear = 'yy';
        uibDatepickerConfig.formatDayHeader = 'EEEE';
        uibDatepickerConfig.formatDayTitle = 'MMM, yy';
        uibDatepickerConfig.formatMonthTitle = 'yy';
        uibDatepickerConfig.showWeeks = false;
        uibDatepickerConfig.yearRows = 2;
        uibDatepickerConfig.yearColumns = 5;
        uibDatepickerConfig.startingDay = 6;

        element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));
      afterEach(inject(function(uibDatepickerConfig) {
        // return it to the original state
        Object.keys(uibDatepickerConfig).forEach(function(key) {
          delete uibDatepickerConfig[key];
        });
        angular.extend(uibDatepickerConfig, originalConfig);
      }));

      it('changes the title format in `day` mode', function() {
        expect(getTitle()).toBe('Sep, 10');
      });

      it('changes the title & months format in `month` mode', function() {
        clickTitleButton();

        expect(getTitle()).toBe('10');
        expect(getOptions()).toEqual([
          ['Jan', 'Feb', 'Mar'],
          ['Apr', 'May', 'Jun'],
          ['Jul', 'Aug', 'Sep'],
          ['Oct', 'Nov', 'Dec']
        ]);
      });

      it('changes the title, year format & range in `year` mode', function() {
        clickTitleButton();
        clickTitleButton();

        expect(getTitle()).toBe('01 - 10');
        expect(getOptions()).toEqual([
          ['01', '02', '03', '04', '05'],
          ['06', '07', '08', '09', '10']
        ]);
      });

      it('changes the `starting-day` & day headers & format', function() {
        expect(getLabels()).toEqual(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
        expect(getOptions(false)).toEqual([
          ['28', '29', '30', '31', '1', '2', '3'],
          ['4', '5', '6', '7', '8', '9', '10'],
          ['11', '12', '13', '14', '15', '16', '17'],
          ['18', '19', '20', '21', '22', '23', '24'],
          ['25', '26', '27', '28', '29', '30', '1'],
          ['2', '3', '4', '5', '6', '7', '8']
        ]);
      });

      it('changes initial visibility for weeks', function() {
        expect(getLabelsRow().find('th').length).toEqual(7);
        var tr = element.find('tbody').find('tr');
        for (var i = 0; i < 5; i++) {
          expect(tr.eq(i).find('td').length).toEqual(7);
        }
      });
    });

    describe('disabled', function() {
      beforeEach(function() {
        element = $compile('<uib-datepicker ng-model="date" disabled></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('should have all dates disabled', function() {
        element.find('.uib-day button').each(function(idx, elem) {
          expect($(elem).prop('disabled')).toBe(true);
        });
      });
    });

    describe('ng-disabled', function() {
      beforeEach(function() {
        $rootScope.disabled = false;
        element = $compile('<uib-datepicker ng-model="date" ng-disabled="disabled"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      });

      it('should toggle disabled state with value of ng-disabled', function() {
        element.find('.uib-day button').each(function(idx, elem) {
          expect($(elem).prop('disabled')).toBe(false);
        });

        $rootScope.disabled = true;
        $rootScope.$digest();

        element.find('.uib-day button').each(function(idx, elem) {
          expect($(elem).prop('disabled')).toBe(true);
        });

        $rootScope.disabled = false;
        $rootScope.$digest();

        element.find('.uib-day button').each(function(idx, elem) {
          expect($(elem).prop('disabled')).toBe(false);
        });
      });
    });

    describe('basic popup', function() {
      var wrapElement, inputEl, dropdownEl;

      function assignElements(wrapElement) {
        inputEl = wrapElement.find('input');
        dropdownEl = wrapElement.find('ul');
        element = dropdownEl.find('table');
      }

      beforeEach(function() {
        $rootScope.date = new Date('September 30, 2010 15:30:00');
        $rootScope.isopen = true;
        wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup is-open="isopen"></div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapElement);
      });

      it('should stop click event from bubbling from today button', function() {
        var bubbled = false;
        wrapElement.on('click', function() {
          bubbled = true;
        });

        wrapElement.find('.uib-datepicker-current').trigger('click');

        expect(bubbled).toBe(false);
      });

      it('should stop click event from bubbling from clear button', function() {
        var bubbled = false;
        wrapElement.on('click', function() {
          bubbled = true;
        });

        wrapElement.find('.uib-clear').trigger('click');

        expect(bubbled).toBe(false);
      });

      it('should stop click event from bubbling from close button', function() {
        var bubbled = false;
        wrapElement.on('click', function() {
          bubbled = true;
        });

        wrapElement.find('.uib-close').trigger('click');

        expect(bubbled).toBe(false);
      });
    });

    describe('ngModelOptions allowInvalid', function() {
      var $sniffer, inputEl;

      beforeEach(inject(function(_$sniffer_) {
        $sniffer = _$sniffer_;

        $rootScope.date = new Date('September 30, 2010 15:30:00');
        $rootScope.modelOptions = {allowInvalid: true};
        element = $compile('<div><input ng-model="date" ng-model-options="modelOptions" uib-datepicker-popup></div>')($rootScope);
        inputEl = element.find('input');
        $rootScope.$digest();
      }));

      function changeInputValueTo(el, value) {
        el.val(value);
        el.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
        $rootScope.$digest();
      }

      it('should update ng-model even if the date is invalid when allowInvalid is true', function() {
        changeInputValueTo(inputEl, 'pizza');
        expect($rootScope.date).toBe('pizza');
        expect(inputEl.val()).toBe('pizza');
      });
    });

    describe('datepickerConfig ngModelOptions', function() {
      describe('timezone', function() {
        var originalConfig = {};
        beforeEach(inject(function(uibDatepickerConfig) {
          angular.extend(originalConfig, uibDatepickerConfig);
          uibDatepickerConfig.ngModelOptions = { timezone: '+600' };
          $rootScope.date = new Date('2005-11-07T10:00:00.000Z');
          element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        }));

        afterEach(inject(function(uibDatepickerConfig) {
          // return it to the original state
          angular.extend(uibDatepickerConfig, originalConfig);
        }));

        it('sets date to appropriate date', function() {
          expectSelectedElement(8);
        });

        it('updates the input when a day is clicked', function() {
          clickOption(9);
          expect($rootScope.date).toEqual(new Date('2005-11-08T10:00:00.000Z'));
        });

        it('init date', function() {
          $rootScope.initDate = new Date('2006-01-01T00:00:00.000Z');
          $rootScope.date = null;
          element = $compile('<uib-datepicker ng-model="date" init-date="initDate"><uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getTitle()).toEqual('January 2006');
        });

        it('min date', function() {
          $rootScope.minDate = new Date('2010-10-01T00:00:00.000Z');
          element = $compile('<uib-datepicker ng-model="date" min-date="minDate"><uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getSelectedElement().prop('disabled')).toBe(true);
        });
      });
    });

    describe('uib-datepicker ng-model-options', function() {
      describe('timezone', function() {
        beforeEach(inject(function() {
          $rootScope.date = new Date('2005-11-07T10:00:00.000Z');
          $rootScope.ngModelOptions = { timezone: '+600'};
          element = $compile('<uib-datepicker ng-model="date" ng-model-options="ngModelOptions"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        }));

        it('sets date to appropriate date', function() {
          expectSelectedElement(8);
        });

        it('updates the input when a day is clicked', function() {
          clickOption(9);
          expect($rootScope.date).toEqual(new Date('2005-11-08T10:00:00.000Z'));
        });
      });
    });

    describe('setting datepickerPopupConfig', function() {
      var originalConfig = {};
      beforeEach(inject(function(uibDatepickerPopupConfig) {
        angular.extend(originalConfig, uibDatepickerPopupConfig);
        uibDatepickerPopupConfig.datepickerPopup = 'MM-dd-yyyy';

        element = $compile('<input ng-model="date" uib-datepicker-popup>')($rootScope);
        $rootScope.$digest();
      }));
      afterEach(inject(function(uibDatepickerPopupConfig) {
        // return it to the original state
        angular.extend(uibDatepickerPopupConfig, originalConfig);
      }));

      it('changes date format', function() {
        expect(element.val()).toEqual('09-30-2010');
      });

    });

    describe('setting datepickerPopupConfig inside ng-if', function() {
      var originalConfig = {};
      beforeEach(inject(function (uibDatepickerPopupConfig) {
        angular.extend(originalConfig, uibDatepickerPopupConfig);
        uibDatepickerPopupConfig.datepickerPopup = 'MM-dd-yyyy';

        element = $compile('<div><div ng-if="true"><input ng-model="date" uib-datepicker-popup></div></div>')($rootScope);
        $rootScope.$digest();
      }));
      afterEach(inject(function (uibDatepickerPopupConfig) {
        // return it to the original state
        angular.extend(uibDatepickerPopupConfig, originalConfig);
      }));

      it('changes date format', function () {
        expect(element.find('input').val()).toEqual('09-30-2010');
      });
    });

    describe('as popup', function () {
      var inputEl, dropdownEl, $document, $sniffer, $timeout;

      function assignElements(wrapElement) {
        inputEl = wrapElement.find('input');
        dropdownEl = wrapElement.find('ul');
        element = dropdownEl.find('table');
      }

      function changeInputValueTo(el, value) {
        el.val(value);
        el.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
        $rootScope.$digest();
      }

      describe('initially', function () {
        beforeEach(inject(function(_$document_, _$sniffer_) {
          $document = _$document_;
          $sniffer = _$sniffer_;
          $rootScope.isopen = true;
          $rootScope.date = new Date('September 30, 2010 15:30:00');
          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('does not to display datepicker initially', function() {
          expect(dropdownEl.length).toBe(0);
        });

        it('to display the correct value in input', function() {
          expect(inputEl.val()).toBe('2010-09-30');
        });
      });

      describe('initially opened', function() {
        var wrapElement;

        beforeEach(inject(function(_$document_, _$sniffer_, _$timeout_) {
          $document = _$document_;
          $sniffer = _$sniffer_;
          $timeout = _$timeout_;
          $rootScope.isopen = true;
          $rootScope.date = new Date('September 30, 2010 15:30:00');
          wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup is-open="isopen"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('datepicker is displayed', function() {
          expect(dropdownEl.length).toBe(1);
        });

        it('renders the calendar correctly', function() {
          expect(getLabelsRow().css('display')).not.toBe('none');
          expect(getLabels(true)).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
          expect(getOptions(true)).toEqual([
            ['29', '30', '31', '01', '02', '03', '04'],
            ['05', '06', '07', '08', '09', '10', '11'],
            ['12', '13', '14', '15', '16', '17', '18'],
            ['19', '20', '21', '22', '23', '24', '25'],
            ['26', '27', '28', '29', '30', '01', '02'],
            ['03', '04', '05', '06', '07', '08', '09']
          ]);
        });

        it('updates the input when a day is clicked', function() {
          clickOption(17);
          expect(inputEl.val()).toBe('2010-09-15');
          expect($rootScope.date).toEqual(new Date('September 15, 2010 15:30:00'));
        });

        it('should mark the input field dirty when a day is clicked', function() {
          expect(inputEl).toHaveClass('ng-pristine');
          clickOption(17);
          expect(inputEl).toHaveClass('ng-dirty');
        });

        it('updates the input correctly when model changes', function() {
          $rootScope.date = new Date('January 10, 1983 10:00:00');
          $rootScope.$digest();
          expect(inputEl.val()).toBe('1983-01-10');
        });

        it('closes the dropdown when a day is clicked', function() {
          expect(dropdownEl.length).toBe(1);

          clickOption(17);
          assignElements(wrapElement);
          expect(dropdownEl.length).toBe(0);
        });

        it('updates the model & calendar when input value changes', function() {
          changeInputValueTo(inputEl, '2010-09-15');

          expect($rootScope.date.getFullYear()).toEqual(2010);
          expect($rootScope.date.getMonth()).toEqual(8);
          expect($rootScope.date.getDate()).toEqual(15);

          expect(getOptions(true)).toEqual([
            ['29', '30', '31', '01', '02', '03', '04'],
            ['05', '06', '07', '08', '09', '10', '11'],
            ['12', '13', '14', '15', '16', '17', '18'],
            ['19', '20', '21', '22', '23', '24', '25'],
            ['26', '27', '28', '29', '30', '01', '02'],
            ['03', '04', '05', '06', '07', '08', '09']
          ]);
          expectSelectedElement(17);
        });

        it('closes when click outside of calendar', function() {
          expect(dropdownEl.length).toBe(1);

          $timeout.flush(0);
          $document.find('body').click();
          assignElements(wrapElement);
          expect(dropdownEl.length).toBe(0);
        });

        it('sets `ng-invalid` for invalid input', function() {
          changeInputValueTo(inputEl, 'pizza');

          expect(inputEl).toHaveClass('ng-invalid');
          expect(inputEl).toHaveClass('ng-invalid-date');
          expect($rootScope.date).toBeUndefined();
          expect(inputEl.val()).toBe('pizza');
        });

        it('unsets `ng-invalid` for valid input', function() {
          changeInputValueTo(inputEl, 'pizza');
          expect(inputEl).toHaveClass('ng-invalid-date');

          $rootScope.date = new Date('August 11, 2013');
          $rootScope.$digest();
          expect(inputEl).not.toHaveClass('ng-invalid');
          expect(inputEl).not.toHaveClass('ng-invalid-date');
        });

        describe('focus', function () {
          beforeEach(function() {
            var body = $document.find('body');
            body.append(inputEl);
            body.append(dropdownEl);
          });

          afterEach(function() {
            inputEl.remove();
            dropdownEl.remove();
          });

          it('returns to the input when ESC key is pressed in the popup and closes', function() {
            expect(dropdownEl.length).toBe(1);

            dropdownEl.find('button').eq(0).focus();
            expect(document.activeElement.tagName).toBe('BUTTON');

            triggerKeyDown(dropdownEl, 'esc');
            assignElements(wrapElement);
            expect(dropdownEl.length).toBe(0);
            expect(document.activeElement.tagName).toBe('INPUT');
          });

          it('returns to the input when ESC key is pressed in the input and closes', function() {
            expect(dropdownEl.length).toBe(1);

            dropdownEl.find('button').eq(0).focus();
            expect(document.activeElement.tagName).toBe('BUTTON');

            triggerKeyDown(inputEl, 'esc');
            $rootScope.$digest();
            assignElements(wrapElement);
            expect(dropdownEl.length).toBe(0);
            expect(document.activeElement.tagName).toBe('INPUT');
          });

          it('stops the ESC key from propagating if the dropdown is open, but not when closed', function() {
            var documentKey = -1;
            var getKey = function(evt) { documentKey = evt.which; };
            $document.bind('keydown', getKey);

            triggerKeyDown(inputEl, 'esc');
            expect(documentKey).toBe(-1);

            triggerKeyDown(inputEl, 'esc');
            expect(documentKey).toBe(27);

            $document.unbind('keydown', getKey);
          });
        });

        describe('works with HTML5 date input types', function() {
          var date2 = new Date('October 1, 2010 12:34:56.789');
          beforeEach(inject(function(_$document_) {
            $document = _$document_;
            $rootScope.isopen = true;
            $rootScope.date = new Date('September 30, 2010 15:30:00');
          }));

          it('works as date', function() {
            setupInputWithType('date');
            expect(dropdownEl.length).toBe(1);
            expect(inputEl.val()).toBe('2010-09-30');

            changeInputValueTo(inputEl, '1980-03-05');

            expect($rootScope.date.getFullYear()).toEqual(1980);
            expect($rootScope.date.getMonth()).toEqual(2);
            expect($rootScope.date.getDate()).toEqual(5);

            expect(getOptions(true)).toEqual([
              ['24', '25', '26', '27', '28', '29', '01'],
              ['02', '03', '04', '05', '06', '07', '08'],
              ['09', '10', '11', '12', '13', '14', '15'],
              ['16', '17', '18', '19', '20', '21', '22'],
              ['23', '24', '25', '26', '27', '28', '29'],
              ['30', '31', '01', '02', '03', '04', '05']
            ]);
            expect(selectedElementIndex()).toEqual(10);
          });

          it('works as datetime-local', function() {
            setupInputWithType('datetime-local');
            expect(inputEl.val()).toBe('2010-09-30T15:30:00.000');

            changeInputValueTo(inputEl, '1980-03-05T12:34:56.000');

            expect($rootScope.date.getFullYear()).toEqual(1980);
            expect($rootScope.date.getMonth()).toEqual(2);
            expect($rootScope.date.getDate()).toEqual(5);

            expect(getOptions(true)).toEqual([
              ['24', '25', '26', '27', '28', '29', '01'],
              ['02', '03', '04', '05', '06', '07', '08'],
              ['09', '10', '11', '12', '13', '14', '15'],
              ['16', '17', '18', '19', '20', '21', '22'],
              ['23', '24', '25', '26', '27', '28', '29'],
              ['30', '31', '01', '02', '03', '04', '05']
            ]);
            expect(selectedElementIndex()).toEqual(10);
          });

          it('works as month', function() {
            setupInputWithType('month');
            expect(inputEl.val()).toBe('2010-09');

            changeInputValueTo(inputEl, '1980-03');

            expect($rootScope.date.getFullYear()).toEqual(1980);
            expect($rootScope.date.getMonth()).toEqual(2);
            expect($rootScope.date.getDate()).toEqual(30);

            expect(getOptions()).toEqual([
              ['January', 'February', 'March'],
              ['April', 'May', 'June'],
              ['July', 'August', 'September'],
              ['October', 'November', 'December']
            ]);
            expect(selectedElementIndex()).toEqual(2);
          });

          function setupInputWithType(type) {
            var wrapElement = $compile('<div><input type="' +
              type + '" ng-model="date" uib-datepicker-popup is-open="isopen"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          }
        });
      });

      describe('works with ngModelOptions', function() {
        var $timeout;

        beforeEach(inject(function(_$document_, _$sniffer_, _$timeout_) {
          $document = _$document_;
          $timeout = _$timeout_;
          $rootScope.isopen = true;
          $rootScope.date = new Date('September 30, 2010 15:30:00');
          var wrapElement = $compile('<div><input ng-model="date" ' +
            'ng-model-options="{ debounce: 10000 }" ' +
            'uib-datepicker-popup is-open="isopen"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('should change model and update calendar after debounce timeout', function() {
          changeInputValueTo(inputEl, '1980-03-05');

          expect($rootScope.date.getFullYear()).toEqual(2010);
          expect($rootScope.date.getMonth()).toEqual(9 - 1);
          expect($rootScope.date.getDate()).toEqual(30);

          expect(getOptions(true)).toEqual([
            ['29', '30', '31', '01', '02', '03', '04'],
            ['05', '06', '07', '08', '09', '10', '11'],
            ['12', '13', '14', '15', '16', '17', '18'],
            ['19', '20', '21', '22', '23', '24', '25'],
            ['26', '27', '28', '29', '30', '01', '02'],
            ['03', '04', '05', '06', '07', '08', '09']
          ]);

          // No changes yet
          $timeout.flush(2000);
          expect($rootScope.date.getFullYear()).toEqual(2010);
          expect($rootScope.date.getMonth()).toEqual(9 - 1);
          expect($rootScope.date.getDate()).toEqual(30);

          expect(getOptions(true)).toEqual([
            ['29', '30', '31', '01', '02', '03', '04'],
            ['05', '06', '07', '08', '09', '10', '11'],
            ['12', '13', '14', '15', '16', '17', '18'],
            ['19', '20', '21', '22', '23', '24', '25'],
            ['26', '27', '28', '29', '30', '01', '02'],
            ['03', '04', '05', '06', '07', '08', '09']
          ]);

          $timeout.flush(10000);
          expect($rootScope.date.getFullYear()).toEqual(1980);
          expect($rootScope.date.getMonth()).toEqual(2);
          expect($rootScope.date.getDate()).toEqual(5);

          expect(getOptions(true)).toEqual([
            ['24', '25', '26', '27', '28', '29', '01'],
            ['02', '03', '04', '05', '06', '07', '08'],
            ['09', '10', '11', '12', '13', '14', '15'],
            ['16', '17', '18', '19', '20', '21', '22'],
            ['23', '24', '25', '26', '27', '28', '29'],
            ['30', '31', '01', '02', '03', '04', '05']
          ]);
          expectSelectedElement( 10 );
        });
      });

      describe('works with ngModelOptions updateOn : "default"', function() {
        var $timeout, wrapElement;

        beforeEach(inject(function(_$document_, _$sniffer_, _$timeout_) {
          $document = _$document_;
          $timeout = _$timeout_;
          $rootScope.isopen = true;
          $rootScope.date = new Date('2010-09-30T10:00:00.000Z');
          wrapElement = $compile('<div><input ng-model="date" ' +
            'ng-model-options="{ updateOn: \'default\' }" ' +
            'uib-datepicker-popup is-open="isopen"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('should close the popup and update the input when a day is clicked', function() {
          clickOption(17);
          assignElements(wrapElement);
          expect(dropdownEl.length).toBe(0);
          expect(inputEl.val()).toBe('2010-09-15');
          expect($rootScope.date).toEqual(new Date('2010-09-15T10:00:00.000Z'));
        });
      });

      describe('attribute `datepickerOptions`', function() {
        describe('show-weeks', function() {
          beforeEach(function() {
            $rootScope.opts = {
              showWeeks: false
            };
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="opts" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          });

          it('hides week numbers based on variable', function() {
            expect(getLabelsRow().find('th').length).toEqual(7);
            var tr = element.find('tbody').find('tr');
            for (var i = 0; i < 5; i++) {
              expect(tr.eq(i).find('td').length).toEqual(7);
            }
          });
        });

        describe('init-date', function(){
          beforeEach(function() {
            $rootScope.date = null;
            $rootScope.opts = {
              initDate: new Date('November 9, 1980')
            };
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="opts" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          });

          it('does not alter the model', function() {
            expect($rootScope.date).toBe(null);
          });

          it('shows the correct title', function() {
            expect(getTitle()).toBe('November 1980');
          });
        });

        describe('min-date', function() {
          it('should be able to specify a min-date through options', function() {
            $rootScope.opts = {
              minDate: new Date('September 12, 2010'),
              shortcutPropagation: 'dog'
            };

            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="opts" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);

            var buttons = getAllOptionsEl();
            angular.forEach(buttons, function(button, index) {
              expect(angular.element(button).prop('disabled')).toBe(index < 14);
            });

            $rootScope.opts.minDate = new Date('September 13, 2010');
            $rootScope.$digest();
            buttons = getAllOptionsEl();
            angular.forEach(buttons, function(button, index) {
              expect(angular.element(button).prop('disabled')).toBe(index < 15);
            });
          });
        });

        describe('max-date', function() {
          it('should be able to specify a max-date through options', function() {
            $rootScope.opts = {
              maxDate: new Date('September 25, 2010')
            };

            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="opts" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);

            var buttons = getAllOptionsEl();
            angular.forEach(buttons, function(button, index) {
              expect(angular.element(button).prop('disabled')).toBe(index > 27);
            });

            $rootScope.opts.maxDate = new Date('September 15, 2010');
            $rootScope.$digest();
            buttons = getAllOptionsEl();
            angular.forEach(buttons, function(button, index) {
              expect(angular.element(button).prop('disabled')).toBe(index > 17);
            });
          });
        });

        describe('min-mode', function() {
          it('should be able to specify min-mode through options', function() {
            $rootScope.opts = {
              minMode: 'month'
            };

            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="opts" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);

            expect(getTitle()).toBe('2010');
          });
        });

        describe('max-mode', function() {
          it('should be able to specify max-mode through options', function() {
            $rootScope.opts = {
              maxMode: 'month'
            };

            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="opts" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);

            expect(getTitle()).toBe('September 2010');
            clickTitleButton();
            assignElements(wrapElement);
            expect(getTitle()).toBe('2010');
            clickTitleButton();
            assignElements(wrapElement);
            expect(getTitle()).toBe('2010');
          });
        });

        describe('datepicker-mode', function() {
          beforeEach(inject(function() {
            $rootScope.date = new Date('August 11, 2013');
            $rootScope.opts = {
              datepickerMode: 'month'
            };
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="opts" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          }));

          it('shows the correct title', function() {
            expect(getTitle()).toBe('2013');
          });

          it('updates binding', function() {
            clickTitleButton();
            expect($rootScope.opts.datepickerMode).toBe('year');
          });
        });
      });

      describe('attribute `init-date`', function() {
        beforeEach(function() {
          $rootScope.date = null;
          $rootScope.initDate = new Date('November 9, 1980');
        });

        describe('when initially set', function() {
          beforeEach(function() {
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup init-date="initDate" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          });

          it('does not alter the model', function() {
            expect($rootScope.date).toBe(null);
          });

          it('shows the correct title', function() {
            expect(getTitle()).toBe('November 1980');
          });
        });

        describe('when modified before date selected.', function() {
          beforeEach(function() {
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup init-date="initDate" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);

            $rootScope.initDate = new Date('December 20, 1981');
            $rootScope.$digest();
          });

          it('does not alter the model', function() {
            expect($rootScope.date).toBe(null);
          });

          it('shows the correct title', function() {
            expect(getTitle()).toBe('December 1981');
          });
        });

        describe('when modified after date selected.', function() {
          beforeEach(function() {
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup init-date="initDate" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            $rootScope.date = new Date('April 1, 1982');
            $rootScope.initDate = new Date('December 20, 1981');
            $rootScope.$digest();
          });

          it('does not alter the model', function() {
            expect($rootScope.date).toEqual(new Date('April 1, 1982'));
          });

          it('shows the correct title', function() {
            expect(getTitle()).toBe('April 1982');
          });
        });
      });

      describe('toggles programatically by `open` attribute', function() {
        var wrapElement;

        beforeEach(inject(function() {
          $rootScope.open = true;
          wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup is-open="open"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('to display initially', function() {
          expect(dropdownEl.length).toBe(1);
        });

        it('to close / open from scope variable', function() {
          expect(dropdownEl.length).toBe(1);
          $rootScope.open = false;
          $rootScope.$digest();
          assignElements(wrapElement);
          expect(dropdownEl.length).toBe(0);

          $rootScope.open = true;
          $rootScope.$digest();
          assignElements(wrapElement);
          expect(dropdownEl.length).toBe(1);
        });
      });

      describe('custom format', function() {
        beforeEach(inject(function() {
          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup="dd-MMMM-yyyy" is-open="true"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('to display the correct value in input', function() {
          expect(inputEl.val()).toBe('30-September-2010');
        });

        it('updates the input when a day is clicked', function() {
          clickOption(17);
          expect(inputEl.val()).toBe('15-September-2010');
          expect($rootScope.date).toEqual(new Date('September 15, 2010 15:30:00'));
        });

        it('updates the input correctly when model changes', function() {
          $rootScope.date = new Date('January 10, 1983 10:00:00');
          $rootScope.$digest();
          expect(inputEl.val()).toBe('10-January-1983');
        });
      });

      describe('custom format with time', function() {
        beforeEach(inject(function() {
      		var wrapElement = $compile('<div><input type="text" ng-model="date" uib-datepicker-popup="MMM-d-yyyy h:mm a" is-open="false"><div>')($rootScope);
      		$rootScope.$digest();
      		assignElements(wrapElement);
        }));

        it('updates the model correctly when the input value changes', function() {
      		$rootScope.date = new Date(2015, 10, 24, 10, 0);
      		$rootScope.$digest();
      		expect(inputEl.val()).toBe('Nov-24-2015 10:00 AM');

      		inputEl.val('Nov-24-2015 11:00 AM').trigger('input');
      		$rootScope.$digest();
      		expect($rootScope.date).toEqual(new Date(2015, 10, 24, 11, 0));
        });
      });

      describe('custom format with optional leading zeroes', function() {
        beforeEach(inject(function() {
          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup="d!-M!-yyyy" is-open="true"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('to display the correct value in input', function() {
          expect(inputEl.val()).toBe('30-09-2010');
        });

        it('updates the input when a day is clicked', function() {
          clickOption(10);
          expect(inputEl.val()).toBe('08-09-2010');
          expect($rootScope.date).toEqual(new Date('September 8, 2010 15:30:00'));
        });

        it('updates the input correctly when model changes', function() {
          $rootScope.date = new Date('December 25, 1983 10:00:00');
          $rootScope.$digest();
          expect(inputEl.val()).toBe('25-12-1983');
        });
      });

      describe('dynamic custom format', function() {
        beforeEach(inject(function() {
          $rootScope.format = 'dd-MMMM-yyyy';
          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup="{{format}}" is-open="true"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('to display the correct value in input', function() {
          expect(inputEl.val()).toBe('30-September-2010');
        });

        it('updates the input when a day is clicked', function() {
          clickOption(17);
          expect(inputEl.val()).toBe('15-September-2010');
          expect($rootScope.date).toEqual(new Date('September 15, 2010 15:30:00'));
        });

        it('updates the input correctly when model changes', function() {
          $rootScope.date = new Date('August 11, 2013 09:09:00');
          $rootScope.$digest();
          expect(inputEl.val()).toBe('11-August-2013');
        });

        it('updates the input correctly when format changes', function() {
          $rootScope.format = 'dd/MM/yyyy';
          $rootScope.$digest();
          expect(inputEl.val()).toBe('30/09/2010');
        });
      });

      describe('format errors', function() {
        var originalConfig = {};
        beforeEach(inject(function(uibDatepickerPopupConfig) {
          angular.extend(originalConfig, uibDatepickerPopupConfig);
          uibDatepickerPopupConfig.datepickerPopup = null;
        }));
        afterEach(inject(function(uibDatepickerPopupConfig) {
          // return it to the original state
          angular.extend(uibDatepickerPopupConfig, originalConfig);
        }));

        it('should throw an error if there is no format', function() {
          expect(function() {
            $compile('<div><input ng-model="date" uib-datepicker-popup><div>')($rootScope);
          }).toThrow(new Error('uibDatepickerPopup must have a date format specified.'));
        });

        it('should throw an error if the format changes to null without fallback', function() {
          $rootScope.format = 'dd-MMMM-yyyy';
          $compile('<div><input ng-model="date" uib-datepicker-popup="{{format}}"><div>')($rootScope);
          $rootScope.$digest();

          expect(function() {
            $rootScope.format = null;
            $rootScope.$digest();
          }).toThrow(new Error('uibDatepickerPopup must have a date format specified.'));
        });

        it('should thrown an error on date inputs with custom formats', function() {
          expect(function() {
            $compile('<div><input type="date" ng-model="date" uib-datepicker-popup="dd-yyyy-MMM"><div>')($rootScope);
          }).toThrow(new Error('HTML5 date input types do not support custom formats.'));
        });
      });

      describe('european format', function() {
        it('dd.MM.yyyy', function() {
          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup="dd.MM.yyyy"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);

          changeInputValueTo(inputEl, '11.08.2013');
          expect($rootScope.date.getFullYear()).toEqual(2013);
          expect($rootScope.date.getMonth()).toEqual(7);
          expect($rootScope.date.getDate()).toEqual(11);
        });
      });

      describe('`close-on-date-selection` attribute', function() {
        var wrapElement;
        beforeEach(inject(function() {
          $rootScope.close = false;
          wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup close-on-date-selection="close" is-open="true"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('does not close the dropdown when a day is clicked', function() {
          clickOption(17);
          assignElements(wrapElement);
          expect(dropdownEl.length).toBe(1);
        });
      });

      describe('button bar', function() {
        var buttons, buttonBarElement;

        function assignButtonBar() {
          buttonBarElement = dropdownEl.find('li').eq(-1);
          buttons = buttonBarElement.find('button');
        }

        describe('', function() {
          var wrapElement;

          beforeEach(inject(function() {
            $rootScope.isopen = true;
            wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup is-open="isopen"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            assignButtonBar();
          }));

          it('should exist', function() {
            expect(dropdownEl.length).toBe(1);
            expect(dropdownEl.find('li').length).toBe(2);
          });

          it('should have three buttons', function() {
            expect(buttons.length).toBe(3);

            expect(buttons.eq(0).text()).toBe('Today');
            expect(buttons.eq(1).text()).toBe('Clear');
            expect(buttons.eq(2).text()).toBe('Done');
          });

          it('should have a button to set today date without altering time part', function() {
            var today = new Date();
            buttons.eq(0).click();
            expect($rootScope.date.getFullYear()).toBe(today.getFullYear());
            expect($rootScope.date.getMonth()).toBe(today.getMonth());
            expect($rootScope.date.getDate()).toBe(today.getDate());

            expect($rootScope.date.getHours()).toBe(15);
            expect($rootScope.date.getMinutes()).toBe(30);
            expect($rootScope.date.getSeconds()).toBe(0);
          });

          it('should have a button to set today date if blank', function() {
            $rootScope.date = null;
            $rootScope.$digest();

            var today = new Date();
            buttons.eq(0).click();
            expect($rootScope.date.getFullYear()).toBe(today.getFullYear());
            expect($rootScope.date.getMonth()).toBe(today.getMonth());
            expect($rootScope.date.getDate()).toBe(today.getDate());

            expect($rootScope.date.getHours()).toBe(0);
            expect($rootScope.date.getMinutes()).toBe(0);
            expect($rootScope.date.getSeconds()).toBe(0);
          });

          it('should have a button to clear value', function() {
            buttons.eq(1).click();
            expect($rootScope.date).toBe(null);
          });

          it('should have a button to close calendar', function() {
            buttons.eq(2).click();
            assignElements(wrapElement);
            expect(dropdownEl.length).toBe(0);
          });
        });

        describe('customization', function() {
          it('should change text from attributes', function() {
            $rootScope.clearText = 'Null it!';
            $rootScope.close = 'Close';
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup current-text="Now" clear-text="{{clearText}}" close-text="{{close}}ME" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            assignButtonBar();

            expect(buttons.eq(0).text()).toBe('Now');
            expect(buttons.eq(1).text()).toBe('Null it!');
            expect(buttons.eq(2).text()).toBe('CloseME');
          });

          it('should disable today button if before min date', function() {
            $rootScope.minDate = new Date().setDate(new Date().getDate() + 1);
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup min-date="minDate" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            assignButtonBar();

            expect(buttons.eq(0).prop('disabled')).toBe(true);
          });

          it('should disable today button if before min date, yyyy-MM-dd case', inject(function(dateFilter) {
            var minDate = new Date(new Date().setDate(new Date().getDate() + 1));
            var literalMinDate = dateFilter(minDate, 'yyyy-MM-dd');
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup="yyyy-MM-dd" min-date="\'' + literalMinDate + '\'" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            assignButtonBar();

            expect(buttons.eq(0).prop('disabled')).toBe(true);
          }));

          it('should not disable any button if min date is null', function() {
            $rootScope.minDate = null;
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup min-date="minDate" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            assignButtonBar();

            for (var i = 0; i < buttons.length; i++) {
              expect(buttons.eq(i).prop('disabled')).toBe(false);
            }
          });

          it('should disable today button if after max date', function() {
            $rootScope.maxDate = new Date().setDate(new Date().getDate() - 2);
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup max-date="maxDate" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            assignButtonBar();

            expect(buttons.eq(0).prop('disabled')).toBe(true);
          });

          it('should not disable any button if max date is null', function() {
            $rootScope.maxDate = null;
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup max-date="maxDate" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            assignButtonBar();

            for (var i = 0; i < buttons.length; i++) {
              expect(buttons.eq(i).prop('disabled')).toBe(false);
            }
          });

          it('should remove bar', function() {
            $rootScope.showBar = false;
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup show-button-bar="showBar" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            expect(dropdownEl.find('li').length).toBe(1);
          });

          it('should hide weeks column on popup', function() {
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup show-weeks="false" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);

            expect(getLabelsRow().find('th').length).toEqual(7);
            var tr = element.find('tbody').find('tr');
            for (var i = 0; i < 5; i++) {
              expect(tr.eq(i).find('td').length).toEqual(7);
            }
          });

          it('should show weeks column on popup', function() {
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup show-weeks="true" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);

            expect(getLabelsRow().find('th').eq(0)).not.toBeHidden();
            var tr = element.find('tbody').find('tr');
            for (var i = 0; i < 5; i++) {
              expect(tr.eq(i).find('td').eq(0)).not.toBeHidden();
            }
          });
        });

        describe('`ng-change`', function() {
          beforeEach(inject(function() {
            $rootScope.changeHandler = jasmine.createSpy('changeHandler');
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup ng-change="changeHandler()" is-open="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
            assignButtonBar();
          }));

          it('should be called when `today` is clicked', function() {
            buttons.eq(0).click();
            expect($rootScope.changeHandler).toHaveBeenCalled();
          });

          it('should be called when `clear` is clicked', function() {
            buttons.eq(1).click();
            expect($rootScope.changeHandler).toHaveBeenCalled();
          });

          it('should not be called when `close` is clicked', function() {
            buttons.eq(2).click();
            expect($rootScope.changeHandler).not.toHaveBeenCalled();
          });
        });
      });

      describe('use with `ng-required` directive', function() {
        describe('`ng-required is true`', function() {
          beforeEach(inject(function() {
            $rootScope.date = '';
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup ng-required="true"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          }));

          it('should be invalid initially and when no date', function() {
            expect(inputEl.hasClass('ng-invalid')).toBeTruthy();
          });

          it('should be valid if model has been specified', function() {
            $rootScope.date = new Date();
            $rootScope.$digest();
            expect(inputEl.hasClass('ng-valid')).toBeTruthy();
          });

          it('should be valid if model value is a valid timestamp', function() {
            $rootScope.date = Date.now();
            $rootScope.$digest();
            expect(inputEl.hasClass('ng-valid')).toBeTruthy();
          });
        });

        describe('`ng-required is false`', function() {
          beforeEach(inject(function() {
            $rootScope.date = '';
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup ng-required="false"><div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          }));

          it('should be valid initially and when no date', function() {
            expect(inputEl.hasClass('ng-valid')).toBeTruthy();
          });
        });
      });

      describe('use with `ng-change` directive', function() {
        beforeEach(inject(function() {
          $rootScope.changeHandler = jasmine.createSpy('changeHandler');
          $rootScope.date = new Date('09/16/2010');
          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup ng-required="true" ng-change="changeHandler()" is-open="true"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('should not be called initially', function() {
          expect($rootScope.changeHandler).not.toHaveBeenCalled();
        });

        it('should be called when a day is clicked', function() {
          clickOption(17);
          expect($rootScope.changeHandler).toHaveBeenCalled();
        });

        it('should not be called when model changes programatically', function() {
          $rootScope.date = new Date();
          $rootScope.$digest();
          expect($rootScope.changeHandler).not.toHaveBeenCalled();
        });
      });

      describe('with disabled', function() {
        var wrapElement;

        beforeEach(function() {
          $rootScope.isOpen = false;
          wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup ng-required="true" ng-change="changeHandler()" is-open="isOpen" disabled><div>')($rootScope);
          $rootScope.$digest();
        });

        it('should not open the popup', function() {
          $rootScope.isOpen = true;
          $rootScope.$digest();

          expect($rootScope.isOpen).toBe(false);
          expect(wrapElement.find('ul').length).toBe(0);
        });
      });

      describe('with ng-disabled', function() {
        var wrapElement;

        beforeEach(function() {
          $rootScope.disabled = false;
          $rootScope.isOpen = false;
          wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup ng-required="true" ng-change="changeHandler()" is-open="isOpen" ng-disabled="disabled"><div>')($rootScope);
          $rootScope.$digest();
        });

        it('should not open the popup when disabled', function() {
          $rootScope.isOpen = true;
          $rootScope.$digest();

          expect($rootScope.isOpen).toBe(true);
          expect(wrapElement.find('ul').length).toBe(1);

          $rootScope.isOpen = false;
          $rootScope.$digest();

          expect($rootScope.isOpen).toBe(false);
          expect(wrapElement.find('ul').length).toBe(0);

          $rootScope.disabled = true;
          $rootScope.isOpen = true;
          $rootScope.$digest();

          expect($rootScope.isOpen).toBe(false);
          expect(wrapElement.find('ul').length).toBe(0);

          $rootScope.disabled = false;
          $rootScope.isOpen = true;
          $rootScope.$digest();

          expect($rootScope.isOpen).toBe(true);
          expect(wrapElement.find('ul').length).toBe(1);
        });
      });

      describe('with datepicker-popup-template-url', function() {
        beforeEach(function() {
          $rootScope.date = new Date();
        });

        afterEach(function () {
          $document.find('body').find('.dropdown-menu').remove();
        });

        it('should allow custom templates for the popup', function() {
          $templateCache.put('foo/bar.html', '<div>baz</div>');

          var elm = angular.element('<div><input ng-model="date" uib-datepicker-popup datepicker-popup-template-url="foo/bar.html" is-open="true"></div>');

          $compile(elm)($rootScope);
          $rootScope.$digest();

          expect(elm.children().eq(1).html()).toBe('baz');
        });
      });

      describe('with datepicker-template-url', function() {
        beforeEach(function() {
          $rootScope.date = new Date();
        });

        afterEach(function() {
          $document.find('body').find('.dropdown-menu').remove();
        });

        it('should allow custom templates for the datepicker', function() {
          $templateCache.put('foo/bar.html', '<div>baz</div>');

          var elm = angular.element('<div><input ng-model="date" uib-datepicker-popup datepicker-template-url="foo/bar.html" is-open="true"></div>');

          $compile(elm)($rootScope);
          $rootScope.$digest();

          var datepicker = elm.find('[uib-datepicker]');

          expect(datepicker.html()).toBe('baz');
        });
      });

      describe('with an append-to-body attribute', function() {
        beforeEach(function() {
          $rootScope.date = new Date();
        });

        afterEach(function() {
          $document.find('body').children().remove();
        });

        it('should append to the body', function() {
          var $body = $document.find('body'),
              bodyLength = $body.children().length,
              elm = angular.element(
                '<div><input uib-datepicker-popup ng-model="date" datepicker-append-to-body="true" is-open="true" /></div>'
              );
          $compile(elm)($rootScope);
          $rootScope.$digest();

          expect($body.children().length).toEqual(bodyLength + 1);
          expect(elm.children().length).toEqual(1);
        });

        it('should be removed on scope destroy', function() {
          var $body = $document.find('body'),
              bodyLength = $body.children().length,
              isolatedScope = $rootScope.$new(),
              elm = angular.element(
                '<input uib-datepicker-popup ng-model="date" datepicker-append-to-body="true" is-open="true" />'
              );
          $compile(elm)(isolatedScope);
          isolatedScope.$digest();
          expect($body.children().length).toEqual(bodyLength + 1);
          isolatedScope.$destroy();
          expect($body.children().length).toEqual(bodyLength);
        });
      });

      describe('with setting datepickerConfig.showWeeks to false', function() {
        var originalConfig = {};
        beforeEach(inject(function(uibDatepickerConfig) {
          angular.extend(originalConfig, uibDatepickerConfig);
          uibDatepickerConfig.showWeeks = false;

          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup is-open="true"><div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));
        afterEach(inject(function(uibDatepickerConfig) {
          // return it to the original state
          angular.extend(uibDatepickerConfig, originalConfig);
        }));

        it('changes initial visibility for weeks', function() {
          expect(getLabelsRow().find('th').length).toEqual(7);
          var tr = element.find('tbody').find('tr');
          for (var i = 0; i < 5; i++) {
            expect(tr.eq(i).find('td').length).toEqual(7);
          }
        });
      });

      describe('`datepicker-mode`', function() {
        beforeEach(inject(function() {
          $rootScope.date = new Date('August 11, 2013');
          $rootScope.mode = 'month';
          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-mode="mode" is-open="true"></div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        }));

        it('shows the correct title', function() {
          expect(getTitle()).toBe('2013');
        });

        it('updates binding', function() {
          clickTitleButton();
          expect($rootScope.mode).toBe('year');
        });
      });

      describe('attribute `onOpenFocus`', function() {
        beforeEach(function() {
          $rootScope.date = null;
          $rootScope.isopen = false;
          var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup on-open-focus="false" is-open="isopen"></div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapElement);
        });

        it('should remain focused on the input', function() {
          var focused = true;
          expect(dropdownEl.length).toBe(0);

          inputEl[0].focus();
          inputEl.on('blur', function() {
            focused = false;
          });
          $rootScope.isopen = true;
          $rootScope.$digest();

          expect(inputEl.parent().find('.dropdown-menu').length).toBe(1);
          expect(focused).toBe(true);
        });
      });

      describe('altInputFormats', function() {
        describe('datepickerPopupConfig.altInputFormats', function() {
          var originalConfig = {};
          beforeEach(inject(function(uibDatepickerPopupConfig) {
            $rootScope.date = new Date('November 9, 1980');
            angular.extend(originalConfig, uibDatepickerPopupConfig);
            uibDatepickerPopupConfig.datepickerPopup = 'MM-dd-yyyy';
            uibDatepickerPopupConfig.altInputFormats = ['M!/d!/yyyy'];
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          }));

          afterEach(inject(function(uibDatepickerPopupConfig) {
            // return it to the original state
            angular.extend(uibDatepickerPopupConfig, originalConfig);
          }));

          it('changes date format', function() {
            changeInputValueTo(inputEl, '11/8/1980');

            expect($rootScope.date.getFullYear()).toEqual(1980);
            expect($rootScope.date.getMonth()).toEqual(10);
            expect($rootScope.date.getDate()).toEqual(8);
          });

          it('changes the datepicker', function() {
            expect(selectedElementIndex()).toEqual(14);
            changeInputValueTo(inputEl, '11/8/1980');
            expect(selectedElementIndex()).toEqual(13);
          });
        });

        describe('attribute `alt-input-formats`', function() {
          beforeEach(function() {
            $rootScope.date = new Date('November 9, 1980');
            var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup="MMMM d yyyy" alt-input-formats="[\'M!/d!/yyyy\']" is-open="true"></div>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          });

          it('should accept alternate input formats', function() {
            changeInputValueTo(inputEl, '11/8/1980');

            expect($rootScope.date.getFullYear()).toEqual(1980);
            expect($rootScope.date.getMonth()).toEqual(10);
            expect($rootScope.date.getDate()).toEqual(8);
          });

          it('changes the datepicker', function() {
            expect(selectedElementIndex()).toEqual(14);
            changeInputValueTo(inputEl, '11/8/1980');
            expect(selectedElementIndex()).toEqual(13);
          });
        });
      });

      describe('pass through attributes', function() {
        var wrapElement;
        describe('formatting', function() {
          beforeEach(function() {
            $rootScope.dayTitle = 'MMMM, yy';
            wrapElement = $compile('<div><input uib-datepicker-popup ng-model="date"' +
              'is-open="true"' +
              'format-day="d"' +
              'format-day-header="EEEE"' +
              'format-day-title="{{dayTitle}}"' +
              'format-month="MMM"' +
              'format-month-title="yy"' +
              'format-year="yy"' +
              'year-rows="3"' +
              'year-columns="4"></uib-datepicker>')($rootScope);
            $rootScope.$digest();
            assignElements(wrapElement);
          });

          it('changes the title format in `day` mode', function() {
            expect(getTitle()).toBe('September, 10');
          });

          it('changes the title & months format in `month` mode', function() {
            clickTitleButton();
            assignElements(wrapElement);
            expect(getTitle()).toBe('10');
            expect(getOptions()).toEqual([
              ['Jan', 'Feb', 'Mar'],
              ['Apr', 'May', 'Jun'],
              ['Jul', 'Aug', 'Sep'],
              ['Oct', 'Nov', 'Dec']
            ]);
          });

          it('changes the title, year format & range in `year` mode', function() {
            clickTitleButton();
            assignElements(wrapElement);
            clickTitleButton();
            assignElements(wrapElement);
            expect(getTitle()).toBe('05 - 16');
            expect(getOptions()).toEqual([
              ['05', '06', '07', '08'],
              ['09', '10', '11', '12'],
              ['13', '14', '15', '16']
            ]);
          });

          it('shows day labels', function() {
            expect(getLabels(true)).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
          });

          it('changes the day format', function() {
            expect(getOptions(true)).toEqual([
              ['29', '30', '31', '1', '2', '3', '4'],
              ['5', '6', '7', '8', '9', '10', '11'],
              ['12', '13', '14', '15', '16', '17', '18'],
              ['19', '20', '21', '22', '23', '24', '25'],
              ['26', '27', '28', '29', '30', '1', '2'],
              ['3', '4', '5', '6', '7', '8', '9']
            ]);
          });
        });
      });

      describe('gc', function() {
        var popupScope;
        beforeEach(function() {
          $rootScope.minDate = new Date();
          $rootScope.maxDate = new Date();
          $rootScope.maxDate.setDate($rootScope.maxDate.getDate() + 1);
          $rootScope.minMode = 'day';
          $rootScope.maxMode = 'year';
          $rootScope.initDate = new Date();
          element = $compile('<div><input ng-model="date" uib-datepicker-popup min-date="minDate" max-date="maxDate" min-mode="minMode" max-mode="maxMode" init-date="initDate"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
          popupScope = element.find('input').isolateScope();
        });

        it('should appropriately clean up $watch expressions', function() {
          expect($rootScope.$$watchers.length).toBe(4);

          popupScope.$destroy();

          expect($rootScope.$$watchers.length).toBe(1);
        });
      });
    });

    describe('uibDatepickerConfig ngModelOptions', function() {
      var inputEl, dropdownEl;

      function assignElements(wrapElement) {
        inputEl = wrapElement.find('input');
        dropdownEl = wrapElement.find('ul');
        element = dropdownEl.find('table');
      }

      beforeEach(inject(function(uibDatepickerConfig) {
        uibDatepickerConfig.ngModelOptions = { timezone: '+600' };
        $rootScope.date = new Date('2010-09-30T10:00:00.000Z');
        $rootScope.isopen = true;
      }));

      afterEach(inject(function(uibDatepickerConfig) {
        uibDatepickerConfig.ngModelOptions = {};
      }));

      describe('timezone', function() {
        beforeEach(inject(function(uibDatepickerConfig) {
          var wrapper = $compile('<div><input ng-model="date" uib-datepicker-popup="MM/dd/yyyy" is-open="isopen"></div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapper);
        }));

        afterEach(inject(function (uibDatepickerConfig) {
          // return it to the original state
          uibDatepickerConfig.ngModelOptions = {};
        }));

        it('interprets the date appropriately', function() {
          expect(inputEl.val()).toBe('09/30/2010');
        });

        it('updates the input when a day is clicked', function() {
          clickOption(17);
          expect(inputEl.val()).toBe('09/15/2010');
          expect($rootScope.date).toEqual(new Date('2010-09-15T10:00:00.000Z'));
        });

        it('shows the correct title', function() {
          expect(getTitle()).toBe('September 2010');
        });
      });

      it('timezone interprets init date appropriately', function() {
        $rootScope.initDate = new Date('2006-01-01T00:00:00.000Z');
        $rootScope.date = null;
        var wrapper = $compile('<div><input ng-model="date" uib-datepicker-popup="yyyy-MM-dd" init-date="initDate" is-open="true"><div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapper);

        expect(getTitle()).toBe('January 2006');
      });

      it('timezone interprets min date appropriately', function() {
        $rootScope.minDate = new Date('2010-10-01T00:00:00.000Z');
        var wrapper = $compile('<div><input ng-model="date" uib-datepicker-popup="yyyy-MM-dd" min-date="minDate" is-open="true"><div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapper);

        expect(getSelectedElement().prop('disabled')).toBe(true);
      });
    });

    describe('ng-model-options', function() {
      describe('timezone', function() {
        var inputEl, dropdownEl, $document, $sniffer, $timeout;

        function assignElements(wrapElement) {
          inputEl = wrapElement.find('input');
          dropdownEl = wrapElement.find('ul');
          element = dropdownEl.find('table');
        }

        beforeEach(function() {
          $rootScope.date = new Date('2010-09-30T10:00:00.000Z');
          $rootScope.ngModelOptions = { timezone: '+600' };
          $rootScope.isopen = true;
          var wrapper = $compile('<div><input ng-model="date" uib-datepicker-popup="MM/dd/yyyy" ng-model-options="ngModelOptions" is-open="isopen"></div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapper);
        });

        it('interprets the date appropriately', function() {
          expect(inputEl.val()).toBe('09/30/2010');
        });

        it('has `selected` only the correct day', function() {
          expectSelectedElement(32);
        });

        it('updates the input when a day is clicked', function() {
          clickOption(17);
          expect(inputEl.val()).toBe('09/15/2010');
          expect($rootScope.date).toEqual(new Date('2010-09-15T10:00:00.000Z'));
        });
      });

      describe('timezone HTML5 date input', function() {
        var inputEl, dropdownEl, $document, $sniffer, $timeout;

        function assignElements(wrapElement) {
          inputEl = wrapElement.find('input');
          dropdownEl = wrapElement.find('ul');
          element = dropdownEl.find('table');
        }

        beforeEach(function() {
          $rootScope.date = new Date('2010-09-30T10:00:00.000Z');
          $rootScope.ngModelOptions = { timezone: '+600' };
          $rootScope.isopen = true;
          var wrapper = $compile('<div><input type="date" ng-model="date" uib-datepicker-popup ng-model-options="ngModelOptions" is-open="isopen"></div>')($rootScope);
          $rootScope.$digest();
          assignElements(wrapper);
        });

        it('interprets the date appropriately', function() {
          expect(inputEl.val()).toBe('2010-09-30');
        });

        it('has `selected` only the correct day', function() {
          expectSelectedElement(32);
        });

        it('updates the input when a day is clicked', function() {
          clickOption(17);
          expect(inputEl.val()).toBe('2010-09-15');
          expect($rootScope.date).toEqual(new Date('2010-09-15T10:00:00.000Z'));
        });
      });
    });

    describe('with empty initial state', function() {
      beforeEach(inject(function() {
        $rootScope.date = null;
        element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));

      it('is has a `<table>` element', function() {
        expect(element.find('table').length).toBe(1);
      });

      it('is shows rows with days', function() {
        expect(element.find('tbody').find('tr').length).toBeGreaterThan(3);
      });

      it('sets default 00:00:00 time for selected date', function() {
        $rootScope.date = new Date('August 1, 2013');
        $rootScope.$digest();
        $rootScope.date = null;
        $rootScope.$digest();

        clickOption(14);
        expect($rootScope.date).toEqual(new Date('August 11, 2013 00:00:00'));
      });
    });

    describe('`init-date`', function() {
      beforeEach(inject(function() {
        $rootScope.date = null;
        $rootScope.initDate = new Date('November 9, 1980');
        element = $compile('<uib-datepicker ng-model="date" init-date="initDate"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));

      it('does not alter the model', function() {
        expect($rootScope.date).toBe(null);
      });

      it('shows the correct title', function() {
        expect(getTitle()).toBe('November 1980');
      });
    });

    describe('`datepicker-mode`', function() {
      beforeEach(inject(function() {
        $rootScope.date = new Date('August 11, 2013');
        $rootScope.mode = 'month';
        element = $compile('<uib-datepicker ng-model="date" datepicker-mode="mode"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));

      it('shows the correct title', function() {
        expect(getTitle()).toBe('2013');
      });

      it('updates binding', function() {
        clickTitleButton();
        expect($rootScope.mode).toBe('year');
      });
    });

    describe('`min-mode`', function() {
      beforeEach(inject(function() {
        $rootScope.date = new Date('August 11, 2013');
        $rootScope.mode = 'month';
        $rootScope.minMode = 'month';
        element = $compile('<uib-datepicker ng-model="date" min-mode="minMode" datepicker-mode="mode"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));

      it('does not move below it', function() {
        expect(getTitle()).toBe('2013');
        clickOption( 5 );
        expect(getTitle()).toBe('2013');
        clickTitleButton();
        expect(getTitle()).toBe('2001 - 2020');
        $rootScope.minMode = 'year';
        $rootScope.$digest();
        clickOption( 5 );
        expect(getTitle()).toBe('2001 - 2020');
      });

      it('updates current mode if necessary', function() {
        expect(getTitle()).toBe('2013');
        $rootScope.minMode = 'year';
        $rootScope.$digest();
        expect(getTitle()).toBe('2001 - 2020');
      });
    });

    describe('`max-mode`', function() {
      beforeEach(inject(function() {
        $rootScope.date = new Date('August 11, 2013');
        $rootScope.maxMode = 'month';
        element = $compile('<uib-datepicker ng-model="date" max-mode="maxMode"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));

      it('does not move above it', function() {
        expect(getTitle()).toBe('August 2013');
        clickTitleButton();
        expect(getTitle()).toBe('2013');
        clickTitleButton();
        expect(getTitle()).toBe('2013');
        clickOption( 10 );
        expect(getTitle()).toBe('November 2013');
        $rootScope.maxMode = 'day';
        $rootScope.$digest();
        clickTitleButton();
        expect(getTitle()).toBe('November 2013');
      });

      it('disables the title button at it', function() {
        expect(getTitleButton().prop('disabled')).toBe(false);
        clickTitleButton();
        expect(getTitleButton().prop('disabled')).toBe(true);
        clickTitleButton();
        expect(getTitleButton().prop('disabled')).toBe(true);
        clickOption( 10 );
        expect(getTitleButton().prop('disabled')).toBe(false);
        $rootScope.maxMode = 'day';
        $rootScope.$digest();
        expect(getTitleButton().prop('disabled')).toBe(true);
      });

      it('updates current mode if necessary', function() {
        expect(getTitle()).toBe('August 2013');
        clickTitleButton();
        expect(getTitle()).toBe('2013');
        $rootScope.maxMode = 'day';
        $rootScope.$digest();
        expect(getTitle()).toBe('August 2013');
      });
    });

    describe('with an ngModelController having formatters and parsers', function() {
      beforeEach(inject(function() {
        // Custom date object.
        $rootScope.date = { type: 'date', date: 'April 1, 2015 00:00:00' };

        // Use dateModel directive to add formatters and parsers to the
        // ngModelController that translate the custom date object.
        element = $compile('<uib-datepicker ng-model="date" date-model></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));

      it('updates the view', function() {
        $rootScope.date = { type: 'date', date: 'April 15, 2015 00:00:00' };
        $rootScope.$digest();

        expectSelectedElement(17);
      });

      it('updates the model', function() {
        clickOption(17);

        expect($rootScope.date.type).toEqual('date');
        expect(new Date($rootScope.date.date)).toEqual(new Date('April 15, 2015 00:00:00'));
      });
    });

    describe('thursdays determine week count', function() {
      beforeEach(inject(function() {
        $rootScope.date = new Date('June 07, 2014');
      }));

      it('with the default starting day (sunday)', function() {
        element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
        $rootScope.$digest();

        expect(getWeeks()).toEqual(['23', '24', '25', '26', '27', '28']);
      });

      describe('when starting date', function() {
        it('is monday', function() {
          element = $compile('<uib-datepicker ng-model="date" starting-day="1"></uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getWeeks()).toEqual(['22', '23', '24', '25', '26', '27']);
        });

        it('is thursday', function() {
          element = $compile('<uib-datepicker ng-model="date" starting-day="4"></uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getWeeks()).toEqual(['22', '23', '24', '25', '26', '27']);
        });

        it('is saturday', function() {
          element = $compile('<uib-datepicker ng-model="date" starting-day="6"></uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getWeeks()).toEqual(['23', '24', '25', '26', '27', '28']);
        });
      });

      describe('first week in january', function() {
        it('in current year', function() {
          $rootScope.date = new Date('January 07, 2014');
          element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getWeeks()).toEqual(['1', '2', '3', '4', '5', '6']);
        });

        it('in last year', function() {
          $rootScope.date = new Date('January 07, 2010');
          element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getWeeks()).toEqual(['53', '1', '2', '3', '4', '5']);
        });
      });

      describe('last week(s) in december', function() {
        beforeEach(inject(function() {
          $rootScope.date = new Date('December 07, 2014');
        }));

        it('in next year', function() {
          element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getWeeks()).toEqual(['49', '50', '51', '52', '1', '2']);
        });
      });
    });
  });
});
