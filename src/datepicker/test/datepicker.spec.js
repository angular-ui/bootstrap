describe('datepicker', function() {
  var $rootScope, $compile, $templateCache, element;
  beforeEach(module('ui.bootstrap.datepicker'));
  beforeEach(module('uib/template/datepicker/datepicker.html'));
  beforeEach(module('uib/template/datepicker/day.html'));
  beforeEach(module('uib/template/datepicker/month.html'));
  beforeEach(module('uib/template/datepicker/year.html'));
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

  describe('$datepickerLiteralWarning', function() {
    var $compile,
      $log,
      $scope;

    it('should warn when using literals for min date by default', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      spyOn($log, 'warn');
      $scope.options = {
        minDate: '1984-01-01'
      };
      element = $compile('<uib-datepicker ng-model="locals.date" datepicker-options="options"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('Literal date support has been deprecated, please switch to date object usage');
    });

    it('should suppress warning when using literals for min date', function() {
      module(function($provide) {
        $provide.value('$datepickerLiteralWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      spyOn($log, 'warn');
      $scope.options = {
        minDate: '1984-01-01'
      };
      element = $compile('<uib-datepicker ng-model="locals.date" datepicker-options="options"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });

    it('should warn when using literals for max date by default', function() {
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      spyOn($log, 'warn');
      $scope.options = {
        maxDate: '1984-01-01'
      };
      element = $compile('<uib-datepicker ng-model="locals.date" datepicker-options="options"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).toHaveBeenCalledWith('Literal date support has been deprecated, please switch to date object usage');
    });

    it('should suppress warning when using literals for max date', function() {
      module(function($provide) {
        $provide.value('$datepickerLiteralWarning', false);
      });
      inject(function(_$log_, _$rootScope_, _$compile_) {
        $log = _$log_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
      });

      spyOn($log, 'warn');
      $scope.options = {
        maxDate: '1984-01-01'
      };
      element = $compile('<uib-datepicker ng-model="locals.date" datepicker-options="options"></uib-datepicker>')($scope);
      $scope.$digest();

      expect($log.warn).not.toHaveBeenCalled();
    });
  });

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
          $rootScope.options = {
            startingDay: 1
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
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
          $rootScope.options = {
            showWeeks: false
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
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

      describe('minDate with no initial value', function() {
        beforeEach(function() {
          $rootScope.options = {};
          $rootScope.date = new Date('September 10, 2010');
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('should toggle appropriately', function() {
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });

          $rootScope.options.minDate = new Date('September 12, 2010');
          $rootScope.$digest();

          refreshedButtons = getAllOptionsEl();
          angular.forEach(refreshedButtons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index < 14);
          });
        });
      });

      describe('minDate', function() {
        beforeEach(function() {
          $rootScope.options = {
            minDate: new Date('September 12, 2010')
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('disables appropriate days in current month', function() {
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index < 14);
          });
        });

        it('disables appropriate days when min date changes', function() {
          $rootScope.options.minDate = new Date('September 5, 2010');
          $rootScope.$digest();

          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index < 7);
          });
        });

        it('invalidates when model is a disabled date', function() {
          $rootScope.options.minDate = new Date('September 5, 2010');
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
          $rootScope.options.minDate = null;
          $rootScope.date = new Date('December 20, 1949');
          $rootScope.$digest();

          clickTitleButton();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });
        });

        it('accepts literals, \'yyyy-MM-dd\' case', function() {
          $rootScope.options.minDate = '2010-09-05';
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index < 7);
          });
        });
      });

      describe('maxDate with no initial value', function() {
        beforeEach(function() {
          $rootScope.options = {};
          $rootScope.date = new Date('September 10, 2010');
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('should toggle appropriately', function() {
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });

          $rootScope.options.maxDate = new Date('September 25, 2010');
          $rootScope.$digest();

          refreshedButtons = getAllOptionsEl();
          angular.forEach(refreshedButtons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index > 27);
          });
        });
      });

      describe('maxDate', function() {
        beforeEach(function() {
          $rootScope.options = {
            maxDate: new Date('September 25, 2010')
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
          $rootScope.$digest();
        });

        it('disables appropriate days in current month', function() {
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index > 27);
          });
        });

        it('disables appropriate days when max date changes', function() {
          $rootScope.options.maxDate = new Date('September 18, 2010');
          $rootScope.$digest();

          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(index > 20);
          });
        });

        it('invalidates when model is a disabled date', function() {
          $rootScope.options.maxDate = new Date('September 18, 2010');
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
          $rootScope.options.maxDate = null;
          $rootScope.$digest();
          var buttons = getAllOptionsEl();
          angular.forEach(buttons, function(button, index) {
            expect(angular.element(button).prop('disabled')).toBe(false);
          });
        });
      });

      describe('formatting', function() {
        beforeEach(function() {
          $rootScope.options = {
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
            'datepicker-options="options"></uib-datepicker>')($rootScope);
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

    describe('datepickerConfig ngModelOptions', function() {
      describe('timezone', function() {
        var originalConfig = {};
        beforeEach(inject(function(uibDatepickerConfig) {
          angular.extend(originalConfig, uibDatepickerConfig);
          uibDatepickerConfig.ngModelOptions = { timezone: '+600' };
          $rootScope.date = new Date('2005-11-07T10:00:00.000Z');
        }));

        afterEach(inject(function(uibDatepickerConfig) {
          // return it to the original state
          angular.extend(uibDatepickerConfig, originalConfig);
        }));

        describe('basics', function() {
          beforeEach(function() {
            element = $compile('<uib-datepicker ng-model="date"></uib-datepicker>')($rootScope);
            $rootScope.$digest();
          });

          it('sets date to appropriate date', function() {
            expectSelectedElement(8);
          });

          it('updates the input when a day is clicked', function() {
            clickOption(9);
            expect($rootScope.date).toEqual(new Date('2005-11-08T10:00:00.000Z'));
          });
        });

        it('init date', function() {
          $rootScope.options = {
            initDate: new Date('2006-01-01T00:00:00.000Z')
          };
          $rootScope.date = null;
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"><uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getTitle()).toEqual('January 2006');
        });

        it('min date', function() {
          $rootScope.options = {
            minDate: new Date('2010-10-01T00:00:00.000Z')
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"><uib-datepicker>')($rootScope);
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
        $rootScope.options = {
          initDate: new Date('November 9, 1980')
        };
        element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
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
        $rootScope.options = {
          datepickerMode: 'month'
        };
        element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));

      it('shows the correct title', function() {
        expect(getTitle()).toBe('2013');
      });

      it('updates binding', function() {
        clickTitleButton();
        expect($rootScope.options.datepickerMode).toBe('year');
      });
    });

    describe('`min-mode`', function() {
      beforeEach(inject(function() {
        $rootScope.date = new Date('August 11, 2013');
        $rootScope.options = {
          minMode: 'month',
          datepickerMode: 'month'
        };
        element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
        $rootScope.$digest();
      }));

      it('does not move below it', function() {
        expect(getTitle()).toBe('2013');
        clickOption( 5 );
        expect(getTitle()).toBe('2013');
        clickTitleButton();
        expect(getTitle()).toBe('2001 - 2020');
        $rootScope.options.minMode = 'year';
        $rootScope.$digest();
        clickOption( 5 );
        expect(getTitle()).toBe('2001 - 2020');
      });

      it('updates current mode if necessary', function() {
        expect(getTitle()).toBe('2013');
        $rootScope.options.minMode = 'year';
        $rootScope.$digest();
        expect(getTitle()).toBe('2001 - 2020');
      });
    });

    describe('`max-mode`', function() {
      beforeEach(inject(function() {
        $rootScope.date = new Date('August 11, 2013');
        $rootScope.options = {
          maxMode: 'month'
        };
        element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
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
        $rootScope.options.maxMode = 'day';
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
        $rootScope.options.maxMode = 'day';
        $rootScope.$digest();
        expect(getTitleButton().prop('disabled')).toBe(true);
      });

      it('updates current mode if necessary', function() {
        expect(getTitle()).toBe('August 2013');
        clickTitleButton();
        expect(getTitle()).toBe('2013');
        $rootScope.options.maxMode = 'day';
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
          $rootScope.options = {
            startingDay: 1
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getWeeks()).toEqual(['22', '23', '24', '25', '26', '27']);
        });

        it('is thursday', function() {
          $rootScope.options = {
            startingDay: 4
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
          $rootScope.$digest();

          expect(getWeeks()).toEqual(['22', '23', '24', '25', '26', '27']);
        });

        it('is saturday', function() {
          $rootScope.options = {
            startingDay: 6
          };
          element = $compile('<uib-datepicker ng-model="date" datepicker-options="options"></uib-datepicker>')($rootScope);
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
