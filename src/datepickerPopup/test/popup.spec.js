describe('datepicker popup', function() {
  var inputEl, dropdownEl, $compile, $document, $rootScope, $sniffer,
    $templateCache, $timeout;
  beforeEach(module('ui.bootstrap.datepickerPopup'));
  beforeEach(module('uib/template/datepicker/datepicker.html'));
  beforeEach(module('uib/template/datepicker/day.html'));
  beforeEach(module('uib/template/datepicker/month.html'));
  beforeEach(module('uib/template/datepicker/year.html'));
  beforeEach(module('uib/template/datepickerPopup/popup.html'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = new Date('September 30, 2010 15:30:00');
    $templateCache = _$templateCache_;
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

  describe('basic', function() {
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
    beforeEach(inject(function(_$sniffer_) {
      $sniffer = _$sniffer_;

      $rootScope.date = new Date('September 30, 2010 15:30:00');
      $rootScope.ngModelOptions = {
        allowInvalid: true
      };
      element = $compile('<div><input ng-model="date" ng-model-options="ngModelOptions" uib-datepicker-popup></div>')($rootScope);
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
    beforeEach(inject(function(uibDatepickerPopupConfig) {
      angular.extend(originalConfig, uibDatepickerPopupConfig);
      uibDatepickerPopupConfig.datepickerPopup = 'MM-dd-yyyy';

      element = $compile('<div><div ng-if="true"><input ng-model="date" uib-datepicker-popup></div></div>')($rootScope);
      $rootScope.$digest();
    }));
    afterEach(inject(function(uibDatepickerPopupConfig) {
      // return it to the original state
      angular.extend(uibDatepickerPopupConfig, originalConfig);
    }));

    it('changes date format', function() {
      expect(element.find('input').val()).toEqual('09-30-2010');
    });
  });

  describe('initially', function() {
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
        $document.on('keydown', getKey);

        triggerKeyDown(inputEl, 'esc');
        expect(documentKey).toBe(-1);

        triggerKeyDown(inputEl, 'esc');
        expect(documentKey).toBe(27);

        $document.off('keydown', getKey);
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
      $rootScope.options = {
        ngModelOptions: {
          updateOn: 'default'
        }
      };
      wrapElement = $compile('<div><input ng-model="date" ' +
        'datepicker-options="options" ' +
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

  describe('option `init-date`', function() {
    beforeEach(function() {
      $rootScope.date = null;
      $rootScope.options = {
        initDate: new Date('November 9, 1980')
      };
    });

    describe('when initially set', function() {
      beforeEach(function() {
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"></div>')($rootScope);
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
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"></div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapElement);

        $rootScope.options.initDate = new Date('December 20, 1981');
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
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"></div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapElement);
        $rootScope.date = new Date('April 1, 1982');
        $rootScope.options.initDate = new Date('December 20, 1981');
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

      it('should clear the previously selected date', function() {
         $rootScope.date = new Date();
         $rootScope.$digest();
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
        var date = new Date();
        date.setDate(new Date().getDate() + 1);
        $rootScope.options = {
          minDate: date
        };
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"><div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapElement);
        assignButtonBar();

        expect(buttons.eq(0).prop('disabled')).toBe(true);
      });

      it('should disable today button if before min date, yyyy-MM-dd case', inject(function(dateFilter) {
        var date = new Date();
        date.setDate(new Date().getDate() + 1);
        var literalMinDate = dateFilter(date, 'yyyy-MM-dd');
        $rootScope.options = {
          minDate: literalMinDate
        };
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup="yyyy-MM-dd" datepicker-options="options" is-open="true"><div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapElement);
        assignButtonBar();

        expect(buttons.eq(0).prop('disabled')).toBe(true);
      }));

      it('should not disable any button if min date is null', function() {
        $rootScope.options = {
          minDate: null
        };
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"><div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapElement);
        assignButtonBar();

        for (var i = 0; i < buttons.length; i++) {
          expect(buttons.eq(i).prop('disabled')).toBe(false);
        }
      });

      it('should disable today button if after max date', function() {
        var date = new Date();
        date.setDate(new Date().getDate() - 2);
        $rootScope.options = {
          maxDate: date
        };
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"><div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapElement);
        assignButtonBar();

        expect(buttons.eq(0).prop('disabled')).toBe(true);
      });

      it('should not disable any button if max date is null', function() {
        $rootScope.options = {
          maxDate: null
        };
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"><div>')($rootScope);
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
        $rootScope.options = {
          showWeeks: false
        };
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"><div>')($rootScope);
        $rootScope.$digest();
        assignElements(wrapElement);

        expect(getLabelsRow().find('th').length).toEqual(7);
        var tr = element.find('tbody').find('tr');
        for (var i = 0; i < 5; i++) {
          expect(tr.eq(i).find('td').length).toEqual(7);
        }
      });

      it('should show weeks column on popup', function() {
        $rootScope.options = {
          showWeeks: true
        };
        var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"><div>')($rootScope);
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

      expect(elm.children().eq(1).html()).toBe('<div>baz</div>');
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

      expect(datepicker.html()).toBe('<div>baz</div>');
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
      $rootScope.options = {
        datepickerMode: 'month'
      };
      var wrapElement = $compile('<div><input ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="true"></div>')($rootScope);
      $rootScope.$digest();
      assignElements(wrapElement);
    }));

    it('shows the correct title', function() {
      expect(getTitle()).toBe('2013');
    });

    it('updates binding', function() {
      clickTitleButton();
      expect($rootScope.options.datepickerMode).toBe('year');
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
      $rootScope.options = {
        initDate: new Date('2010-09-30T23:00:00.000Z')
      };
      $rootScope.date = null;
      var wrapper = $compile('<div><input ng-model="date" uib-datepicker-popup="yyyy-MM-dd" datepicker-options="options" is-open="true"><div>')($rootScope);
      $rootScope.$digest();
      assignElements(wrapper);

      expect(getTitle()).toBe('October 2010');
    });

    it('timezone interprets min date appropriately', function() {
      $rootScope.options = {
        minDate: new Date('2010-10-01T00:00:00.000Z')
      };
      var wrapper = $compile('<div><input ng-model="date" uib-datepicker-popup="yyyy-MM-dd" datepicker-options="options" is-open="true"><div>')($rootScope);
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
        $rootScope.options = {
          ngModelOptions: {
            timezone: '+600'
          }
        };
        $rootScope.isopen = true;
        var wrapper = $compile('<div><input ng-model="date" uib-datepicker-popup="MM/dd/yyyy" datepicker-options="options" is-open="isopen"></div>')($rootScope);
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
        $rootScope.options = {
          ngModelOptions: {
            timezone: '+600'
          }
        };
        $rootScope.isopen = true;
        var wrapper = $compile('<div><input type="date" ng-model="date" uib-datepicker-popup datepicker-options="options" is-open="isopen"></div>')($rootScope);
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
});
